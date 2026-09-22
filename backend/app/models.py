"""Pydantic models for Brew & Bloom data."""

from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime


class MenuItem(BaseModel):
    """Menu item model."""
    id: Optional[str] = Field(None, alias="_id")
    name: str
    description: str
    price: float
    category: str  # "coffee", "cold_brews", "pastries", "breakfast"
    image_url: str
    is_available: bool = True
    tags: list[str] = []  # e.g., "Vegan", "Organic", "New"

    class Config:
        populate_by_name = True


class TodaysSpecial(BaseModel):
    """Today's special item model."""
    id: Optional[str] = Field(None, alias="_id")
    name: str
    description: str
    price: float
    original_price: Optional[float] = None
    image_url: str
    available_until: str
    date: str = Field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d"))

    class Config:
        populate_by_name = True


class ContactMessage(BaseModel):
    """Contact form submission model."""
    name: str
    email: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat())


class NewsletterSubscription(BaseModel):
    """Newsletter subscription model."""
    email: str
    subscribed_at: str = Field(default_factory=lambda: datetime.now().isoformat())


class GalleryImage(BaseModel):
    """Gallery image model."""
    id: Optional[str] = Field(None, alias="_id")
    image_url: str
    alt_text: str
    category: str = "general"

    class Config:
        populate_by_name = True
