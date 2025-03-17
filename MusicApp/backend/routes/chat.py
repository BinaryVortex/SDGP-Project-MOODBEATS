from fastapi import APIRouter, HTTPException, Depends, Body
from typing import Optional, List
import os
import uuid
import base64
from datetime import datetime
from schemas import MessageRequest, MessageResponse
from chat_service import generate_response, clear_chat_history
from config import settings
from utils.file_handler import save_base64_file

router = APIRouter(
    prefix=f"{settings.API_PREFIX}/chat",
    tags=["chat"],
)

@router.post("/message", response_model=MessageResponse)
async def send_message(request: MessageRequest):
    """
    Send a message to the chatbot and get a response.
    """
    try:
        # Process attachment if provided
        attachment_path = None
        if request.attachment:
            try:
                # Save attachment
                attachment_path = await save_base64_file(
                    base64_data=request.attachment.data,
                    mime_type=request.attachment.mime_type
                )
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Error processing attachment: {str(e)}")
        
        # Generate response
        user_id = request.user_id if request.user_id else "default"
        response_text = await generate_response(
            message=request.message,
            attachment_path=attachment_path,
            user_id=user_id
        )
        
        return MessageResponse(
            response=response_text,
            timestamp=datetime.now()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/clear-history")
async def clear_history(user_id: Optional[str] = Body("default")):
    """
    Clear the chat history for a user.
    """
    try:
        success = clear_chat_history(user_id)
        if success:
            return {"status": "success", "message": "Chat history cleared successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to clear chat history")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))