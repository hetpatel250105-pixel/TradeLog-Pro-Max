# TradeLog Pro Max

TradeLog Pro Max is a full-stack trading journal that I built to help traders record and analyze their trades.
The idea behind this project was to create a simple platform where a trader can log trades, track performance, and understand their strengths and weaknesses through backtesting charts and statistics.
Along the way, I also wanted to improve my backend and frontend development skills by building a real-world application instead of another basic CRUD project.

*A PLATFORM FOR TRADERS, BUILD BY A TRADER.*
---

## What you can do

- Create an account and log in
- Add new trades
- Edit existing trades
- Delete trades
- View trading statistics
- Track win rate and profit/loss
- Analyze performance using charts
- Switch between dark mode and light mode

---

## Tech Stack

### Frontend

- React
- React Router
- Context API
- Axios
- Recharts
- CSS

### Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- Uvicorn

---

## Project Structure

```
TradeLog-Pro-Max

> backend
  > app
  > database
  > models
  > routers
  > schemas
  > main.py

> frontend
  > src
  > components
  > pages
  > context
  > services
  > App.jsx

> README.md
```

---

### Login Page

<img width="1912" height="902" alt="image" src="https://github.com/user-attachments/assets/67692afc-2de5-43bd-b19f-835ba247151e" />

---

### Dashboard

<img width="1918" height="913" alt="image" src="https://github.com/user-attachments/assets/d67961d0-ffd8-4e50-b582-c068fd7981d3" />

---

<img width="1918" height="898" alt="image" src="https://github.com/user-attachments/assets/e94d8698-c9e4-4db7-ada1-90de18c55a7b" />

---

<img width="1918" height="912" alt="image" src="https://github.com/user-attachments/assets/8e8ef70f-ab66-42f5-9907-612e5f99f7ac" />

---

<img width="1918" height="906" alt="image" src="https://github.com/user-attachments/assets/e06f093d-6e7b-4b33-8dc7-17b98e2fd7d1" />

---

## Why I built this project

I built TradeLog Pro Max to combine my interest in trading with my goal of becoming a full-stack Python developer.
I wanted to move beyond tutorial projects and build a real application that solves a practical problem.
The project helped me gain experience with React, FastAPI, PostgreSQL, REST APIs, and data visualization while creating a tool that I can continue to use and improve.

## Things I learned

While building this project I got hands-on experience with:

- Building REST APIs using FastAPI
- Managing application state with React Context API
- Working with PostgreSQL databases
- Using SQLAlchemy ORM
- Creating reusable React components
- Connecting frontend and backend using Axios
- Visualizing data with Recharts
- Organizing a scalable project structure
- Using Git and GitHub for version control

---

## Running the project

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Future Improvements

Some features I plan to add in the future include:

- A backtesting software
- AI-based trade analysis
- Trade screenshot upload
- Trading calendar
- CSV import/export
- Better performance analytics
- PDF reports
- Mobile optimization

---

## Author

**Het Patel**

GitHub:
https://github.com/hetpatel250105-pixel
