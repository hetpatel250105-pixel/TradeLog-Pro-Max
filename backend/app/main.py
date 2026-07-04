from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends

from app.models.trade import Trade
from app.schemas.trade import TradeSchema

from app.models.user import User
from app.schemas.user import UserSchema

from app.schemas.login import LoginSchema 

from app.db.session import get_db

from app.security.hash import hash_password
from app.security.hash import verify_password

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message" : "Welcome to TradeLog Pro Max API"
    }

@app.get("/about")
def about():
    return {
        "project" : "TradeLog Pro Max",
        "version" : "2.0"
    }
    
@app.get("/developer")
def developer():
    return {
        "developer" : "Het Patel"
    }

#@app.get("/trade/{trade_id}") #PATH PARAMETER
#def get_trade(trade_id : int):
#    return {
#        "trade_id" : trade_id,
#        "status" : "trade found"
#    }

@app.get("/search") #QUERY PARAMETER
def search(pair : str, strategy : str):
    return {
        "pair" : pair,
        "strategy" : strategy
    }

@app.post("/trade")
def create_trade(trade: TradeSchema, db: Session = Depends(get_db)):

    new_trade = Trade(

        pair=trade.pair,
        trade_type=trade.trade_type,
        entry=trade.entry,
        exit=trade.exit,
        stop_loss=trade.stop_loss,
        take_profit=trade.take_profit,
        lot_size=trade.lot_size,
        risk_reward=trade.risk_reward,
        profit=trade.profit,
        result=trade.result,
        strategy=trade.strategy,
        notes=trade.notes,
        trade_date=trade.trade_date
    )

    db.add(new_trade)
    db.commit()
    db.refresh(new_trade)

    return {
        "message": "Trade created successfully",
        "trade": new_trade
    }
    
@app.get("/trades")
def get_trades(db : Session = Depends(get_db)):
    
    trades = db.query(Trade).all()
    
    return trades

@app.get("/trade/{trade_id}")
def get_trade(trade_id : int, db : Session = Depends(get_db)):
    trade = db.query(Trade).filter(Trade.id == trade_id).first()
    

    if trade is None:
        return {
            "message" : "Trade not found"
        }
        
    return trade

@app.put("/trade/{trade_id}")
def update_trade(trade_id: int, updated_trade: TradeSchema, db: Session = Depends(get_db)):

    trade = db.query(Trade).filter(Trade.id == trade_id).first()

    if trade is None:

        return {
            "message": "Trade not found"
        }

    trade.pair = updated_trade.pair
    trade.trade_type = updated_trade.trade_type
    trade.entry = updated_trade.entry
    trade.exit = updated_trade.exit
    trade.stop_loss = updated_trade.stop_loss
    trade.take_profit = updated_trade.take_profit
    trade.lot_size = updated_trade.lot_size
    trade.risk_reward = updated_trade.risk_reward
    trade.profit = updated_trade.profit
    trade.result = updated_trade.result
    trade.strategy = updated_trade.strategy
    trade.notes = updated_trade.notes
    trade.trade_date = updated_trade.trade_date

    db.commit()
    db.refresh(trade)

    return {
        "message": "Trade updated successfully",
        "trade": trade
    }

@app.delete("/trade/{trade_id}")
def delete_trade(trade_id : int, db : Session = Depends(get_db)):
    trade = db.query(Trade).filter(Trade.id == trade_id).first()
    
    if trade is None:
        return{
            "message" : "Trade not found"
        }
    db.delete(trade)
    db.commit()
    
    return {
        "message" : "Trade deleted successfully"
    }
    
@app.post("/register")
def register(user : UserSchema, db : Session = Depends(get_db)):
    
    new_user = User(
        username = user.username,
        email = user.email,
        password = hash_password(user.password)
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return{
        "message" : "User registered successfully",
        "user" : new_user
    }
    
@app.post("/login")
def login(user : LoginSchema, db : Session = Depends(get_db)):
    
    db_user = db.query(User).filter(User.email == user.email).first()
    
    if db_user is None:
        return {
            "message" : "INVALID email"
        }
    if not verify_password(user.password, db_user.password):
        return {
            "message" : "INVALID password"
        }

    return {
        "message" : "login successful"
    }