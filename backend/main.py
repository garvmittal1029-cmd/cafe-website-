"""FastAPI application entry point for Brew & Bloom backend."""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import connect_to_mongo, close_mongo_connection
from app.routes import router
from app.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifespan events."""
    # Startup
    try:
        await connect_to_mongo()
    except Exception as e:
        print(f"⚠️  Could not connect to MongoDB: {e}")
        print("   Running with default data (no database)")
    yield
    # Shutdown
    await close_mongo_connection()


app = FastAPI(
    title="Brew & Bloom API",
    description="Backend API for the Brew & Bloom specialty coffee cafe",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS - Allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router, prefix="/api")


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "app": "Brew & Bloom API",
        "version": "1.0.0",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=settings.BACKEND_HOST,
        port=settings.BACKEND_PORT,
        reload=True,
    )
