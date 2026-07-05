from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine

from app.routers import auth
from app.routers import trade

app = FastAPI(
    title="TradeLog Pro Max API",
    version="2.0"
)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(trade.router)


@app.get("/")
def home():

    return {

        "message": "Welcome to TradeLog Pro Max API"

    }


@app.get("/about")
def about():

    return {

        "project": "TradeLog Pro Max",

        "version": "2.0"

    }


@app.get("/developer")
def developer():

    return {

        "developer": "Het Patel"

    }


@app.get("/search")
def search(
    pair: str,
    strategy: str
):

    return {

        "pair": pair,

        "strategy": strategy

    }