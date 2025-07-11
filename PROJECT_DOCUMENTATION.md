# Backend-YT Project Documentation
*This documentation will be updated as new features are added to the project.* 

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
export const app = express();
```

- Basic Express app configuration
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
MONGODB_URI=mongodb://localhost:27017
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

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Module System**: ES Modules
- **Development**: Nodemon for hot reload
- **Code Formatting**: Prettier

## Project Metadata

- **Name**: backend-yt
- **Version**: 1.0.0
- **Author**: Harshil Valiya
- **License**: ISC
- **Repository**: https://github.com/harshilvaliya/backend-yt

---
