🎟️ Event Booking System
A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing and booking events. It includes features for user authentication, event browsing and filtering, admin event management, and booking functionalities.

Deployed on:

🌐 Frontend: Vercel Frontend

🖥️ Backend: Vercel Backend

🚀 Features
🔐 Authentication
User registration & login (JWT & HttpOnly cookies)

Role-based access (Admin vs. User)

Email verification simulation

Protected routes using middleware

🎫 Event Management
Browse all events

Filter events by category

View event details

Admin: Create, update, delete events

Admin: Upload event images

📅 Booking System
Book an event (authenticated users only)

View your bookings in profile

Cancel a booking

Admin: View all bookings

📂 Categories Management (Admin)
Create and manage event categories

Assign categories to events

👤 User Profile
View profile information

View booking history

Cancel bookings directly from profile

⚙️ Technologies Used
Frontend: React, React Router, Tailwind CSS, Axios

Backend: Node.js, Express.js, MongoDB, Mongoose

Authentication: JWT, HttpOnly Cookies

Deployment: Vercel (frontend & backend)

Security: Helmet, CORS, Input validation

🧪 API Endpoints
🔐 Auth Routes (/api/v1/auth)
Method	Endpoint	Description
POST	/register	Register a new user
POST	/login	Login a user
POST	/logout	Logout user & clear cookie
GET	/me	Get current authenticated user

🎫 Event Routes (/api/v1/events)
Method	Endpoint	Description
GET	/	Get all events
GET	/:id	Get a single event by ID
POST	/	Create new event (admin)
PUT	/:id	Update event (admin)
DELETE	/:id	Delete event (admin)

🧾 Booking Routes (/api/v1/bookings)
Method	Endpoint	Description
POST	/	Book an event (user only)
GET	/my-bookings	Get bookings for logged-in user
DELETE	/:id	Cancel booking (user only)
GET	/	Get all bookings (admin only)

📂 Category Routes (/api/v1/categories)
Method	Endpoint	Description
GET	/	Get all categories
POST	/	Create a new category (admin)
PUT	/:id	Update category (admin)
DELETE	/:id	Delete category (admin)

🔧 Environment Variables
Create a .env file in the root of your server directory with the following variables:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://event-booking-system-client.vercel.app
NODE_ENV=production
🛠️ Installation & Development
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/event-booking-system.git
cd event-booking-system
2. Install dependencies
Server:
bash
Copy
Edit
cd server
npm install
Client:
bash
Copy
Edit
cd client
npm install
3. Run locally
bash
Copy
Edit
# Server
npm run dev

# Client
npm start
