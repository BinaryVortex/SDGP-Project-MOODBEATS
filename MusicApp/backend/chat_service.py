import base64
import httpx
import json
import os
from typing import Optional, Dict, List, Any
from config import settings
from schemas import MessageRole, MessagePart, MessageContent

# Dictionary to store chat histories for different users
chat_histories: Dict[str, List[MessageContent]] = {}

async def generate_response(
    message: str, 
    attachment_path: Optional[str] = None, 
    user_id: str = "default"
) -> str:
    """
    Generate a response using Google's Gemini API.
    
    Args:
        message: The user's message text
        attachment_path: Optional path to an uploaded attachment
        user_id: User identifier for maintaining conversation history
    
    Returns:
        The generated response text
    """
    try:
        # Initialize chat history for this user if it doesn't exist
        if user_id not in chat_histories:
            # Start with a system message providing context about the app
            chat_histories[user_id] = [
                MessageContent(
                    role=MessageRole.SYSTEM,
                    parts=[MessagePart(text="You are a helpful music assistant for the MusicApp. You can help users discover music, "
                                         "provide information about artists, albums, and songs, and assist with using the app. "
                                         "Your responses should be friendly, concise, and helpful.")]
                )
            ]
        
        # Prepare user message parts
        message_parts = [MessagePart(text=message)]
        
        # Add attachment if provided
        if attachment_path and os.path.exists(attachment_path):
            try:
                with open(attachment_path, "rb") as file:
                    base64_data = base64.b64encode(file.read()).decode("utf-8")
                
                # Determine MIME type from file extension
                mime_type = "image/jpeg"  # Default
                if attachment_path.lower().endswith(".png"):
                    mime_type = "image/png"
                elif attachment_path.lower().endswith(".jpg") or attachment_path.lower().endswith(".jpeg"):
                    mime_type = "image/jpeg"
                elif attachment_path.lower().endswith(".mp3"):
                    mime_type = "audio/mpeg"
                elif attachment_path.lower().endswith(".wav"):
                    mime_type = "audio/wav"
                
                # Add inline data
                message_parts.append(
                    MessagePart(
                        inline_data={
                            "mime_type": mime_type,
                            "data": base64_data
                        }
                    )
                )
            except Exception as e:
                print(f"Error processing attachment: {e}")
        
        # Add user message to history
        chat_histories[user_id].append(
            MessageContent(
                role=MessageRole.USER,
                parts=message_parts
            )
        )
        
        # Convert MessageContent objects to the format expected by the Gemini API
        api_contents = []
        for msg in chat_histories[user_id]:
            api_message = {
                "role": msg.role.value,
                "parts": []
            }
            
            for part in msg.parts:
                part_dict = {}
                if part.text:
                    part_dict["text"] = part.text
                if part.inline_data:
                    part_dict["inline_data"] = part.inline_data
                api_message["parts"].append(part_dict)
            
            api_contents.append(api_message)
        
        # Prepare API request
        request_data = {
            "contents": api_contents,
            "generationConfig": {
                "temperature": 0.7,
                "topK": 40,
                "topP": 0.95,
                "maxOutputTokens": 800,
            }
        }
        
        # Make API request
        api_url = f"{settings.GEMINI_API_URL}?key={settings.GEMINI_API_KEY}"
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                api_url,
                json=request_data,
                timeout=30.0
            )
            
            if response.status_code != 200:
                error_message = f"Gemini API Error: {response.status_code} - {response.text}"
                print(error_message)
                return "I'm sorry, I encountered an error. Please try again later."
            
            response_data = response.json()
            
            # Extract response text
            try:
                response_text = response_data["candidates"][0]["content"]["parts"][0]["text"]
                
                # Add bot response to history
                chat_histories[user_id].append(
                    MessageContent(
                        role=MessageRole.BOT,
                        parts=[MessagePart(text=response_text)]
                    )
                )
                
                # Limit history length to prevent tokens from growing too large
                if len(chat_histories[user_id]) > settings.MAX_HISTORY_LENGTH:
                    # Keep the first message (system instructions) and the most recent messages
                    chat_histories[user_id] = [chat_histories[user_id][0]] + chat_histories[user_id][-(settings.MAX_HISTORY_LENGTH - 1):]
                
                return response_text
                
            except (KeyError, IndexError) as e:
                print(f"Error parsing Gemini API response: {e}")
                print(f"Response data: {response_data}")
                return "I'm sorry, I couldn't generate a proper response."
    
    except Exception as e:
        print(f"General error in generate_response: {e}")
        return "I'm sorry, an unexpected error occurred. Please try again later."

def clear_chat_history(user_id: str) -> bool:
    """
    Clear the chat history for a specific user.
    
    Args:
        user_id: User identifier
    
    Returns:
        True if successful, False otherwise
    """
    try:
        if user_id in chat_histories:
            # Keep only the system message
            if chat_histories[user_id] and chat_histories[user_id][0].role == MessageRole.SYSTEM:
                system_message = chat_histories[user_id][0]
                chat_histories[user_id] = [system_message]
            else:
                chat_histories[user_id] = []
        return True
    except Exception as e:
        print(f"Error clearing chat history: {e}")
        return False