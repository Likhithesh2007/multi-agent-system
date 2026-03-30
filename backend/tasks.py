from crewai import Task
from backend.agents import planner, researcher, coder

plan_task = Task(
    name="Planner Agent : System Architecture",
    description="""
    
Project Idea : 
{idea}

Analyze the idea and define:

- project_name
- core_features
- user_roles
- system_modules
""",
    agent=planner,
    expected_output="A structured breakdown of the software system"
)


research_task = Task(
    name="Planner Agent : System Architecture",
    description="""
You will receive the system architecture created by the Planner agent.

Using that architecture, recommend a modern production-ready tech stack.

Include:
- frontend framework
- backend framework
- database
- authentication method
- API architecture
- deployment option

For each technology provide a SHORT one-line reason.

IMPORTANT:
Do NOT generate:
- project folder structure
- code examples
- database schema
- API routes

Those will be handled by the Coding agent.

""",
    agent=researcher,
    context=[plan_task],   
    expected_output="Recommended tech stack with explanation"
)


code_task = Task(
    name="Coder Agent : Project Structure Generation",
    description="""
You will receive the system architecture and the selected technology stack from previous agents.

Using this information, generate a realistic production-ready project structure.


Include:
- frontend folder structure
- backend folder structure
- database schema
- API route examples
- sample code snippets
""",
    agent=coder,
    context=[plan_task, research_task],  
    expected_output="Complete project structure with code"
)