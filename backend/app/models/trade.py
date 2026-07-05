from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base


class Trade(Base):
    __tablename__ = "trades"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Many trades -> One user
    user = relationship("User", back_populates="trades")

    pair = Column(String, nullable=False)
    trade_type = Column(String, nullable=False)
    entry = Column(Float, nullable=False)
    exit = Column(Float, nullable=False)
    stop_loss = Column(Float, nullable=False)
    take_profit = Column(Float, nullable=False)
    lot_size = Column(Float, nullable=False)
    risk_reward = Column(Float, nullable=False)
    profit = Column(Float, nullable=False)
    result = Column(String, nullable=False)
    strategy = Column(String, nullable=False)
    notes = Column(String, nullable=True)
    trade_date = Column(Date, nullable=False)