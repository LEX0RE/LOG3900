#!groovy

pipeline {
    agent none
    environment {
        gitlabCredential = 'Gitlab'
        gitURL = 'https://gitlab.com/polytechnique-montr-al/log3900/23-1/equipe-206/LOG3900-206.git'
    }
    options {
        timestamps()
        skipDefaultCheckout(true)
    }

    stages {
        stage('Env') {
            parallel {
                stage('Client') {
                    agent any
                    
                    stages {
                        stage('git') {
                            steps {
                                cleanWs()
                                checkout([$class: 'GitSCM',
                                    branches: [[name: "${params.BRANCH_TAG_NAME}"]],
                                    userRemoteConfigs: [[credentialsId: gitlabCredential, url: gitURL]]
                                ])
                            }
                        }
                        stage('deploy') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                script {
                                    dir('docker/run') {
                                        sh 'sh $PWD/web-deploy.sh'
                                    }
                                }
                            }
                        }
                    }
                }
                stage('Server') {
                    agent any
                    
                    stages {
                        stage('git') {
                            steps {
                                cleanWs()
                                checkout([$class: 'GitSCM',
                                    branches: [[name: "${params.BRANCH_TAG_NAME}"]],
                                    userRemoteConfigs: [[credentialsId: gitlabCredential, url: gitURL]]
                                ])
                            }
                        }
                        stage('deploy') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                script {
                                    dir('docker/run') {
                                        sh 'sh $PWD/server-deploy.sh'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
