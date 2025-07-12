# Backend-YT Project Documentation

_This documentation will be updated as new features are added to the project._

## Project Overview

This is a Node.js backend project built for learning purposes. It's a RESTful API server with MongoDB integration, following modern JavaScript practices with ES modules.

## Project Setup Timeline

### Step 1: Project Initialization

```bash
npm init
```

- Created `package.json` with project metadata
- Set up basic project structure
- Configured as ES module project (`"type": "module"`)

### Step 2: Dependencies Installation

```bash
npm install express mongoose dotenv
npm install --save-dev nodemon prettier
```

**Dependencies Added:**

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling tool
- **dotenv**: Environment variables management
- **nodemon**: Development server with auto-restart
- **prettier**: Code formatting tool

### Step 2.1: Additional Dependencies Installation

```bash
npm install cors cookie-parser
```

**Additional Dependencies Added:**

- **cors**: Cross-Origin Resource Sharing middleware
- **cookie-parser**: Cookie parsing middleware

### Step 3: Project Structure Setup

Created the following directory structure:

```
src/
├── index.js          # Main entry point
├── app.js            # Express app configuration
├── constants.js      # Application constants
├── db/
│   └── index.js      # Database connection
├── controllers/      # Route controllers (empty)
├── models/          # Database models (empty)
├── routes/          # API routes (empty)
├── middlewares/     # Custom middlewares (empty)
└── utils/           # Utility functions (empty)
```

### Step 4: Database Configuration

**File: `src/constants.js`**

```javascript
export const DB_NAME = "backend-yt";
```

**File: `src/db/index.js`**

- Implemented MongoDB connection using Mongoose
- Added error handling for connection failures
- Configured to use environment variables for MongoDB URI

### Step 5: Express App Setup

**File: `src/app.js`**

```javascript
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
```

- Configured CORS with environment-based origin
- Added cookie parsing middleware
- Set up JSON and URL-encoded body parsing with limits
- Configured static file serving from public directory
- Ready for middleware and route additions

### Step 6: Server Entry Point

**File: `src/index.js`**

- Configured environment variables with dotenv
- Set up database connection
- Implemented server startup with error handling
- Default port: 8000 (configurable via environment)

### Step 7: Development Script Configuration

**File: `package.json`**

```json
{
  "scripts": {
    "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
  }
}
```

- Development server with nodemon
- Auto-restart on file changes
- Environment variables loaded automatically

## Current Project State

### ✅ Completed Features

1. **Project Structure**: Well-organized modular architecture
2. **Database Connection**: MongoDB integration with Mongoose
3. **Server Setup**: Express server with error handling
4. **Development Environment**: Hot reload with nodemon
5. **Environment Configuration**: dotenv for environment variables
6. **CORS Configuration**: Cross-origin resource sharing setup
7. **Cookie Parser**: Cookie parsing middleware configured
8. **Body Parsing**: JSON and URL-encoded body parsing with limits
9. **Static File Serving**: Public directory configured for static files

### 📁 Directory Structure

```
backend-yt/
├── src/
│   ├── index.js          # Server entry point
│   ├── app.js            # Express app
│   ├── constants.js      # App constants
│   ├── db/
│   │   └── index.js      # Database connection
│   ├── controllers/      # Route handlers (ready for implementation)
│   ├── models/          # Database models (ready for implementation)
│   ├── routes/          # API routes (ready for implementation)
│   ├── middlewares/     # Custom middlewares (ready for implementation)
│   └── utils/           # Utility functions (ready for implementation)
├── public/
│   └── temp/            # Static files directory
├── package.json          # Project configuration
├── package-lock.json     # Dependency lock file
├── bun.lockb            # Bun lock file (if using Bun)
└── README.md            # Basic project description
```

### 🔧 Environment Setup Required

Create a `.env` file in the root directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_uri
CORS_ORIGIN=http://localhost:3000
```

### 🚀 How to Run the Project

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Create `.env` file with required variables

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Access the server:**
   - Server will run on `http://localhost:8000`

## Utility Classes Documentation

### ApiError Class

