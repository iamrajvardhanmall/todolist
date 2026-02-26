from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# allowing react frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# simple model for a todo item
class Todo(BaseModel):
    id: int
    title: str
    completed: bool = False
    due_date: str = ""   # format: YYYY-MM-DD
    due_time: str = ""   # format: HH:MM

class TodoCreate(BaseModel):
    title: str
    due_date: str = ""
    due_time: str = ""

# using a list instead of database for simplicity
todos = []
counter = 1  # to give each todo a unique id


@app.get("/todos", response_model=List[Todo])
def get_todos():
    return todos


@app.post("/todos", response_model=Todo)
def create_todo(todo: TodoCreate):
    global counter
    if todo.title.strip() == "":
        raise HTTPException(status_code=400, detail="Title cannot be empty")
    new_todo = Todo(id=counter, title=todo.title.strip(), completed=False, due_date=todo.due_date, due_time=todo.due_time)
    todos.append(new_todo)
    counter += 1
    return new_todo


@app.put("/todos/{todo_id}", response_model=Todo)
def toggle_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            todo.completed = not todo.completed
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    global todos
    found = False
    for todo in todos:
        if todo.id == todo_id:
            found = True
            break
    if not found:
        raise HTTPException(status_code=404, detail="Todo not found")
    todos = [t for t in todos if t.id != todo_id]
    return {"message": "Deleted successfully"}


@app.get("/")
def root():
    return {"message": "Todo API is running!"}
