// Requires Docker on the Jenkins agent. To use a bare Linux agent with Node + Chrome
// installed instead, replace the `agent { docker { ... } }` block with `agent any`.
pipeline {
    agent {
        docker {
            image 'cypress/included:15.13.0'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
            
        }
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress E2E Tests') {
            steps {
                sh 'npx cypress run'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/screenshots/**, cypress/videos/**', allowEmptyArchive: true
        }
    }
}
