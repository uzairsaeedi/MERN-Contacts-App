# 📇 MERN Contacts App (with Docker + Jenkins CI/CD)

A full-stack **Contact Management System** built using the **MERN Stack (MongoDB, Express.js, React, Node.js)** — now fully **Dockerized** and connected to an automated **CI/CD pipeline (GitHub → Jenkins → Docker Compose)**. 🐳⚙️

This app allows users to **register, log in, and manage their personal contact lists securely** using **JWT-based authentication**. Each user has their **own separate contacts**, ensuring privacy and data isolation 🔒.

---

## 🚀 Features

* 🔐 **JWT Authentication** — Secure login and registration system
* 👤 **User-specific Contacts** — Each user manages only their own contacts
* 🧾 **CRUD Operations** — Add, view, update, and delete contacts
* 🧭 **Protected Routes** — Accessible only to logged-in users
* 🎨 **Modern UI** — Clean, responsive React frontend
* 🐳 **Dockerized Setup** — Run the entire stack (frontend, backend, and MongoDB) using Docker Compose
* 🔁 **Automated CI/CD** — Push to GitHub → Jenkins builds Docker images → Jenkins deploys via Docker Compose

---

## 🧩 Tech Stack

**Frontend:**

* React.js ⚛️
* React Router
* Axios
* React Toastify (toasts)

**Backend:**

* Node.js
* Express.js
* MongoDB + Mongoose
* JSON Web Tokens (JWT)
* bcrypt.js

**DevOps / CI:**

* Docker 🐳
* Docker Compose
* Jenkins (Pipeline)
* GitHub Webhooks

---

## ⚙️ Local Installation & Setup (with Docker)

> NOTE: If you prefer CI/CD, see the **Jenkins Setup** section below — once Jenkins is configured, pushes to GitHub will automatically build images and deploy the app.

### 1. Clone the repository

```bash
git clone https://github.com/uzairsaeedi/MERN-Contacts-App.git
cd MERN-Contacts-App
```

### 2. Create a `.env` file inside the backend folder

```bash
# backend/.env
PORT=8080
MONGO_URI=mongodb://mongo:27017/contacts_db
JWT_SECRET=your_secret_key
```

### 3. Build and run using Docker Compose (manual)

When developing locally you can still run the app manually. Previously you ran `docker compose up --build` — with CI/CD the pipeline will perform automated builds, but you can still run locally with:

```bash
# Build images and run services on your machine (manual)
docker compose up --build
```

To run detached (background):

```bash
docker compose up -d --build
```

If you want Jenkins to perform the builds and then update running containers, Jenkins will run the same command on the host so you will not need to run `docker compose` manually after a push.

---

