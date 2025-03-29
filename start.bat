echo configure and start backend
start "Backend" cmd.exe /k "cd /d %cd%\backend && npm install && node server.js"

echo configure and start frontend
start "Frontend" cmd.exe /k "cd /d %cd%\frontend && npm install && npm start"

echo Project is now running, have fun!