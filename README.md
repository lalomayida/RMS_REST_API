# RMS API
A mildly opinionated, RESTish API for [RMS](https://github.com/lalomayida/rms-front-end) built with Node.js

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

### Routes 
#### GET Routes
````
api/user-management/users
api/user-management/user-information
api/user-management/visible-users
api/user-management/visible-agents
api/role-management/roles
api/status-management/status
api/room-management/room-types
api/room-management/visible-rooms
api/room-management/room-information
api/room-management/rooms
api/room-management/attributes
api/departmet-management/departments
api/requisition-management/user-requisitions
api/requisition-management/agent-requisitions
api/requisition-management/all-requisitions
api/requisition-management/needs
api/requisition-management/requisition-information
````
#### POST Routes
````
api/auth/login
api/user-management/users
api/room-management/rooms
api/requisition-management/requisition
````
#### PUT Routes
````
api/user-management/users
api/room-management/rooms
api/requisition-management/requisition
api/requisition-management/promote
api/requisition-management/delete-requisition
````

### Author
[Luis Eduardo Mayida González](https://github.com/lalomayida)

### License
MIT
