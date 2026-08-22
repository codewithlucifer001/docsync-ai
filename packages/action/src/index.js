const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function run() {
  console.log("🚀 Starting DocSync AI Autonomous Sync Pipeline...");

  const apiUrl = process.env.DOCSYNC_API_URL || "http://127.0.0.1:8000";
  const repoName = process.env.GITHUB_REPOSITORY || "local/repository";
  let commitSha = "head";

  try {
    commitSha = execSync("git rev-parse --short HEAD").toString().trim();
  } catch (e) {
    console.log("Local git repository head assumed.");
  }

  // Scan project for code files (.ts, .tsx, .js, .py)
  const scannedFiles = [];
  const allowedExtensions = [".ts", ".tsx", ".js", ".py"];

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!["node_modules", ".git", ".next", ".venv", "dist", "build"].includes(entry.name)) {
          scanDir(fullPath);
        }
      } else if (allowedExtensions.includes(path.extname(entry.name))) {
        const content = fs.readFileSync(fullPath, "utf-8");
        scannedFiles.push({
          filename: path.relative(process.cwd(), fullPath).replace(/\\/g, "/"),
          content
        });
      }
    }
  }

  scanDir(process.cwd());
  console.log(`📦 Found ${scannedFiles.length} source code files to parse.`);

  if (scannedFiles.length === 0) {
    console.log("No matching files found. Exiting cleanly.");
    return;
  }

  const payload = {
    repo_name: repoName,
    commit_sha: commitSha,
    files: scannedFiles.slice(0, 15), // parse batch
    previous_docs: {}
  };

  try {
    const res = await fetch(`${apiUrl}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`DocSync API returned status: ${res.status}`);
    }

    const data = await res.json();
    console.log(`✅ DocSync Analysis Complete! Freshness: ${data.freshness_score}% | Drifts: ${data.drift_count}`);

    // Output Directory
    const outputDir = path.join(process.cwd(), "docs", "generated");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save Markdown Docs
    for (const [file, markdown] of Object.entries(data.markdown_docs || {})) {
      const safeName = file.replace(/[\/\\]/g, "_") + ".md";
      fs.writeFileSync(path.join(outputDir, safeName), markdown, "utf-8");
    }

    // Save OpenAPI Specification
    if (data.openapi_spec) {
      fs.writeFileSync(
        path.join(outputDir, "openapi.json"),
        JSON.stringify(data.openapi_spec, null, 2),
        "utf-8"
      );
    }

    console.log(`📝 Generated documentation successfully stored in ${outputDir}`);
  } catch (err) {
    console.error("❌ DocSync pipeline failed:", err.message);
  }
}

run();