#!groovy

pipeline {
    agent none
    options {
        gitLabConnection('GitLab')
        gitlabCommitStatus(name: 'Jenkins')
        disableConcurrentBuilds(abortPrevious: true)
        timestamps()
        skipDefaultCheckout(true)
    }
    triggers {
        gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
    }
    
    stages {
        stage('Env') {
            parallel {
                stage('Client') {
                    agent { 
                        docker { 
                            image 'xwiillz/node-chromium-mongo:lts-bionic'
                            args '-v $HOME/client/node_modules:/root/client/node_modules'
                        }
                    }

                    stages {
                        stage('git') {
                            steps {
                                cleanWs()
                                checkout scm
                            }
                        }
                        stage('install') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                dir('client') {
                                    sh 'npm ci --cache .npm --prefer-offline'
                                }
                            }
                        }
                        stage('lint') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                dir('client') {
                                    sh 'npm run lint'
                                }
                            }
                        }
                        stage('build') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                dir('client') {
                                    sh 'npm run build'
                                }
                            }
                            post {
                                always {
                                    archiveArtifacts artifacts: 'client/dist/**'
                                }
                            }
                        }
                        stage('test') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                dir('client') {
                                    sh 'Xvfb :99 -ac -screen 0 1920x1080x24 &'
                                    sh 'npm run coverage -- --browsers=ChromeHeadlessNoSandbox --watch=false'
                                }
                            }
                            post {
                                always {
                                    step([$class: 'CoberturaPublisher', coberturaReportFile: 'client/coverage/cobertura-coverage.xml'])
                                    step([$class: 'JUnitResultArchiver', testResults: 'client/coverage/karma-test.xml'])
                                }
                            }
                        }
                    }
                }
                // stage('Playwright') {
                //     agent { 
                //         docker { 
                //             image 'xwiillz/node-chromium-mongo:lts-bionic'
                //             args '-v $HOME/client/node_modules:/root/client/node_modules -v $HOME/server/node_modules:/root/server/node_modules'
                //         }
                //     }
                    
                //     stages {
                //         stage('git') {
                //             steps {
                //                 deleteDir()
                //                 checkout scm
                //             }
                //         }
                //         stage('install') {
                //             options {
                //                 timeout(time: 30, unit: 'MINUTES')
                //             }
                //             steps {
                //                 dir('client') {
                //                     sh 'npm ci --cache .npm --prefer-offline'
                //                     sh 'npm install -g n'
                //                     sh 'n 14.17.6'
                //                     sh 'npx playwright install'

                //                 }
                //                 dir('server') {
                //                     sh 'npm ci --cache .npm --prefer-offline'
                //                 }
                //             }
                //         }
                //         stage('build') {
                //             options {
                //                 timeout(time: 30, unit: 'MINUTES')
                //             }
                //             steps {
                //                 dir('client') {
                //                     sh 'npm run build'
                //                 }
                //             }
                //         }
                //         stage('test') {
                //             options {
                //                 timeout(time: 30, unit: 'MINUTES')
                //             }
                //             steps {
                //                 dir('server') {
                //                     sh 'npm start &'
                //                     sh 'sh $PWD/wait-for-linux.sh'
                //                 }
                //                 dir('client') {
                //                     sh 'sleep 2'
                //                     sh 'xvfb-run --auto-servernum --server-args="-screen 0 1280x960x24" -- npm run playwright'
                //                 }
                //             }
                //             post {
                //                 always {
                //                     step([$class: 'JUnitResultArchiver', testResults: 'client/playwright/test-results/results.xml'])
                //                     archiveArtifacts artifacts: 'client/playwright/test-results/**', excludes: 'client/playwright/test-results/results.xml'
                //                 }
                //             }
                //         }
                //     }
                // }
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
                                checkout scm
                            }
                        }
                        stage('build') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                dir('mobile') {
                                    sh 'flutter clean'
                                    sh 'flutter pub get'
                                    sh 'flutter --version'
                                    sh 'flutter gen-l10n'
                                    sh 'flutter pub run build_runner build --delete-conflicting-outputs'
                                    sh 'export PATH="$PATH":"$HOME/.pub-cache/bin"'
                                    sh 'dart pub global activate junitreport'
                                }
                            }
                        }
                        stage('test') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                dir('mobile') {
                                    sh 'mkdir -p test-results'
                                    sh '''#!/bin/bash
                                        set -o pipefail
                                        flutter test test --machine | dart pub global run junitreport:tojunit -o test-results/unit-test-results.xml || { echo "Some Test failed"; exit 1; }
                                    '''
                                }
                            }
                            post {
                                always {
                                    step([$class: 'JUnitResultArchiver', testResults: 'mobile/test-results/unit-test-results.xml'])
                                }
                            }
                        }
                    }
                }
                stage('Emulator') {
                    agent {
                        label 'windows'
                    }
                    
                    stages {
                        stage('git') {
                            steps {
                                cleanWs()
                                checkout scm
                            }
                        }
                        stage('install') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                dir('server') {
                                    sh 'npm ci --cache .npm --prefer-offline'
                                }
                            }
                        }
                        stage('build') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                dir('mobile') {
                                    sh 'flutter clean'
                                    sh 'flutter pub get'
                                    sh 'flutter --version'
                                    sh 'flutter gen-l10n'
                                    sh 'flutter pub run build_runner build --delete-conflicting-outputs'
                                    sh 'set PATH=”~/AppData/Local/Pub/Cache/bin”'
                                    sh 'dart pub global activate junitreport'
                                }
                            }
                        }
                        stage('test') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                dir('server') {
                                    sh 'npm start &'
                                    sh 'sh $PWD/wait-for-windows.sh'
                                }
                                dir('mobile') {
                                    sh 'emulator -avd Samsung_Galaxy_Tab_A_2019 -no-window -no-snapstorage &'
                                    sh 'adb wait-for-any-device'
                                    sh 'mkdir -p test-results'
                                    sh '''#!/bin/bash
                                        set -o pipefail
                                        flutter test integration_test -d emulator-5554 --machine | dart pub global run junitreport:tojunit -o test-results/e2e-test-results.xml || { echo "Some Test failed"; exit 1; }
                                    '''
                                }
                            }
                            post {
                                always {
                                    sh 'adb -s emulator-5554 emu kill'
                                    step([$class: 'JUnitResultArchiver', testResults: 'mobile/test-results/e2e-test-results.xml'])
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
                                checkout scm
                            }
                        }
                        stage('install') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                dir('server') {
                                    sh 'npm ci --cache .npm --prefer-offline'
                                }
                            }
                        }
                        stage('lint') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                dir('server') {
                                    sh 'npm run lint'
                                }
                            }
                        }
                        stage('build') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                dir('server') {
                                    sh 'npm run build'
                                }
                            }
                            post {
                                always {
                                    archiveArtifacts artifacts: 'server/out/**'
                                }
                            }
                        }
                        stage('test') {
                            options {
                                timeout(time: 30, unit: 'MINUTES')
                            }
                            steps {
                                dir('server') {
                                    sh 'npm run coverage'
                                }
                            }
                            post {
                                always {
                                    step([$class: 'CoberturaPublisher', coberturaReportFile: 'server/coverage/cobertura-coverage.xml'])
                                    step([$class: 'JUnitResultArchiver', testResults: 'server/coverage/mocha-test.xml'])
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
