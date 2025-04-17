# WTWR (What to Wear?): Back End

## Overview
The back-end project for the WTWR application provides a RESTful API service with user authentication and database integration. This server handles clothing item management, user accounts, and likes functionality.

## Repository Links
- Frontend Repository: [WTWR Frontend](https://github.com/your-username/wtwr-react)
- Backend (Current Repository): [WTWR Backend](https://github.com/practicum-student/se_project_express)

## Features
- User Authentication (signup/signin)
- JWT Token-based Authorization
- CRUD Operations for Clothing Items
- Like/Unlike System
- Error Handling & Input Validation
- MongoDB Database Integration

## Tech Stack
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **celebrate/Joi** - Request validation
- **cors** - Cross-origin resource sharing

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/practicum-student/se_project_express.git
   cd se_project_express
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with:
   ```env
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=mongodb://localhost:27017/wtwr_db
   ```

4. Start MongoDB:
   ```sh
   mongod
   ```

5. Start the server:
   - Development mode: `npm run dev`
   - Production mode: `npm run start`

The server will run on http://localhost:3001

## API Endpoints

### Authentication
- POST `/signup` - Register new user
- POST `/signin` - Login user
- GET `/users/me` - Get current user info

### Clothing Items
- GET `/items` - Get all clothing items
- POST `/items` - Create new clothing item
- DELETE `/items/:itemId` - Delete clothing item
- PUT `/items/:itemId/likes` - Like an item
- DELETE `/items/:itemId/likes` - Unlike an item

## Error Handling
The API implements centralized error handling with appropriate HTTP status codes and error messages.

## Security
- Password hashing using bcryptjs
- JWT token authentication
- Request validation using celebrate/Joi
- Protected routes using custom middleware

## Testing
Run tests using:
```sh
npm run test
```

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License
This project is licensed under the MIT License.
