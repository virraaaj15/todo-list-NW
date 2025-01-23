import jenkins.model.*
import org.jenkinsci.plugins.workflow.job.*
import org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition

// Define job name
def jobName = "TodoListPipeline"

// Define Jenkins instance
def jenkins = Jenkins.getInstance()

// Check if the job already exists
if (jenkins.getItem(jobName) == null) {
    println "Creating job: ${jobName}"

    // Define pipeline script
    def pipelineScript = """
        pipeline {
            agent any

            environment {
                NODE_HOME = '/usr/local/bin'
                PATH = '\${NODE_HOME}:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
            }

            stages {
                stage('Debug PATH and Environment') {
                    steps {
                        script {
                            sh '''
                            #!/bin/bash
                            echo "Debugging PATH and Environment Variables..."
                            echo "Current PATH: \$PATH"
                            which sh || echo "sh not found"
                            which node || echo "Node.js not found"
                            which npm || echo "npm not found"
                            echo "Environment Debugging Completed."
                            '''
                        }
                    }
                }

                stage('Checkout') {
                    steps {
                        script {
                            git branch: 'main', url: 'https://github.com/virraaaj15/todo-list-NW.git'
                        }
                    }
                }

     stage('Install Dependencies') {
            steps {
                script {
                    sh '''
                    #!/bin/bash
                    echo "Installing Node.js dependencies..."
                    npm install --legacy-peer-deps
                    echo "Installing Cucumber as a dependency..."
                    npm install @cucumber/cucumber --save-dev --force
                    echo "Dependencies installed successfully."
                    '''
                }
            }
        }

        stage('Verify Dependencies') {
            steps {
                script {
                    sh '''
                    #!/bin/bash
                    echo "Verifying installed dependencies..."
                    npm list @cucumber/cucumber || echo "Cucumber is not installed"
                    '''
                }
            }
        }

                stage('Run Tests') {
                    steps {
                        script {
                            sh '''
                            #!/bin/bash
                            echo "Running tests using Nightwatch..."
                            npx nightwatch
                            echo "Tests completed successfully."
                            '''
                        }
                    }
                }

                stage('Publish Reports') {
                    steps {
                        publishHTML(target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'reports',
                            reportFiles: 'cucumber_report.html',
                            reportName: 'Test Report'
                        ])
                    }
                }
            }

            post {
                always {
                    script {
                        echo "Cleaning up workspace"
                        cleanWs()
                    }
                }
                success {
                    echo "Build completed successfully!"
                }
                failure {
                    echo "Build failed. Check the logs for details."
                }
            }
        }
    """

    // Create a new pipeline job
    def job = jenkins.createProject(org.jenkinsci.plugins.workflow.job.WorkflowJob, jobName)
    def flowDefinition = new CpsFlowDefinition(pipelineScript, true)
    job.setDefinition(flowDefinition)
    job.save()

    println "Job '${jobName}' created successfully."
} else {
    println "Job '${jobName}' already exists."
}
