from pydantic import BaseModel
from datetime import date


class TradeSchema(BaseModel):
    user_id: int
    
    pair: str
    trade_type: str
    entry: float
    exit: float
    stop_loss: float
    take_profit: float
    lot_size: float
    risk_reward: float
    profit: float
    result: str
    strategy: str
    notes: str
    trade_date: date
    
    class Config:
        from_attributes = True