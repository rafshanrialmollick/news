# News Web

A simple full-stack news portal built with React, Vite, Express, and MongoDB.

## Features

- User signup and login
- Protected routes for authenticated users
- News listing and detail pages
- Create, edit, and delete news posts
- Admin dashboard access
- Contact page

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Zustand
- Backend: Node.js, Express, MongoDB, Mongoose, JWT

## Run the Project

### 1. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running locally.

### 3. Start the backend

```bash
cd server
npm run dev
```

### 4. Start the frontend

```bash
cd client
npm run dev
```

The app should run at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Admin Login

The seeded admin user is:

- Email: eleanor@newsportal.com
- Password: password123

## Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/newsweb
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

## Seed Data

To create demo admin data and sample news posts:

```bash
cd server
npm run seed
```

This will create the admin user and seed sample articles.
