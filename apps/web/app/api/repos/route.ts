import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    authenticated: false,
    repos: [
      { id: 101, name: "payment-gateway", full_name: "enterprise-org/payment-gateway", private: true, default_branch: "main", description: "Stripe & PayPal microservice with automated Next.js 15 route handlers." },
      { id: 102, name: "auth-fastapi-service", full_name: "enterprise-org/auth-fastapi-service", private: false, default_branch: "master", description: "OAuth2 & JWT authentication microservice written in Python FastAPI." },
      { id: 103, name: "analytics-worker", full_name: "enterprise-org/analytics-worker", private: false, default_branch: "main", description: "Event streaming and metrics aggregation pipeline." }
    ]
  });
}