from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.models.trade import Trade
from app.models.user import User

from app.schemas.trade import TradeSchema

from app.security.jwt_handler import verify_access_token

router = APIRouter()

security = HTTPBearer()


# ======================================
# Get Current User
# ======================================

def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(security),

    db: Session = Depends(get_db)

):

    token = credentials.credentials

    payload = verify_access_token(token)

    if payload is None:

        raise HTTPException(

            status_code=401,

            detail="Invalid or expired token"

        )

    user = db.query(User).filter(

        User.id == payload.get("user_id")

    ).first()

    if user is None:

        raise HTTPException(

            status_code=401,

            detail="User not found"

        )

    return user


# ======================================
# Create Trade
# ======================================

@router.post("/trade")
def create_trade(

    trade: TradeSchema,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    new_trade = Trade(

        user_id=current_user.id,

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


# ======================================
# Get Logged-in User Trades
# ======================================

@router.get("/trades")
def get_trades(

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    return db.query(Trade).filter(

        Trade.user_id == current_user.id

    ).all()


# ======================================
# Get Single Trade
# ======================================

@router.get("/trade/{trade_id}")
def get_trade(

    trade_id: int,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    trade = db.query(Trade).filter(

        Trade.id == trade_id,

        Trade.user_id == current_user.id

    ).first()

    if trade is None:

        raise HTTPException(

            status_code=404,

            detail="Trade not found"

        )

    return trade


# ======================================
# Update Trade
# ======================================

@router.put("/trade/{trade_id}")
def update_trade(

    trade_id: int,

    updated_trade: TradeSchema,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    trade = db.query(Trade).filter(

        Trade.id == trade_id,

        Trade.user_id == current_user.id

    ).first()

    if trade is None:

        raise HTTPException(

            status_code=404,

            detail="Trade not found"

        )

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


# ======================================
# Delete Trade
# ======================================

@router.delete("/trade/{trade_id}")
def delete_trade(

    trade_id: int,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    trade = db.query(Trade).filter(

        Trade.id == trade_id,

        Trade.user_id == current_user.id

    ).first()

    if trade is None:

        raise HTTPException(

            status_code=404,

            detail="Trade not found"

        )

    db.delete(trade)

    db.commit()

    return {

        "message": "Trade deleted successfully"

    }