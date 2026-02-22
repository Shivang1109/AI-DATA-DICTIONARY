from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.analyze_routes import router as analyze_router

app = FastAPI(
    title="AI Data Dictionary API",
    description="Automated data dictionary and schema intelligence",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analyze_router)

@app.get("/")
def read_root():
    return {
        "message": "AI Data Dictionary API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
