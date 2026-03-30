@echo off
start cmd /k "cd frontend && npm start"
start cmd /k "python backend/app.py"
pause
