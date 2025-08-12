📡 Real-Time Web Service with Django, PostgreSQL, WebSockets, Redis & React
This project is for real time display a list of recently added news

⚙️ Tech Stack
Backend:
Python & Django – Core web framework and API handling

PostgreSQL – Relational database for structured data

WebSockets (Daphne) – Real-time communication protocol

Redis – Pub/Sub layer for pushing real-time data to WebSockets

Frontend:
HTML / CSS / JavaScript

React – Component-based frontend UI library

Note !!! The frontend was a learning journey! I'm not a frontend developer, but I tackled this challenge with help from GPT and managed to build a functional interface despite facing significant issues along the way.

🔄 Real-Time Functionality
Real-time data updates using WebSockets.

Used Redis for Pub/Sub broadcasts events to connected clients

Backend Setup
create .env file and add private credentials I sent privately on telegram
run commands below:
    docker compose build
    docker compose up

# Run migrations
    docker compose run web python manage.py migrate

Frontend Setup
    npm install
    npm start

Noteee !
This project was a valuable learning experience, especially on the frontend side. Although I’m not a frontend expert, I pushed through and implemented the UI with help from GPT where needed. It was tough, but rewarding — and I learned a lot in the process.