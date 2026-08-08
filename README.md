# Task Manager Backend

A simple REST API backend for a task management application built with Node.js, Express, MongoDB, and JWT authentication. This project is configured to deploy as a serverless backend on Vercel.

## Project Overview

- User registration and login with email/password.
- JWT-based authentication for protected routes.
- CRUD operations for tasks.
- MongoDB persistence via Mongoose.
- Vercel-compatible serverless entrypoint via `api/index.js`.

## Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/SriSitharth/Task_Manager_Backend.git
cd Task_Manager_Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with these variables:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

4. Start locally:

```bash
npm start
```

The server will run locally on `http://localhost:5000` if you use `server.js` directly.

## Environment Variables

- `PORT`: Local server port. Used only during local development.
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWT tokens.

> Do not commit your `.env` file or secret values to source control.

## Vercel Deployment

This backend is configured for Vercel using `vercel.json` and `api/index.js`.

1. Push the repository to GitHub.
2. Connect the repo to Vercel.
3. Add environment variables in the Vercel dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
4. Deploy.

Vercel does not require a `PORT` value for the serverless function.

## API Endpoints

### Authentication

#### Register a new user

- URL: `POST /api/auth/register`
- Body:
  - `email` (string, required)
  - `password` (string, required, min 5 chars)
- Response:
  - `token` (JWT)

#### Login

- URL: `POST /api/auth/login`
- Body:
  - `email` (string, required)
  - `password` (string, required)
- Response:
  - `token` (JWT)

### Tasks

All task routes require an `Authorization` header with a Bearer token:

```
Authorization: Bearer <token>
```

#### Get all tasks

- URL: `GET /api/tasks`
- Response:
  - Array of task objects

#### Create a task

- URL: `POST /api/tasks`
- Body:
  - `title` (string, required)
  - `description` (string, optional)
  - `status` (string, optional: `todo`, `in-progress`, `done`)
  - `dueDate` (ISO date string, optional)
- Response:
  - Created task object

#### Update a task

- URL: `PUT /api/tasks/:id`
- Body: One or more task fields to update
- Response:
  - Updated task object

#### Delete a task

- URL: `DELETE /api/tasks/:id`
- Response:
  - `{ message: "Deleted successfully" }`

## Data Models

### User

- `email` (string, required, unique)
- `password` (string, required)

### Task

- `title` (string, required)
- `description` (string)
- `status` (string, enum: `todo`, `in-progress`, `done`)
- `dueDate` (Date)
- `userId` (ObjectId, required)

## Notes

- This backend is designed to run as a serverless function on Vercel.
- Local startup remains supported with `npm start`.
- Make sure the MongoDB cluster accepts connections from Vercel IP ranges or allows access from anywhere if using a connection string.
