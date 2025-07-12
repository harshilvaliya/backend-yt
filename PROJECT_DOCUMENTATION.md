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

### Step 2.2: Authentication and Security Dependencies

```bash
npm install bcrypt jsonwebtoken
```

**Authentication Dependencies Added:**

- **bcrypt**: Password hashing library
- **jsonwebtoken**: JWT token generation and verification

### Step 2.3: Database Enhancement Dependencies

```bash
npm install mongoose-aggregate-paginate-v2
```

**Database Enhancement Dependencies Added:**

- **mongoose-aggregate-paginate-v2**: Pagination support for MongoDB aggregations

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

### Step 8: User Model Implementation

**File: `src/models/user.model.js`**

```javascript
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistroy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);
```

**Key Features:**

- **Password Hashing**: Automatic bcrypt hashing on save
- **JWT Token Generation**: Methods for access and refresh tokens
- **Password Verification**: Method to compare passwords
- **User Fields**: Username, email, fullName, avatar, coverImage, watchHistory
- **Indexing**: Optimized queries on username, fullName, and email
- **Timestamps**: Automatic createdAt and updatedAt fields

**Schema Methods:**

```javascript
// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password verification method
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Access token generation
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

// Refresh token generation
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};
```

### Step 9: Video Model Implementation

**File: `src/models/video.model.js`**

```javascript
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // from cloudinary
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

videoSchema.plugin(mongooseAggregatePaginate);
```

**Key Features:**

- **Video Metadata**: File URL, thumbnail, title, description, duration
- **View Tracking**: Automatic view count with default 0
- **Publishing Control**: isPublished flag for draft/published videos
- **Owner Reference**: Links to User model for video ownership
- **Pagination Support**: mongoose-aggregate-paginate-v2 plugin
- **Timestamps**: Automatic createdAt and updatedAt fields

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
10. **User Authentication**: JWT and bcrypt integration for secure user management
11. **User Model**: Complete user schema with password hashing and token generation
12. **Video Model**: Video schema with pagination support and user relationships
13. **Security Features**: Password hashing, JWT token generation, and refresh tokens

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

# JWT Configuration
ACCESS_TOKEN_SECRET=your_access_token_secret_key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
REFRESH_TOKEN_EXPIRY=10d
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

## Authentication and Security Features

### JWT Token System

The project implements a dual-token authentication system:

**Access Token:**
- Short-lived (1 day by default)
- Contains user identity information (id, email, username, fullName)
- Used for API authentication
- Stored in memory or secure HTTP-only cookies

**Refresh Token:**
- Long-lived (10 days by default)
- Contains only user ID for security
- Used to generate new access tokens
- Stored in HTTP-only cookies

### Password Security

**bcrypt Integration:**
- Automatic password hashing on user creation/update
- 10 rounds of hashing for optimal security-performance balance
- Secure password comparison method
- Prevents rainbow table attacks

**Password Validation:**
- Required field validation
- Automatic hashing before database storage
- Secure comparison for login verification

### User Model Security Features

**Schema-Level Security:**
- Unique constraints on username and email
- Indexed fields for optimized queries
- Lowercase transformation for consistency
- Trim whitespace for data integrity

**Authentication Methods:**
- `isPasswordCorrect()`: Secure password verification
- `generateAccessToken()`: JWT access token generation
- `generateRefreshToken()`: JWT refresh token generation

### Video Model Features

**Content Management:**
- Video file and thumbnail URL storage
- Title and description metadata
- Duration tracking from cloudinary
- View count with automatic increment capability
- Publishing status control (draft/published)

**User Relationships:**
- Owner reference to User model
- Watch history tracking in User model
- Pagination support for video listings

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

## Security Best Practices

### Environment Variables

**Required Environment Variables:**
- `ACCESS_TOKEN_SECRET`: Strong secret key for access tokens
- `REFRESH_TOKEN_SECRET`: Strong secret key for refresh tokens
- `ACCESS_TOKEN_EXPIRY`: Access token expiration time (e.g., "1d")
- `REFRESH_TOKEN_EXPIRY`: Refresh token expiration time (e.g., "10d")

**Security Recommendations:**
- Use strong, randomly generated secrets (32+ characters)
- Store secrets in environment variables, never in code
- Use different secrets for access and refresh tokens
- Regularly rotate secrets in production
- Use HTTPS in production environments

### JWT Token Security

**Token Storage:**
- Store access tokens in memory or secure HTTP-only cookies
- Store refresh tokens in HTTP-only, secure cookies
- Never store tokens in localStorage (vulnerable to XSS)
- Implement token rotation for enhanced security

**Token Validation:**
- Always verify token signatures
- Check token expiration on each request
- Implement token blacklisting for logout
- Use short-lived access tokens with refresh mechanism

### Password Security

**Hashing Best Practices:**
- Use bcrypt with 10+ rounds for production
- Never store plain text passwords
- Implement password strength requirements
- Use secure password reset mechanisms

**Authentication Flow:**
- Implement rate limiting for login attempts
- Use secure session management
- Log authentication events for monitoring
- Implement account lockout for failed attempts

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Module System**: ES Modules
- **Development**: Nodemon for hot reload
- **Code Formatting**: Prettier
- **CORS**: Cross-origin resource sharing
- **Cookie Parser**: Cookie parsing middleware
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **Database Enhancement**: mongoose-aggregate-paginate-v2 for pagination

## Project Metadata

- **Name**: backend-yt
- **Version**: 1.0.0
- **Author**: Harshil Valiya
- **License**: ISC
- **Repository**: https://github.com/harshilvaliya/backend-yt

---
