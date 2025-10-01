# Felina Showroom Application

A tablet-based showroom and point-of-sale application designed for in-store customer interactions. It consists of a Vue.js frontend and a Node.js backend.

## Architecture

This project contains two main packages:

* `felina-tablet-app`: The frontend application built with Vue 3, Vite, and Pinia for state management.
* `felina-backend`: The backend API server built with Node.js and Express.

---

## Prerequisites

* Node.js (v20.19.0 or higher recommended)
* npm (v11 or higher recommended)

---

## Getting Started

### 1. Installation

Clone the repository and install the dependencies for both the frontend and backend applications.

```bash
# Navigate to the backend directory and install dependencies
cd felina-backend
npm install

# Navigate to the frontend directory and install dependencies
cd ../felina-tablet-app
npm install

# Return to the root directory
cd ..
````

### 2\. Configuration

You need to create `.env` files for both the frontend and backend to store environment-specific variables.

#### Backend Configuration

Create a `.env` file in the `felina-backend` directory:

```
# felina-backend/.env

# The port the server will run on
PORT=3000

# The secret API key the tablet app must provide
TABLET_API_KEY="tablet-secret-key-123"

# The origin URL of the frontend app for CORS
ALLOWED_ORIGIN="http://localhost:5173"

# Log level (e.g., 'info', 'debug', 'warn', 'error')
LOG_LEVEL="debug"
```

#### Frontend Configuration

Create a `.env.local` file in the `felina-tablet-app` directory (this file is gitignored by default):

```
# felina-tablet-app/.env.local

# The base URL of the backend API
VITE_API_BASE_URL="http://localhost:3000/api"

# The API key to include in requests to the backend
VITE_API_KEY="tablet-secret-key-123"
```

### 3\. Running the Application

You will need two separate terminal sessions to run both the backend and frontend development servers.

**Terminal 1: Start the Backend Server**

```bash
cd felina-backend
npm run dev
```

The backend API will be running on `http://localhost:3000`.

**Terminal 2: Start the Frontend Server**

```bash
cd felina-tablet-app
npm run dev
```

The frontend application will be available at `http://localhost:5173`.

-----

## Available Scripts

### Backend (`felina-backend`)

  * `npm run dev`: Starts the backend server in development mode with hot-reloading.
  * `npm run build`: Compiles the TypeScript code to JavaScript.
  * `npm run start`: Starts the compiled backend server (for production).

### Frontend (`felina-tablet-app`)

  * `npm run dev`: Starts the frontend development server.
  * `npm run build`: Builds the application for production.
  * `npm run test:unit`: Runs unit tests with Vitest.
  * `npm run test:e2e`: Runs end-to-end tests with Playwright.
  * `npm run lint`: Lints the code using ESLint.

<!-- end list -->

```
```