The `ApiError` class is a custom error handler that extends the built-in `Error` class to provide standardized error responses for the API.

**Location:** `src/utils/ApiError.js`

**Constructor Parameters:**

- `statusCode` (number): HTTP status code for the error
- `message` (string, optional): Error message (default: "Something Went Wrong !!")
- `errors` (array, optional): Array of detailed error objects (default: [])
- `stack` (string, optional): Error stack trace (default: "")

**Properties:**

- `statusCode`: HTTP status code
- `data`: Always null for errors
- `message`: Error message
- `success`: Always false for errors
- `errors`: Array of detailed error information
- `stack`: Error stack trace

**Usage Example:**

```javascript
import { ApiError } from "../utils/ApiError.js";

// Basic error
throw new ApiError(400, "Bad Request");

// Detailed error with validation errors
throw new ApiError(422, "Validation Failed", [
  { field: "email", message: "Invalid email format" },
  { field: "password", message: "Password too short" },
]);

// Error with custom stack trace
throw new ApiError(500, "Internal Server Error", [], "Custom stack trace");
```

### ApiResponse Class

The `ApiResponse` class provides a standardized structure for successful API responses.

**Location:** `src/utils/ApiResponse.js`

**Constructor Parameters:**

- `statusCode` (number): HTTP status code for the response
- `data` (any): Response data payload
- `message` (string, optional): Success message (default: "Success")

**Properties:**

- `statusCode`: HTTP status code
- `data`: Response data payload
- `message`: Success message
- `success`: Boolean indicating success (true for status codes < 400)

**Usage Example:**

```javascript
import { ApiResponse } from "../utils/ApiResponse.js";

// Basic success response
const response = new ApiResponse(200, userData, "User retrieved successfully");

// Response with default message
const response = new ApiResponse(201, createdUser);

// Response object structure
{
  statusCode: 200,
  data: userData,
  message: "User retrieved successfully",
  success: true
}
```

### asyncHandler Function

The `asyncHandler` is a higher-order function that wraps async route handlers to automatically handle promise rejections and errors without requiring try-catch blocks in every controller.

**Location:** `src/utils/asyncHandler.js`

**Parameters:**

- `requestHandler` (function): The async route handler function

**Returns:** A wrapped function that handles promise rejections

**Features:**

- Automatically catches promise rejections
- Passes errors to Express error handling middleware
- Eliminates the need for try-catch blocks in controllers
- Maintains clean, readable controller code

**Usage Example:**

```javascript
import { asyncHandler } from "../utils/asyncHandler.js";

// Without asyncHandler (requires try-catch)
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, user));
  } catch (error) {
    next(error);
  }
};

// With asyncHandler (cleaner code)
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).json(new ApiResponse(200, user));
});
```

**Alternative Implementation (Commented):**
The file also includes an alternative implementation using try-catch instead of Promise.resolve:

```javascript
const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res, next);
  } catch (err) {
    res.status(err.code || 500).json({
      success: false,
      message: err.message,
    });
  }
};
```

### Best Practices for Using Utility Classes

1. **Error Handling:**
   - Use `ApiError` for all application errors
   - Provide meaningful error messages
   - Include validation errors when applicable
   - Use appropriate HTTP status codes

2. **Response Formatting:**
   - Use `ApiResponse` for all successful responses
   - Maintain consistent response structure
   - Include relevant data and messages

3. **Async Operations:**
   - Wrap all async route handlers with `asyncHandler`
   - Let the utility handle promise rejections
   - Focus on business logic in controllers

4. **Error Middleware Integration:**
   - Ensure Express error handling middleware is configured
   - The `asyncHandler` passes errors to `next()` for centralized handling

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Module System**: ES Modules
- **Development**: Nodemon for hot reload
- **Code Formatting**: Prettier
- **CORS**: Cross-origin resource sharing
- **Cookie Parser**: Cookie parsing middleware

## Project Metadata

- **Name**: backend-yt
- **Version**: 1.0.0
- **Author**: Harshil Valiya
- **License**: ISC
- **Repository**: https://github.com/harshilvaliya/backend-yt

---
