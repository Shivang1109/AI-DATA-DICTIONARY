from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.pipeline_service import analyze_database_pipeline
import json
import os

router = APIRouter()

class DatabaseConfig(BaseModel):
    host: str
    port: int
    user: str
    password: str
    database: str
    demo_mode: bool = False

@router.post("/analyze-database")
async def analyze_database(config: DatabaseConfig):
    """
    Analyze a PostgreSQL database and return schema with AI insights
    """
    try:
        if config.demo_mode:
            # Load large demo data
            demo_path = os.path.join(os.path.dirname(__file__), '..', '..', 'demo_data_large.json')
            if not os.path.exists(demo_path):
                raise HTTPException(status_code=500, detail=f"Demo data file not found at {demo_path}")
            
            with open(demo_path, 'r') as f:
                demo_data = json.load(f)
            return {"schema": demo_data, "mode": "demo"}
        
        # Real database analysis
        schema = analyze_database_pipeline(
            host=config.host,
            port=config.port,
            user=config.user,
            password=config.password,
            database=config.database
        )
        
        return {"schema": schema, "mode": "live"}
    
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        error_detail = f"{str(e)}\n{traceback.format_exc()}"
        print(f"ERROR in analyze_database: {error_detail}")
        raise HTTPException(status_code=500, detail=str(e))
