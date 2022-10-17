def cypressRunStep() {
    catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
        script {}
        }
        ansiColor('xterm') {
            timeout(15) {
                ansiColor('xterm') {
                    sh  'xvfb-run -a cypress run --headless --browser \$BROWSER --config-file config/\$CYPRESS_CONFIG_FILE.config.js --env viewport=\$VIEWPORT --config video=\$VIDEO\$TESTFILES \$RECORD --reporter-options \$REPORTER_OPTIONS'
                }
            }
        }
    }

podTemplate(slaveConnectTimeout: 4300, nodeSelector: 'xxx', containers: [
        containerTemplate(name: 'cypress1', image: 'cypress/included:' + env.CYPRESS_VERSION, ttyEnabled: true, command: 'cat', resourceRequestCpu: '2000m', resourceRequestMemory: '4000Mi', envVars: [
                envVar(key: 'CYPRESS_RECORD_KEY', value: 'xx'),],
                livenessProbe: containerLivenessProbe(execArgs: '/bin/sh -c "touch /tmp/healthy; sleep 30; rm -rf /tmp/healthy; sleep 600"', initialDelaySeconds: 30, timeoutSeconds: 1, failureThreshold: 3, periodSeconds: 10, successThreshold: 1)),
        containerTemplate(name: 'cypress2', image: 'cypress/included:' + env.CYPRESS_VERSION, ttyEnabled: true, command: 'cat', resourceRequestCpu: '2000m', resourceRequestMemory: '4000Mi', envVars: [
                envVar(key: 'CYPRESS_RECORD_KEY', value: '65f24c3c-6d57-4082-966b-6e9b797b3541'),],
                livenessProbe: containerLivenessProbe(execArgs: '/bin/sh -c "touch /tmp/healthy; sleep 30; rm -rf /tmp/healthy; sleep 600"', initialDelaySeconds: 30, timeoutSeconds: 1, failureThreshold: 3, periodSeconds: 10, successThreshold: 1)),
],
        volumes: [emptyDirVolume(mountPath: '/dev/shm', memory: true)]
        ,
        yaml: """apiVersion: "v1"
        kind: "Pod"
        spec:
            tolerations:
            - effect: "NoSchedule"
             key: "xxx"
             operator: "Exists"
          """)
        {
            node(POD_LABEL) {
                stage('Git clone') {
                    timeout(10) {
                        cleanWs()
                        retry(2) {
                            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                sleep(time: 5, unit: "SECONDS")
                                git branch: '\$GITBRANCH', credentialsId: 'jenkins-ssh-key', url: 'ssh://git@sth-gitlab01xxx.git'
                            }
                        }
                    }
                }
                stage('Run Cypress Tests') {
                    parallel "Cypress-1": {
                        container('cypress1') {
                            sleep(time: 1, unit: "SECONDS")
                            cypressRunStep()
                        }
                    },
                    "Cypress-2": {
                        container('cypress2') {
                            sleep(time: 10, unit: "SECONDS")
                            cypressRunStep()
                        }
                    }
                }
                container('cypress2') {
                    stage('Reporting') {
                        timeout(5) {
                            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                retry(5) {
                                    sh 'set +x\n' +
                                            'echo ============================\n' +
                                            'echo Extra Environment Variable\n' +
                                            'echo ============================\n'
                                    script {
                                        def props = readJSON file: 'cypress/results/reports/mochawesome.json'
                                        env.TOTAL = props['stats']['tests']
                                        env.PASS = props['stats']['passes']
                                        env.FAIL = props['stats']['failures']
                                        env.SKIP = props['stats']['skipped']
                                        env.PENDING = props['stats']['pending']
                                    }
                                    PASS = env.PASS
                                    FAIL = env.FAIL
                                    DURATION = env.DURATION
                                }
                            }
                        }
                        timeout(5) {
                            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                retry(2) {
                                    sh 'set +x\n' +
                                            'echo ============================\n' +
                                            'echo Create HTML report\n' +
                                            'echo ============================\n' +
                                            '$(npm bin)/generate-mochawesome-report --jsonDir cypress/results/reports/ --no-code --no-showPending --screenshotsDir mochawesome-report --reportTitle ${VIEWPORT}\\ viewport\\ using\\ ${BROWSER}\\ browser\\ on\\ ${ENVIRONMENT}\\ ${BASEURL}' +
                                            '\necho ============================\n'
                                }
                            }
                        }
                        timeout(5) {
                            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                sh 'set +x\n' +
                                        'echo ============================\n' +
                                        'echo Publish Report\n' +
                                        'echo ============================\n'
                                retry(2) {
                                    publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: '/home/jenkins/agent/workspace/${JOB_NAME}/cypress/reports/html/', reportFiles: 'index.html', reportName: 'Report', reportTitles: ''])
                                }
                            }
                        }
                        send_slack_message('#cypress-job-results', "<${env.JENKINS_URL}/view/CYPRESS/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Report/|*${env.JOB_NAME}* > (${env.DURATION})\n " +
                                "*Passed:* ${env.PASS} *Failed:* ${env.FAIL}\n" +
                                "run on *${env.ENVIRONMENT}* by *" + USER + "* with viewport *${env.VIEWPORT}*")

                        def stableText =
                                '<p><span><strong>TEST RUN DETAILS</strong></span></p>\n' +
                                '<table>\n' +
                                '<tbody>\n' +
                                '<tr>\n' +
                                '<td>Cypress Report</td>\n' +
                                '</tr>\n' +
                                '<tr>\n' +
                                '<td>Run by</td>\n' +
                                '<td>' + USER + '</td>\n' +
                                '</tr>\n' +
                                '<tr>\n' +
                                '<td>Browser</td>\n' +
                                '<td>${ENV:BROWSER}</td>\n' +
                                '</tr>\n' +
                                '<tr>\n' +
                                '<td>Run Time</td>\n' +
                                '<td>' + DURATION + '</td>\n' +
                                '</tr>\n' +
                                '</tbody>\n' +
                                '</table>'
                        rtp(
                                stableText: stableText,
                                unstableAsStable: true,
                                failedAsStable: true,
                                parserName: 'HTML',
                                abortedAsStable: true
                        )
                    }
                }
                stage('Clean Workspace') {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        cleanWs()
                    }
                }
            }
        }
