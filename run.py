import subprocess
import os


# Chạy Flask backend
backend_process = subprocess.Popen(['python', 'backend/app.py'])

# Chạy React frontend (đường dẫn chính xác)
frontend_process = subprocess.Popen(
    ['npm', 'start'],
    cwd='./frontend',
    shell=True  # Thêm shell=True để đảm bảo lệnh được thực thi trong môi trường shell
)
from app import app
app.run(debug=True)
