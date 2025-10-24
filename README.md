# 📇 MERN Contacts App (with Docker Support)

A full-stack **Contact Management System** built using the **MERN Stack (MongoDB, Express.js, React, Node.js)** — now fully **Dockerized** 🐳!  

This app allows users to **register, log in, and manage their personal contact lists securely** using **JWT-based authentication**.  
Each user has their **own separate contacts**, ensuring privacy and data isolation 🔒.

---

## 🚀 Features

- 🔐 **JWT Authentication** — Secure login and registration system  
- 👤 **User-specific Contacts** — Each user manages only their own contacts  
- 🧾 **CRUD Operations** — Add, view, update, and delete contacts  
- 🧭 **Protected Routes** — Accessible only to logged-in users  
- 🎨 **Modern UI** — Clean, responsive React frontend  
- 🐳 **Dockerized Setup** — Run the entire stack (frontend, backend, and MongoDB) using Docker Compose  

---

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
- bcrypt.js  

**DevOps:**  
- Docker 🐳  
- Docker Compose  

---

## ⚙️ Installation & Setup (with Docker)

### 🧱 1️⃣ Clone the repository
```bash
git clone https://github.com/uzairsaeedi/MERN-Contacts-App.git
cd MERN-Contacts-App
```

### ⚙️ 2️⃣ Create a `.env` file inside the backend folder

```bash
PORT=8080
MONGO_URI=mongodb://mongo:27017/contacts_db
JWT_SECRET=your_secret_key
```

### 🐳 3️⃣ Build and run using Docker Compose
Make sure Docker Desktop is running, then run:
```bash
docker compose up --build
```

This command will:
- Spin up **MongoDB** container  
- Start **backend** Node.js server on port `8080`  
- Launch **frontend** React app on port `5173`

---

### 🌐 Access the app:
- **Frontend:** [http://localhost:5173](http://localhost:5173)  
- **Backend API:** [http://localhost:8080/api](http://localhost:8080/api)  
- **MongoDB:** Runs inside Docker container named `mongo`

---

## 🧠 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Log in a user and return JWT |
| GET | `/api/users/current` | Get current logged-in user |
| GET | `/api/contacts/getAll` | Fetch all user’s contacts |
| GET | `/api/contacts/ById/:id` | Fetch a contact by ID |
| POST | `/api/contacts/createContact` | Add a new contact |
| PUT | `/api/contacts/update/:id` | Update a contact |
| DELETE | `/api/contacts/delete/:id` | Delete a contact |

---

## 🧑‍💻 Usage Flow

1️⃣ Register a new account  
2️⃣ Log in using your credentials  
3️⃣ Manage your contacts (add, update, or delete)  
4️⃣ Each contact list is private to your user  

---

## 🤝 Contributing

Pull requests are welcome!  
If you find a bug or have ideas to improve this project, fork the repo and open a PR 🚀

---

## 👨‍💻 Author

**Muhammad Uzair Saeedi**  
📧 uzairsaeedi627@gmail.com  
💼 [LinkedIn](https://www.linkedin.com/in/muhammad-uzair-saeedi/)  
🐙 [GitHub](https://github.com/uzairsaeedi)

---

## 🏁 License
This project is licensed under the **MIT License**.