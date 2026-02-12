# Full-Stack Application

This is a full-stack web application built using React for the frontend and Node.js with Express and MongoDB for the backend.

## Features

- **Frontend**:
  - React Router for navigation.
  - Lazy loading of components for better performance.
  - Dynamic routes for event registration.
  - Components for hackathon forms, dashboards, and more.
  - Toast notifications using `react-hot-toast`.

- **Backend**:
  - RESTful API built with Express.
  - MongoDB for database storage.
  - Routes for user registration and hackathon management.
  - Environment variable support using `dotenv`.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <[repository-url](https://github.com/shivamkumar692005/VCODE_2025)>
   cd VCODE_2025
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following:
     ```
     PORT=8000
     MONNGO_URL=mongodb://localhost:27017/mydatabase
     ```



## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

## Project Structure

### Frontend (`frontend` folder)
- **Pages**:
  - `Home`: Landing page.
  - `Events`: Displays events.
  - `DynamicRegister`: Dynamic event registration page.
  - `Contact`: Contact page.
  - `NotFound`: 404 page.
- **Components**:
  - `Header`, `Footer`: Common layout components.
  - `HackathonForm`, `HackathonBoard`: Hackathon-related components.
  - `ScrollToTop`: Utility for scrolling behavior.

### Backend (`backend` folder)
- **Routes**:
  - `/api/register`: Handles user registration.
  - `/api/hackathon`: Manages hackathon-related data.
- **Models**:
  - `EventRegistration`: MongoDB schema for event registrations.
- **Utilities**:
  - MongoDB connection using `mongoose`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
