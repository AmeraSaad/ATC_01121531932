# 🎟️ Event Booking System

A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing and booking events. It includes features for user authentication, event browsing and filtering, admin event management, and booking functionalities.

**Live Demo**
- Frontend: https://event-booking-system-3voq.vercel.app
- Backend API: https://vercel.com/amerasaads-projects/event-booking-system
  
---
How to Login as Admin
1- Open MongoDB → go to your users collection

2- Find the user you want (e.g. by email)

3- Edit the document → set:
  ```bash
   "isAdmin": true

4- Save → Login with that user → now admin access enabled

---

## 🚀 Features

### 🔐 Authentication
- **Signup** & **Login** with JWT & HttpOnly cookies  
- Role-based access (Admin vs. User)  
- Email verification flow  
- Forgot-password & reset-password via token  
- Protected routes middleware

### 🎫 Event Management
- Browse all events  
- Filter by category, venue, price, sort by date/price  
- View event details  
- **Admin**: Create, update, delete events  
- **Admin**: Upload multiple images per event

### 📂 Category Management (Admin)
- List all categories  
- Create, update, delete categories  
- Assign categories to events  

### 📅 Booking System
- **User**: Book exactly one ticket per event  
- **User**: View & cancel own bookings  
- **Admin**: View all bookings

### 👤 User Profile
- View personal info (username, email, role, verification status)  
- “My Bookings” tab for booking history & cancellation  

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Axios  
- **Backend**: Node.js, Express.js, Mongoose (MongoDB)  
- **Auth**: JWT, HttpOnly Cookies  
- **Security**: Helmet, CORS, Joi validation  
- **Deployment**: Vercel  

---


## 🧪 API Endpoints

### 🔐 Auth (`/api/v1/auth`)

| Method | Endpoint                  | Description                      |
|--------|---------------------------|----------------------------------|
| POST   | `/signup`                 | Register a new user              |
| POST   | `/login`                  | Login a user                     |
| POST   | `/logout`                 | Logout & clear auth cookie       |
| POST   | `/verify-email`           | Verify email via code            |
| POST   | `/forgot-password`        | Request password reset link      |
| POST   | `/reset-password/:token`  | Reset password using token       |
| GET    | `/check-auth`             | Check current auth & get user    |

---

### 🎫 Events (`/api/v1/events`)

| Method | Endpoint  | Description               |
|--------|-----------|---------------------------|
| GET    | `/`       | List all events           |
| GET    | `/:id`    | Get event by ID           |
| POST   | `/`       | Create event (Admin only) |
| PUT    | `/:id`    | Update event (Admin only) |
| DELETE | `/:id`    | Delete event (Admin only) |

---

### 📂 Categories (`/api/v1/categories`)

| Method | Endpoint  | Description                     |
|--------|-----------|---------------------------------|
| GET    | `/`       | List all categories             |
| POST   | `/`       | Create category (Admin only)    |
| PUT    | `/:id`    | Update category (Admin only)    |
| DELETE | `/:id`    | Delete category (Admin only)    |

---

### 📅 Bookings (`/api/v1/bookings`)

| Method | Endpoint  | Description                             |
|--------|-----------|-----------------------------------------|
| POST   | `/`       | Book an event (User only)               |
| GET    | `/me`     | Get user’s bookings (User only)         |
| DELETE | `/:id`    | Cancel a booking (User only)            |
| GET    | `/`       | List all bookings (Admin only)          |

---

## ⚙️ Installation & Development

1. **Clone** the repo

   ```bash
   git clone https://github.com/your-username/event-booking-system.git
   cd event-booking-system

2. **Install** dependencies

    ```bash
    # Backend
    cd server && npm install
  
   # Frontend
   cd ../client && npm install

3- **Configure** environment variables

   Create a `.env` file in the `server/` folder:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=https://event-booking-system-client.vercel.app
   NODE_ENV=production
   MAILTRAP_TOKEN= your_token
   SERVER_EMAIL= your_SERVER_EMAI
   EMAIL_PASS= your_EMAIL_PASS
   CLIENT_URL=
   CLOUDINARY_CLOUD_NAME= your_CLOUD_NAME
   CLOUDINARY_API_KEY= your_API_KEY
   CLOUDINARY_API_SECRET= ypur_API_SECRET

---
4. **Run** locally

    ```bash
     # Backend
     cd server
     npm run dev

     # Frontend
     cd ../client
     npm start
     

