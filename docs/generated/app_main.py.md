# Module: `app/main.py`

**Language**: `python` | **Detected Routes**: `2`

## API Routes & Endpoints
- `@app.get("/health")` -> `def health_check():`
- `@app.post("/generate", response_model=GenerateResponse)` -> `async def generate_docs(payload: GenerateRequest):`

## Functions & Methods
```typescript
def health_check()
```
```typescript
async def generate_docs(payload
```
## Class Definitions
```typescript
class FilePayload(BaseModel)
```
```typescript
class GenerateRequest(BaseModel)
```
```typescript
class GenerateResponse(BaseModel)
```
