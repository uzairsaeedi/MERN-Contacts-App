A full-stack **Contact Management System** built with the **MERN Stack (MongoDB, Express.js, React, Node.js)**.  
This app allows users to **register, log in, and manage their personal contact lists securely** using **JWT-based authentication**.  
Each user has their **own separate contacts**, ensuring privacy and data isolation 🔒.

## 🚀 Features

- 🔐 **JWT Authentication** — Secure login and registration system.  
- 👤 **User-specific Contacts** — Each user can only view and manage their own contacts.  
- ➕ **CRUD Operations** — Add, view, edit, and delete contacts easily.  
- ⚡ **MERN Stack** — MongoDB, Express.js, React, and Node.js integrated seamlessly.  
- 🧭 **Protected Routes** — Only authenticated users can access dashboard and contacts.  
- 🎨 **Modern UI** — Clean and responsive design built with React and CSS.  

## 🧩 Tech Stack

**Frontend:**
- React.js ⚛️  
- React Router  
- Axios  
- Toast Notifications  

**Backend:**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JSON Web Tokens (JWT)  
- bcrypt.js (for password hashing)  

## ⚙️ Installation & Setup

Follow these steps to run the project locally 👇

### 1️⃣ Clone the repository

```bash
git clone https://github.com/uzairsaeedi/MERN-Contacts-App.git
```
**Navigate into the project folder:**
cd MERN-Contacts-App

**Install dependencies:**
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

**Create a .env file inside your backend folder and add:**
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

**Run the Development Servers:**
# Run backend (from backend folder)
npm start

# Run frontend (from frontend folder)
npm run dev

Frontend usually runs on http://localhost:5173

Backend runs on http://localhost:8080 || 8000
