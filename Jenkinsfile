
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        IMAGE_NAME = 'devops-demo'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Environment') {
            steps {
                sh '''
                    set -e
                    echo "Node.js version:"
                    node --version

                    echo "npm version:"
                    npm --version

                    echo "Git commit:"
                    git rev-parse --short HEAD
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    set -e
                    test -f package.json
                    test -f package-lock.json
                    npm ci
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh '''
                    set -e

                    # Run Jest directly to avoid .bin permission issues
                    node ./node_modules/jest/bin/jest.js --runInBand
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    set -e
                    docker build \
                        --pull \
                        -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                        -t ${IMAGE_NAME}:latest \
                        .
                '''
            }
        }

        stage('Verify Docker Image') {
            steps {
                sh '''
                    set -e
                    docker image inspect ${IMAGE_NAME}:${BUILD_NUMBER}
                    docker image ls ${IMAGE_NAME}
                '''
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Tests passed and the Docker image was built.'
        }

        failure {
            echo 'FAILURE: Check the stage logs above to find the issue.'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}
