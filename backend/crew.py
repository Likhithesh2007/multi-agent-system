from crewai import Crew
from backend.agents import planner, researcher, coder
from backend.tasks import plan_task, research_task, code_task

crew = Crew(
    agents=[planner, researcher, coder],
    tasks=[plan_task, research_task, code_task],
    process="sequential",
    verbose = True
)