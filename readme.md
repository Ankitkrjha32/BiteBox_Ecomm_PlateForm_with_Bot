# Bite-Box

## Overview
Bite-Box is a full-stack food delivery application that connects users with restaurants and food services. This platform allows users to browse restaurants, view menus, place orders, and track deliveries.

## Features

### User Authentication
- User registration and login functionality
- Secure authentication with JWT access tokens and refresh tokens
- Protected routes for authenticated users

### User Interface
- Responsive design with mobile and desktop support
- Dynamic header with login/logout functionality
- Interactive navigation bar and sidebar
- Search functionality for finding restaurants and food items

### Product Browsing
- Category-based product browsing
- Detailed product pages with information and images
- Search functionality for finding specific items

### Shopping Experience
- Shopping cart functionality
- Order placement and tracking
- Location services for delivery

## Tech Stack

### Frontend
- React.js for UI components
- React Router for navigation
- Material UI for component styling
- Context API for state management
- Axios for API requests
- Tailwind CSS for styling

### Backend
- Node.js and Express for API server
- MongoDB for database storage
- JWT for authentication
- RESTful API architecture

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Frontend Setup
1. Clone the repository
   ```
   git clone https://github.com/9582anupam/bite-box.git
   cd bite-box
   ```

2. Install frontend dependencies
   ```
   cd Frontend
   npm install
   ```

3. Create .env file in Frontend directory with:
   ```
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

4. Start the frontend development server
   ```
   npm start
   ```
   The application will be available at http://localhost:3000

### Backend Setup
1. Install backend dependencies
   ```
   cd Backend
   npm install
   ```

2. Create .env file in Backend directory with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bite-box
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   NODE_ENV=development
   ```

3. Start the backend server
   ```
   npm start
   ```
   The server will run at http://localhost:5000

## Authors

- **Anupam** - [9582anupam](https://github.com/9582anupam)

## License

This project is licensed under the MIT License - see below for details:
