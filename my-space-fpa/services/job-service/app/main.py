from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum
from datetime import datetime
import uuid

app = FastAPI(
    title="My Space FPA - Job Service",
    description="Job management API for posting, searching, and managing freelance jobs",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:4000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Enums
class JobType(str, Enum):
    FIXED = "FIXED"
    HOURLY = "HOURLY"
    MILESTONE = "MILESTONE"

class JobStatus(str, Enum):
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
    ON_HOLD = "ON_HOLD"

# Models
class Job(BaseModel):
    id: str
    msf_id: str
    client_id: str
    title: str
    description: str
    category: str
    job_type: JobType
    budget_min: float
    budget_max: Optional[float] = None
    hourly_rate: Optional[float] = None
    skills_required: List[str]
    duration: str
    status: JobStatus = JobStatus.OPEN
    proposals_count: int = 0
    views_count: int = 0
    ai_match_enabled: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class JobCreate(BaseModel):
    title: str
    description: str
    category: str
    job_type: JobType
    budget_min: float
    budget_max: Optional[float] = None
    hourly_rate: Optional[float] = None
    skills_required: List[str]
    duration: str

class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[JobStatus] = None
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None

# Mock database
jobs_db = []

# Generate MSF Job ID
def generate_job_msf_id() -> str:
    return f"JOB{uuid.uuid4().int >> 64:08d}J"

# Routes
@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "job-service"}

@app.get("/jobs", response_model=List[Job])
async def get_jobs(
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    status: Optional[JobStatus] = None,
    category: Optional[str] = None,
):
    """Get all jobs with optional filtering"""
    filtered = jobs_db
    if status:
        filtered = [j for j in filtered if j.status == status]
    if category:
        filtered = [j for j in filtered if j.category == category]
    return filtered[offset:offset + limit]

@app.get("/jobs/{job_id}", response_model=Job)
async def get_job(job_id: str):
    """Get a specific job by ID"""
    job = next((j for j in jobs_db if j.id == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@app.post("/jobs", response_model=Job)
async def create_job(job_data: JobCreate):
    """Create a new job posting"""
    job = Job(
        id=str(uuid.uuid4()),
        msf_id=generate_job_msf_id(),
        client_id="client-1",  # Would come from auth context
        **job_data.model_dump()
    )
    jobs_db.append(job)
    return job

@app.put("/jobs/{job_id}", response_model=Job)
async def update_job(job_id: str, job_data: JobUpdate):
    """Update an existing job"""
    job = next((j for j in jobs_db if j.id == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    update_data = job_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(job, key, value)
    
    job.updated_at = datetime.utcnow()
    return job

@app.delete("/jobs/{job_id}")
async def delete_job(job_id: str):
    """Delete a job posting"""
    global jobs_db
    jobs_db = [j for j in jobs_db if j.id != job_id]
    return {"success": True}

@app.get("/jobs/category/{category}", response_model=List[Job])
async def get_jobs_by_category(category: str, limit: int = 20):
    """Get jobs by category"""
    filtered = [j for j in jobs_db if j.category.lower() == category.lower()]
    return filtered[:limit]

@app.get("/jobs/search/{query}", response_model=List[Job])
async def search_jobs(query: str, filters: Optional[str] = None):
    """Search jobs by keyword"""
    # In production, this would use Elasticsearch
    filtered = [
        j for j in jobs_db 
        if query.lower() in j.title.lower() or query.lower() in j.description.lower()
    ]
    return filtered

@app.get("/jobs/matching/user", response_model=List[Job])
async def get_matching_jobs(limit: int = 10):
    """Get AI-matched jobs for current user"""
    # In production, this would use ML matching algorithm
    return jobs_db[:limit]

# Initialize with some mock data
@app.on_event("startup")
async def startup_event():
    mock_jobs = [
        Job(
            id=str(uuid.uuid4()),
            msf_id=generate_job_msf_id(),
            client_id="client-1",
            title="Full-Stack Developer for E-commerce Platform",
            description="We need an experienced full-stack developer to build a modern e-commerce platform...",
            category="Development",
            job_type=JobType.FIXED,
            budget_min=250000,
            budget_max=400000,
            skills_required=["React", "Node.js", "MongoDB", "Paystack"],
            duration="3-6 months",
            status=JobStatus.OPEN,
        ),
        Job(
            id=str(uuid.uuid4()),
            msf_id=generate_job_msf_id(),
            client_id="client-2",
            title="Mobile App UI/UX Design",
            description="Looking for a talented designer to create beautiful UI/UX for our fintech mobile app...",
            category="Design",
            job_type=JobType.FIXED,
            budget_min=150000,
            skills_required=["Figma", "UI Design", "Mobile Design", "Prototyping"],
            duration="1-3 months",
            status=JobStatus.OPEN,
        ),
    ]
    jobs_db.extend(mock_jobs)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3002)
