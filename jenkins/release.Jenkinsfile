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
                    agent {
                        label 'windows'
                    }

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
                        stage('release') {
                            options {
                                timeout(time: 1, unit: 'HOURS')
                            }
                            steps {
                                dir('release') {
                                    sh 'sh $PWD/client.sh'
                                }
                            }

                            post {
                                success {
                                    archiveArtifacts artifacts: 'release/artefacts/ClientLourd.zip'
                                }
                            }
                        }
                    }
                }
                stage('Mobile') {
                    agent {
                        docker {
                            image 'lex0re/flutter-emulator:latest'
                        }
                    }

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
                        stage('release') {
                            options {
                                timeout(time: 1, unit: 'HOURS')
                            }
                            steps {
                                dir('release') {
                                    sh 'apt update && apt install -y zip'
                                    sh 'sh $PWD/mobile.sh'
                                }
                            }

                            post {
                                success {
                                    archiveArtifacts artifacts: 'release/artefacts/ClientLeger.zip'
                                }
                            }
                        }
                    }

                }
                stage('Server') {
                    agent {
                        docker {
                            image 'xwiillz/node-chromium-mongo:lts-bionic'
                            args '-v $HOME/server/node_modules:/root/server/node_modules'
                        }
                    }

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
                        stage('release') {
                            options {
                                timeout(time: 1, unit: 'HOURS')
                            }
                            steps {
                                dir('release') {
                                    sh 'apt update && apt install -y zip'
                                    sh 'sh $PWD/server.sh'
                                }
                            }

                            post {
                                success {
                                    archiveArtifacts artifacts: 'release/artefacts/Serveur.zip'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
