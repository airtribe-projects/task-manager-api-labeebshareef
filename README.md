# Task Manager API

A simple RESTful API for managing tasks using Node.js and Express.

## Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server with `npm start` or `node app.js`.
4. The API runs on `http://localhost:3000`.

## API Endpoints

### Get all tasks
- **GET** `/tasks`
- Returns a list of all tasks.

### Get tasks by completion status
- **GET** `/tasks?completed=true`
- Returns tasks filtered by completion status.

### Get tasks by priority
- **GET** `/tasks/priority/:level`
- Returns tasks with the specified priority.

### Get a task by ID
- **GET** `/tasks/:id`
- Returns a single task by its ID.

### Create a new task
- **POST** `/tasks`
- Body: `{ "title": "...", "description": "...", "completed": true, "priority": "high" }`
- Creates a new task.

### Update a task
- **PUT** `/tasks/:id`
- Body: `{ "title": "...", "description": "...", "completed": true, "priority": "low" }`
- Updates an existing task.

### Delete a task
- **DELETE** `/tasks/:id`
- Deletes a task by its ID.

## Testing the API

You can test the API using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

Example:
```bash
curl