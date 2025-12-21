# LearnSphere Backend

LearnSphere is a robust, interview-ready Backend Learning Management System (LMS) built with Node.js and Express. It provides a clean and scalable architecture for managing courses, lessons, and student enrollments with role-based access control.

## 🚀 Features

- **Authentication & Authorization**: Secure JWT-based authentication with refresh token rotation and session management.
- **Role-Based Access Control (RBAC)**: Distinct permissions for Students, Instructors, and Admins.
- **Course Management**: Create, read, and manage courses. Instructors can manage their own content, while Admins have full control.
- **Lesson Management**: Add, update, and delete lessons within courses. Support for free previews.
- **Enrollment System**: Students can enroll in courses, track their progress, and manage their learning journey.
- **Clean API Design**: RESTful endpoints with consistent request/response patterns and robust error handling.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Validator.js
- **Security**: Bcrypt (password hashing), Cookie-parser (secure cookies)

## 📂 API Modules

The API is organized into several key modules:

- **Auth**: Handles user registration, login, logout, and token refreshing.
- **Courses**: Manages course metadata and listing.
- **Lessons**: Manages the content within each course.
- **Enrollments**: Handles student registration for courses and enrollment status tracking.

## 🔐 Auth & Role Rules

LearnSphere uses a middleware-based approach for authentication and authorization:

- **Authentication**: Handled by `userAuth` middleware, which verifies the JWT in the Authorization header.
- **Authorization**: Handled by `authorize` middleware, which checks the user's role against the required permissions for the endpoint.
- **Roles**:
  - `student`: Can browse courses, view free lessons, and enroll in courses.
  - `instructor`: Can create and manage their own courses and lessons.
  - `admin`: Has full access to all resources, including user management and all course content.

## ⚙️ How to Run Locally

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/megabytis/LearnSphere.git
   cd LearnSphere/server
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `server` directory and add the following:

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   NODE_ENV=development
   ```

4. **Start the server**:

   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

The server will be running at `http://localhost:3000`.

## 🧪 Database Seeding

To populate your database with dummy data (users, courses, lessons), run the following command:

```bash
node seed.js
```

### Dummy Credentials

All dummy accounts use the password: **`Password123!`**

| Role             | Email                         |
| :--------------- | :---------------------------- |
| **Admin**        | `admin@learnsphere.com`       |
| **Instructor 1** | `instructor1@learnsphere.com` |
| **Instructor 2** | `instructor2@learnsphere.com` |
| **Instructor 3** | `instructor3@learnsphere.com` |
| **Student 1**    | `student1@learnsphere.com`    |
| _(up to)_        | ...                           |
| **Student 10**   | `student10@learnsphere.com`   |

## 📖 API Documentation

A Postman collection is included in the `server` directory: `postman_collection.json`. Import this into Postman to explore and test the API endpoints.
