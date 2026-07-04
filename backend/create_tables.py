from app.db.database import Base, engine
from app.models.trade import Trade
from app.models.user import User

Base.metadata.create_all(bind=engine)
print("Table created successfully!")
