// Requires Docker on the Jenkins agent. To use a bare Linux agent with Node + Chrome
// installed instead, replace the `agent { docker { ... } }` block with `agent any`.
pipeline {
  agent {
    docker {
      image 'cypress/included:15.13.0'
    }
  }

  options {
    timestamps()
    ansiColor('xterm')
  }

  parameters {
    string(
      name: 'CYPRESS_BASE_URL',
      defaultValue: 'https://demo1.dustidecommerce.store',
      description: 'Application base URL for Cypress (maps to cypress.config.js baseUrl).'
    )
  }

  environment {
    CI = 'true'
    CYPRESS_BASE_URL = "${params.CYPRESS_BASE_URL ?: 'https://demo1.dustidecommerce.store'}"
    REPORT_ROOT = 'cypress/reports/html'
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('E2E tests') {
      steps {
        sh '''
          CYPRESS_REPORT_DIR="${REPORT_ROOT}/chrome" npx cypress run --browser chrome --headless
          CYPRESS_REPORT_DIR="${REPORT_ROOT}/firefox" npx cypress run --browser firefox --headless
        '''
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'cypress/reports/html/**/*', allowEmptyArchive: true
    }
    failure {
      archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
      archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
    }
  }
}
