from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.models.user import User

from app.schemas.user import UserSchema
from app.schemas.login import LoginSchema

from app.security.hash import (
    hash_password,
    verify_password
)

from app.security.jwt_handler import create_access_token

router = APIRouter()


# ==========================
# Register
# ==========================

@router.post("/register")
def register(
    user: UserSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    new_user = User(

        username=user.username,

        email=user.email,

        password=hash_password(user.password)

    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {

        "message": "User registered successfully"

    }


# ==========================
# Login
# ==========================

@router.post("/login")
def login(
    user: LoginSchema,
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if db_user is None:

        raise HTTPException(

            status_code=401,

            detail="Invalid email"

        )

    if not verify_password(
        user.password,
        db_user.password
    ):

        raise HTTPException(

            status_code=401,

            detail="Invalid password"

        )

    access_token = create_access_token(

        {

            "user_id": db_user.id

        }

    )

    return {

        "access_token": access_token,

        "token_type": "bearer",

        "username": db_user.username,

        "email": db_user.email

    }