# Multi-Agent System

## Overview
AI system using multiple agents (planner, researcher, coder)

## Run
pip install -r requirements.txt
uvicorn backend.main:app --reload

## API
POST /generate

##  Workflow

1. User provides an idea
2. Planner agent designs system architecture
3. Researcher agent gathers insights
4. Coder agent generates implementation
5. Final structured output is returned

##  Example Output

Input:
"AI energy optimizer"

Output:
- Plan: System architecture...
- Research: Key insights...
- Code: Implementation...