#!/bin/sh

cd backend/
python3 -m virtualenv -p `which python3.10` venv
source venv/bin/activate
pip install -r requirements.txt
./manage.py makemigrations
./manage.py migrate

cd ../frontend
npm install
cd ../
