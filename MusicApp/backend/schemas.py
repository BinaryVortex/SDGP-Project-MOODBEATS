from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

class MessageRole(str, Enum):
    USER = "user"
    BOT = "bot"
    SYSTEM = "system"

class AttachmentType(str, Enum):
    IMAGE = "image"
    AUDIO = "audio"
    DOCUMENT = "document"

class Attachment(BaseModel):
    """Model for message attachments"""
    data: str = Field(..., description="Base64 encoded file data")
    mime_type: str = Field(..., description="MIME type of the attachment")

class MessageRequest(BaseModel):
    """Model for incoming message requests"""
    message: str = Field(..., description="The user's message text")
    attachment: Optional[Attachment] = Field(None, description="Optional attachment")
    user_id: Optional[str] = Field(None, description="User identifier for session tracking")

class MessagePart(BaseModel):
    """Model for a part of a message (text or attachment)"""
    text: Optional[str] = None
    inline_data: Optional[Dict[str, Any]] = None

class MessageContent(BaseModel):
    """Model for message content in the chat history"""
    role: MessageRole
    parts: List[MessagePart] = Field(..., description="Message parts")

class MessageResponse(BaseModel):
    """Model for response messages"""
    response: str = Field(..., description="The response text")
    timestamp: datetime = Field(default_factory=datetime.now)

    class Config:
        json_encoders = {
            datetime: lambda dt: dt.isoformat()
        }

class FileUploadResponse(BaseModel):
    """Model for file upload responses"""
    filename: str
    path: str
    url: str