pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKERHUB_REPO = 'uzairsaeedi/my-contacts-app'
        ENV_FILE = 'backend/.env'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo '📥 Cloning repository...'
                git branch: 'main', url: 'https://github.com/uzairsaeedi/MERN-Contacts-App'
            }
        }

        stage('Prepare Environment') {
            steps {
                echo '🧾 Creating .env file for backend...'
                writeFile file: 'backend/.env', text: '''
        PORT=8080
        MONGO_URI=mongodb://mongo:27017/mycontacts-backend
        JWT_SECRET=uzair123
        '''
            }
        }

        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images...'
                bat 'docker compose build'
            }
        }

        stage('Run Tests (Optional)') {
            steps {
                echo '🧪 Running tests...'
                // You can add Jest, Mocha, or Cypress tests here
                bat 'echo "No tests configured yet."'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo '🚀 Pushing Docker images to Docker Hub...'
                bat """
                echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin
                docker compose push
                """
            }
        }

        stage('Deploy Containers') {
            steps {
                echo '⚡ Deploying containers...'
                bat 'docker compose down && docker compose up -d'
            }
        }
    }

    post {
        success {
            echo '✅ Build & deployment successful!'
        }
        failure {
            echo '❌ Build failed! Check the logs.'
        }
    }
}
