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

**🧠 API Endpoints**
Method	Endpoint	Description
POST	/api/users/register	Register a new user
POST	/api/users/login	Log in a user and return JWT
GET	/api/users/current	Get current logged-in user
GET	/api/contacts/getAll	Fetch all user’s contacts
GET	/api/contacts/ById/:id	Fetch contact by Id
POST	/api/contacts/createContact	Add new contact
PUT	/api/contacts/update/:id	Update existing contact
DELETE	/api/contacts/delete/:id	Delete contact

**🧑‍💻 Usage Flow**

Register a new account.

Log in using your credentials.

Access your dashboard to manage contacts.

Add, edit, or delete contacts — they’re saved privately to your account.

**🛠️ Folder Structure**

mern-contacts-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── constants.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md

**🤝 Contributing**

Pull requests are welcome!
If you find a bug or have an idea to improve this project, feel free to fork and submit a PR.

**🧑‍🏫 Author**

Muhammad Uzair Saeedi
📧 uzairsaeedi627@gmail.com
💼 https://www.linkedin.com/in/muhammad-uzair-saeedi/
🐙 https://github.com/uzairsaeedi

**🏁 License**

This project is licensed under the MIT License.
