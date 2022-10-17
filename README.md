# Cypress-Automation-Pointr

<p align="center">
  <a href="https://www.cypress.io"><img src="https://cloud.githubusercontent.com/assets/1268976/20607953/d7ae489c-b24a-11e6-9cc4-91c6c74c5e88.png"/></a>
</p>
<p align="center">
  <a href="https://on.cypress.io"> Cypress Docs</a>
</p>

## Installing

Install Cypress for Mac, Linux, or Windows, then [get started](https://on.cypress.io/install).

```bash
npm install cypress --save-dev
```
or
```bash
yarn add cypress --dev
```

![installing-cli e1693232](https://user-images.githubusercontent.com/1271364/31740846-7bf607f0-b420-11e7-855f-41c996040d31.gif)

## Getting Started
```
~ npx cypress open
```
**Run test with cypress UI (Electron or Chrome)**

```
type "cypress open" in terminal 
then click E2E test
then select browser and run
then click uiAutomation.cy.js
```

**Run test headless**

```
npx cypress run --headless -b chrome --spec "cypress/e2e/uiAutomation.cy.js"
npx cypress run --headless -b electron --spec "cypress/e2e/uiAutomation.cy.js"
You can find mochawesome report in cypress/results after test completed
```

### Cypress concepts
| Concepts | 
| ------ |
| [Commands](https://docs.cypress.io/api/cypress-api/custom-commands)

# RestApi Automation Pointr
## Installing

```bash
npm install --save express
```
## Getting Started RestAPI
```
Run sever on local 3000 port
node restApi/server.js
```
## Requests API
```
Firstly we have to add Dummy data like belows (POST);
POST request to localhost:3000/levels/
Json Body: {
    "name" : "Galyum 2 Levels",
    "country": "Ankara",
},

POST request to localhost:3000/sites/
Json Body: {
    "name" : "Odtu Teknokent",
    "country": "Ankara",
},

POST request to localhost:3000/builds/
Json Body: {
    "name" : "Galyum Building",
    "country": "Ankara",
},

Secondly we can get Dummy data like belows (GET);
GET request to localhost:3000/levels/
GET request to localhost:3000/sites/
GET request to localhost:3000/builds/

Get/Delete specific Dummy data like belows (GET/DELETE specific id);
GET request to localhost:3000/levels/*uuid* -> you can find uuid in GET response
DELETE request to localhost:3000/levels/*uuid*
```
## Requests API Test
```
Same steps as uiAutomation, but we have to select apiAutomation.cy.js in cypress UI
You can find example test of building api.
```

AUTOMATION PIPELINE CI/CD
===========================

<p align="center">
  <img src="https://pbs.twimg.com/media/FWTl-gSXEAItSV_?format=jpg&name=large" />
</p>

## Concept of Jenkins Pipeline
```
Example of pipeline in pipeline/cypress_parallel.groovy
- Git Clone automation repo
- Run Cypress Test parallel in different containers
- Reporting
- Creating HTML report
- Publishing in related slack channels..
```

