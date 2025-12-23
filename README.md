# LearnSphere 🚀

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

LearnSphere is a high-energy, full-stack Learning Management System (LMS) designed for a premium and immersive learning experience. Built with a robust **Node.js/Express** backend and a vibrant **React** frontend, it features a modern **"Vibrant & Modern"** UI overhaul that moves away from minimalism towards a high-impact, energetic aesthetic.

---

## 📺 Live Demo & Preview

### [🔗 Visit LearnSphere Live](https://learn-sphere-neon.vercel.app)

![LearnSphere Demo](learnsphere.gif)

---

## ✨ Key Features

- **🎨 Vibrant & Modern UI**: A high-energy design system featuring mesh gradients, glowing accents, and bold typography (**Plus Jakarta Sans**).
- **💳 Seamless Stripe Integration**: Secure payment flow using Stripe Checkout for course enrollments.
- **🛠️ Stripe Developer Helper**: A built-in floating helper for developers to quickly test payment flows with "Magic Fill" and card presets.
- **🔐 Role-Based Access Control (RBAC)**: Distinct permissions for Students, Instructors, and Admins.
- **📚 Course & Lesson Management**: Full CRUD for courses and lessons with support for **Free Previews**.
- **⚡ Smart Enrollment System**: Dynamic enrollment/unenrollment with real-time status updates.
- **🎬 Immersive Lesson Player**: A high-contrast, dark-themed learning environment for focused study.
- **📊 My Learning Dashboard**: Personalized area for students to track their enrolled courses.
- **🛡️ Secure Authentication**: JWT-based auth with secure cookie handling and session persistence.

---

## 🛠 Tech Stack

### Frontend

- **Framework**: React (Vite)
- **Styling**: Vanilla CSS (Custom Vibrant Design System)
- **Icons**: Lucide React
- **State Management**: React Context API
- **API Client**: Axios

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Payments**: Stripe API
- **Security**: JWT, Bcrypt, Cookie-parser
- **Validation**: Validator.js

---

## 📂 Project Structure

```text
LearnSphere/
├── client/           # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   ├── styles/      # Global & component styles
│   │   └── services/    # API service layer
├── server/           # Node.js Backend
│   ├── src/
│   │   ├── modules/     # Feature-based modules (Auth, Course, Lesson, etc.)
│   │   ├── middleware/  # Auth & Role-based guards
│   │   └── utils/       # Shared utilities
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- Stripe Account (for API keys)

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=8888
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Run the seed script to populate the database:

```bash
node seed.js
```

### 2. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:8888
```

### 3. Run the Application

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔐 Dummy Credentials

All dummy accounts use the password: **`Password123!`**

| Role           | Email                         |
| :------------- | :---------------------------- |
| **Admin**      | `admin@learnsphere.com`       |
| **Instructor** | `instructor1@learnsphere.com` |
| **Student**    | `student1@learnsphere.com`    |

### 💳 Test Card Details

- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: `12/25`
- **CVC**: `123`

---

## 🚀 Future Roadmap

- [x] **Payment Integration**: Support for Stripe for paid courses.
- [ ] **Quiz System**: Interactive assessments at the end of each lesson.
- [ ] **Progress Tracking**: Visual progress bars and completion certificates.
- [ ] **Mobile App**: Dedicated mobile experience using React Native.
- [ ] **Live Classes**: Integration with Zoom/Jitsi for real-time sessions.

---

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by the LearnSphere Team.
