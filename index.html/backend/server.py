from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Resend setup (optional - only if API key is provided)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'thesquatsgym2020@gmail.com')

if RESEND_API_KEY:
    try:
        import resend
        resend.api_key = RESEND_API_KEY
        logger.info("Resend email integration enabled")
    except ImportError:
        logger.warning("Resend library not installed. Email notifications disabled.")
        RESEND_API_KEY = None


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str
    interest: Optional[str] = "General Inquiry"

class ContactFormResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: str
    phone: str
    message: str
    interest: str
    submitted_at: str
    email_sent: bool


# Routes
@api_router.get("/")
async def root():
    return {"message": "The Sqquats Gym API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact", response_model=ContactFormResponse)
async def submit_contact_form(request: ContactFormRequest):
    """Submit contact form inquiry"""
    inquiry_id = str(uuid.uuid4())
    submitted_at = datetime.now(timezone.utc).isoformat()
    
    # Save to database
    doc = {
        "id": inquiry_id,
        "name": request.name,
        "email": request.email,
        "phone": request.phone,
        "message": request.message,
        "interest": request.interest,
        "submitted_at": submitted_at,
        "email_sent": False
    }
    
    await db.contact_inquiries.insert_one(doc)
    logger.info(f"Contact inquiry saved: {inquiry_id} from {request.name}")
    
    # Send email notification if Resend is configured
    email_sent = False
    if RESEND_API_KEY:
        try:
            import resend
            html_content = f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #FF4500; color: white; padding: 20px; text-align: center;">
                    <h1 style="margin: 0;">New Gym Inquiry!</h1>
                </div>
                <div style="padding: 20px; background: #f5f5f5;">
                    <h2 style="color: #333;">Contact Details</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">{request.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">{request.email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">{request.phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Interest:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">{request.interest}</td>
                        </tr>
                    </table>
                    <h3 style="color: #333; margin-top: 20px;">Message:</h3>
                    <p style="background: white; padding: 15px; border-radius: 5px;">{request.message}</p>
                </div>
                <div style="background: #333; color: #999; padding: 15px; text-align: center; font-size: 12px;">
                    The Sqquats Gym - Haldwani's Standard of Strength
                </div>
            </div>
            """
            
            params = {
                "from": SENDER_EMAIL,
                "to": [RECIPIENT_EMAIL],
                "subject": f"New Gym Inquiry from {request.name} - {request.interest}",
                "html": html_content
            }
            
            await asyncio.to_thread(resend.Emails.send, params)
            email_sent = True
            
            # Update database
            await db.contact_inquiries.update_one(
                {"id": inquiry_id},
                {"$set": {"email_sent": True}}
            )
            logger.info(f"Email notification sent for inquiry: {inquiry_id}")
            
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
    
    return ContactFormResponse(
        id=inquiry_id,
        name=request.name,
        email=request.email,
        phone=request.phone,
        message=request.message,
        interest=request.interest,
        submitted_at=submitted_at,
        email_sent=email_sent
    )

@api_router.get("/contact/inquiries", response_model=List[ContactFormResponse])
async def get_inquiries():
    """Get all contact inquiries (admin endpoint)"""
    inquiries = await db.contact_inquiries.find({}, {"_id": 0}).to_list(1000)
    return inquiries


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
