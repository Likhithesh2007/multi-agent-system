from crewai import Agent, LLM
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Groq LLM
llm = LLM(
    model="groq/llama-3.1-8b-instant",
    api_key=os.getenv("GROQ_API_KEY")
)

# Planner Agent
planner = Agent(
    role="Software Architect",
    goal="Analyze the user idea and design the overall software architecture",
    backstory=(
        "You are an expert software architect with years of experience "
        "designing scalable software systems. You carefully analyze user ideas "
        "and define core features, user roles, and system modules."
    ),
    llm=llm,
    verbose=True,
    allow_delegation=False
)

# Research Agent
researcher = Agent(
    role="Technology Research Specialist",
    goal="Recommend the best technology stack for building the system",
    backstory=(
        "You are a senior technology researcher who understands modern "
        "software development frameworks and infrastructure. "
        "You choose the best frontend, backend, database, and deployment technologies."
    ),
    llm=llm,
    verbose=True,
    allow_delegation=False
)

# Coder Agent
coder = Agent(
    role="Senior Software Engineer",
    goal="Generate project structure, database schema, and starter code",
    backstory=(
        "You are a highly skilled full-stack developer who writes clean, "
        "maintainable code. You generate realistic project architectures, "
        "API routes, database schemas, and starter code snippets."
    ),
    llm=llm,
    verbose=True,
    allow_delegation=False
)