from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Arc Edu API",
    description="Backend API for Arc Edu Student Platform",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StudentProfile(BaseModel):
    id: str
    name: str
    student_id: str
    group: str
    faculty: str
    specialty: str
    course_year: int
    gpa: float

CURRENT_STUDENT = StudentProfile(
    id="arc-001",
    name="Нурсиитов Нурлан",
    student_id="230107042",
    group="ВТИП-23-2к",
    faculty="Информационные технологии",
    specialty="6B06101 Software Engineering",
    course_year=2,
    gpa=3.87
)

@app.get("/")
def root():
    return {
        "project": "Arc Edu",
        "status": "in_development",
        "author": "Нурсиитов Нурлан",
        "version": "0.1.0-alpha"
    }

@app.get("/api/student/me", response_model=StudentProfile)
def get_student_profile():
    return CURRENT_STUDENT