## 🌐 Access the app (local Docker Compose)

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend API:** [http://localhost:8080/api](http://localhost:8080/api)

---

## 🧠 API Endpoints

| Method | Endpoint                      | Description                                 |
| ------ | ----------------------------- | ------------------------------------------- |
| POST   | `/api/users/register`         | Register a new user                         |
| POST   | `/api/users/login`            | Log in a user and return JWT                |
| GET    | `/api/users/current`          | Get current logged-in user (requires token) |
| GET    | `/api/contacts/getAll`        | Fetch all user’s contacts                   |
| GET    | `/api/contacts/ById/:id`      | Fetch a contact by ID                       |
| POST   | `/api/contacts/createContact` | Add a new contact                           |
| PUT    | `/api/contacts/update/:id`    | Update a contact                            |
| DELETE | `/api/contacts/delete/:id`    | Delete a contact                            |

---

## 🔁 CI/CD Workflow (GitHub → Jenkins → Docker Compose)

This project is configured to be deployed automatically when you push to `main` (or any configured branch). The workflow implemented on my setup is:

1. **Developer pushes code to GitHub** (frontend/backend changes or Dockerfile/Jenkinsfile updates).
2. **GitHub Webhook** fires a `push` event to Jenkins (`/github-webhook/`).
3. **Jenkins Pipeline Job** receives the webhook and checks out the updated code.
4. Jenkins builds Docker images for backend and frontend (tags include the Git commit SHA or `latest`).
5. Jenkins runs `docker compose up -d --build` on the deployment host (the Jenkins agent) to recreate/run containers with the new images.
6. The app is live with the latest changes.

> Notes:
>
> * If you push from your machine and your Jenkins is running locally, you can expose Jenkins temporarily to GitHub using `ngrok` or similar tunneling tools (for local testing).
> * In production you would typically push images to a Docker registry (Docker Hub / ECR) and pull those images from the deployment host. This README includes both options below.

---

## 🛠️ Jenkins Setup (pipeline job)

### Prerequisites on the Jenkins host (where pipeline will run):

* Docker installed and running
* Docker Compose installed
* Jenkins user is able to run Docker commands (add `jenkins` user to `docker` group or run Jenkins with required privileges)
* Install Jenkins plugins: **GitHub**, **Git**, **Pipeline**, **Docker Pipeline** (optional), **GitHub Integration Plugin**

### A. Create credentials in Jenkins

1. **GitHub personal access token** (if repo is private) — store as **`github-token`** (Credential type: Secret text)
2. **Docker Hub credentials** (if you push images to Docker Hub) — store as **`dockerhub-creds`** (Username/password)

> If you are building and running images on the same Jenkins host (local), you can skip pushing to Docker Hub and let `docker compose up --build` rebuild local images.

### B. Add Webhook in GitHub

* Go to your repo → **Settings → Webhooks → Add webhook**
* **Payload URL:** `https://<your-jenkins-url>/github-webhook/` (if Jenkins is local and you’re testing, use your `ngrok` public URL + `/github-webhook/`)
* **Content type:** `application/json`
* **Which events:** Just the `push` event
* Save the webhook.

### C. Create a Pipeline job in Jenkins

1. **New Item → Pipeline → OK**

2. Under **Build Triggers**, check **GitHub hook trigger for GITScm polling**

3. Under **Pipeline → Definition**, select **Pipeline script from SCM** (or `Jenkinsfile` in repo)

   * SCM: Git
   * Repository URL: `https://github.com/uzairsaeedi/MERN-Contacts-App.git`
   * Credentials: `github-token` (if required)
   * Branches to build: `*/main` (or your branch)

4. Save.

### D. `Jenkinsfile` (declarative pipeline)

Place the `Jenkinsfile` at the repo root (it will be used by the pipeline job above). This file assumes Jenkins runs on the same host that runs Docker and Docker Compose.

> Optional: To push images to Docker Hub instead of running compose locally, use `docker login` with Jenkins Docker credentials and `docker push` steps. Then update your `docker-compose.yml` to reference the pushed tags.

---

## 🔁 Option: Push images to Docker Hub (registry-based flow)

If you prefer a registry flow (recommended for multi-host deployments):

1. Jenkins builds images and tags them with `username/repo:tag` (for example `uzairsaeedi/contacts-backend:${GIT_COMMIT}`)
2. Jenkins logs in to Docker Hub using a Jenkins credential (ID: `dockerhub-creds`) and pushes the images.
3. The deployment step runs on the server(s) that pull the images from Docker Hub and `docker compose up -d` with the proper tags.

**Example snippet for build & push (inside Jenkinsfile)**

```groovy
stage('Push to Docker Hub') {
  steps {
    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
      sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
      sh 'docker tag ${BACKEND_IMAGE}:latest ${DOCKER_USER}/${BACKEND_IMAGE}:${GIT_COMMIT}'
      sh 'docker push ${DOCKER_USER}/${BACKEND_IMAGE}:${GIT_COMMIT}'
      // repeat for frontend
    }
  }
}
```

Then your `docker-compose.yml` on the deployment host should reference the registry images.

---

## 🔒 Security & Best Practices

* **Do not store secrets in the repo.** Use Jenkins credentials for tokens and registry logins.
* **Use tags** (e.g., commit SHA) instead of only `latest` for reproducible deployments.
* **Enable HTTPS** for Jenkins if exposing to the internet (use a proper domain + SSL)
* **Limit webhook access** and use a secret token (add the secret both in GitHub webhook and Jenkins GitHub plugin settings)

---

## 🧪 Local testing with ngrok (if Jenkins is local)

If Jenkins runs on your local machine and isn’t publicly accessible, use `ngrok` to expose it temporarily:

```bash
ngrok http 9090
# copy the https forwarding URL and use: https://<your-ngrok>.ngrok-free.app/github-webhook/
```

Then add that public URL in GitHub webhook settings. You can monitor the webhook traffic at `http://127.0.0.1:4040` while ngrok is running.

---

## 🧑‍💻 Usage Flow (automated)

1. Push code to GitHub
2. GitHub sends a push event to Jenkins webhook
3. Jenkins job runs:

   * Checks out code
   * Builds Docker images (backend/frontend)
   * Optionally pushes images to registry
   * Runs `docker compose up -d --build` to update containers
4. App is running with updated code

---

## 👨‍💻 Author

**Muhammad Uzair Saeedi**
📧 [uzairsaeedi627@gmail.com](mailto:uzairsaeedi627@gmail.com)
💼 [LinkedIn](https://www.linkedin.com/in/muhammad-uzair-saeedi/)
🐙 [GitHub](https://github.com/uzairsaeedi)

---

## 🏁 License

This project is licensed under the **MIT License**.

