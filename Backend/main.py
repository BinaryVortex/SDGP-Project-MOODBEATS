from fastapi import FastAPI
from Database.Mongodb import app as db_app  # Import app from Mongodb.py

app = FastAPI()

# Include routes from Mongodb.py
app.mount("/api", db_app)

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
