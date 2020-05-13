# RMS API
A mildly opinionated, RESTish API template built with Node.js

### About
Designed to minimally abstract database logic, this API based on Node.js allows you to quickly distribute your data into your front end application. We have succesfully deployed this API on top of Postgres.

### Organization
````
config
  database.js --> Configuration file for db connection
controllers
  //...
  Here you will find all the controllers of the application
  ..//
models
  //...
  Here you will find all the models of the application
  ..//
routes
  rms-api-routes.js --> Configuration file for API's routes
````

### Install
clone or download the repository 
````
cd RMS_REST_API
npm install
````

### Start
````
npm start
````

The API runs on port ````3000```` by default, and the root can be accessed by navigating to ````http://localhost:3000/api```` in your browser.

### Author
[Luis Eduardo Mayida González](https://github.com/lalomayida)

### License
MIT
