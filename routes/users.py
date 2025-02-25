from fastapi import APIRouter, HTTPException
from models import User
from services.auth import hash_password, verify_password

# Create a router for user-related endpoints
router = APIRouter()

# Example endpoint: User registration
@router.post("/register")
async def register_user(user: User):
    hashed_pw = hash_password(user.password)  # Hash user password
    # Add user to database (dummy example)
    return {"message": "User registered", "hashed_password": hashed_pw}
