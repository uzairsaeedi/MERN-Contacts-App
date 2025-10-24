pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials') // Jenkins credentials ID
        DOCKERHUB_REPO = 'uzairsaeedi/my-contacts-app'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo '📥 Cloning repository...'
                git branch: 'main', url: 'https://github.com/uzairsaeedi/MERN-Contacts-App.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images...'
                sh 'docker compose build'
            }
        }

        stage('Run Tests (Optional)') {
            steps {
                echo '🧪 Running tests...'
                // You can add Jest, Mocha, or Cypress tests here
                sh 'echo "No tests configured yet."'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo '🚀 Pushing Docker images to Docker Hub...'
                sh """
                echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin
                docker compose push
                """
            }
        }

        stage('Deploy Containers') {
            steps {
                echo '⚡ Deploying containers...'
                sh 'docker compose down && docker compose up -d'
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
