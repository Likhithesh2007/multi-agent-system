from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

from backend.crew import crew

app = FastAPI()

# Static folder
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates folder
templates = Jinja2Templates(directory="templates")


class Idea(BaseModel):
    idea: str


# Home page
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


# API endpoint for agents
@app.post("/generate-project")
async def generate_project(data: Idea):

    result = crew.kickoff(inputs={"idea": data.idea})

    # Extract outputs from each task
    planner_output = result.tasks_output[0].raw
    research_output = result.tasks_output[1].raw
    coder_output = result.tasks_output[2].raw

    return {
        "planner": planner_output,
        "research": research_output,
        "coder": coder_output
    }