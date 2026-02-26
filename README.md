<div align="center">

# ✅ TaskFlow — Todo List App

**A full-stack task management app built with FastAPI and React.js**

![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

</div>

---

## 📌 About

TaskFlow is a clean, modern todo list web application. You can add tasks with a specific **due date and time**, mark them as complete, filter by status, and track your progress — all in a sleek UI with a purple gradient theme.

Built as a full-stack project using:
- **FastAPI** (Python) for the REST API backend
- **React.js** for the interactive frontend
- **In-memory storage** (no database setup needed)

---

## 🖥️ Preview

> Run the app and open `http://localhost:3000`

| Feature | Description |
|---|---|
| ➕ Add Tasks | Type a task and hit Enter or click `+ Add` |
| 📅 Due Date & Time | Optionally set when the task is due |
| ✅ Complete Tasks | Click the circle checkbox to toggle done |
| 🗑️ Delete Tasks | Remove tasks with the trash icon |
| 🔍 Filter | Switch between All / Active / Completed |
| 📊 Progress Bar | Visual progress as you complete tasks |

---

## 📁 Project Structure

```
todolist/
│
├── backend/
│   ├── main.py              # FastAPI app — all routes defined here
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html       # HTML entry point
│   └── src/
│       ├── App.js           # Main React component
│       ├── App.css          # All styling
│       └── index.js         # React DOM render
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
- [Python 3.8+](https://www.python.org/downloads/)
- [Node.js 16+](https://nodejs.org/)

---

### 1️⃣ Backend — FastAPI

```bash
# Navigate to backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```

The API will be live at: **http://localhost:8000**  
Interactive API docs (Swagger UI): **http://localhost:8000/docs**

---

### 2️⃣ Frontend — React

Open a **new terminal** and run:

```bash
# Navigate to frontend folder
cd frontend

# Install Node dependencies
npm install

# Start the React development server
npm start
```

The app will open at: **http://localhost:3000**

> ⚠️ Make sure the backend is running before starting the frontend, otherwise the app will show a connection error.

---

## 🔌 API Reference

Base URL: `http://localhost:8000`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/todos` | Get all todos | — |
| `POST` | `/todos` | Create a new todo | `{ title, due_date?, due_time? }` |
| `PUT` | `/todos/{id}` | Toggle complete/incomplete | — |
| `DELETE` | `/todos/{id}` | Delete a todo | — |
| `GET` | `/` | Health check | — |

### Example — Create a Todo

```http
POST /todos
Content-Type: application/json

{
  "title": "Finish DSA assignment",
  "due_date": "2026-03-01",
  "due_time": "23:59"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Finish DSA assignment",
  "completed": false,
  "due_date": "2026-03-01",
  "due_time": "23:59"
}
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, plain CSS |
| Backend | FastAPI, Pydantic, Uvicorn |
| Fonts | Inter (Google Fonts) |
| API Comm. | REST (JSON over HTTP) |
| Storage | In-memory (Python list) |

---

## ⚠️ Known Limitations

- Data is stored **in memory** — all todos are lost when the backend server restarts.
- No user authentication — anyone with access to the API can read or delete todos.
- No persistent database (SQLite / PostgreSQL integration would be a good next step).

---

## 🔮 Possible Improvements

- [ ] Add SQLite or PostgreSQL database using SQLAlchemy
- [ ] Add user login / authentication with JWT
- [ ] Edit task titles inline
- [ ] Add task priority levels (low / medium / high)
- [ ] Email or browser notifications for due tasks
- [ ] Deploy to Render (backend) + Vercel (frontend)

---

## 👨‍💻 Author

Made with ❤️ using **FastAPI + React**

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
