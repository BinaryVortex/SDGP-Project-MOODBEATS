# backend/routes/__init__.py
from fastapi import APIRouter

router = APIRouter()

# Import and include routes
from .chat import router as chat_router
from .files import router as files_router

router.include_router(chat_router)
router.include_router(files_router)
