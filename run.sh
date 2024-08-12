#!/bin/sh

cd backend/
source venv/bin/activate
./manage.py runserver 8000 &

cd ../frontend/
npm start