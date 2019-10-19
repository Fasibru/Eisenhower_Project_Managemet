Caveat: This repo is a fully working web app but since it is also a tool for me to learn and try out different technologies you should not be surprised to see inconsistencies like mainly using ES6 but sometimes also ES5, or using react class components but trying react hooks as well and so on.


# JATLA Project Management

Basic project management tool with user accounts and task management loosely based on the [Eisenhower Matrix](https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method).

## Technologies
This web app is based on the MERN stack and by now written in TypeScript. The main dependencies used are:

* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/) + [Redux](https://redux.js.org/)
* [Node](https://nodejs.org/en/)
* [Axios](https://github.com/axios/axios)
* [Bcrypt](https://www.npmjs.com/package/bcryptjs)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [JSONWebToken](https://jwt.io/)
* [Passport](http://www.passportjs.org/)
* [Typescript](https://www.typescriptlang.org/)

Naturally there are further dependencies like [webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/).

## Prerequisites
To make the app work there are a few things you have to do first and which are outlined below. Once you are settled you can access the app in the browser with <https://localhost:3000> if you have started it with the development script (see respective section).  
The production build cannot be used locally since it's an HTTP server but the app relies on cookies with the secure flag set to true. The concept here is that I have deployed the production build on Heroku which serves the app via HTTPS so the cookies are set correctly.

### NodeJS
You need an installation of [Node](https://nodejs.org/en/). I have used the 10.16.0 LTS version for the development.

### MongoDB
Initially the app used a connection to a local MongoDB server. If you want to do that as well you need to have MongoDB installed. You can find instructions on how to do that here: [Install MongoDB](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials). After the installation make sure to start the server with the

    mongod

command in the terminal.

By now I'm using the cloud based solution [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) where you have 512MB free storage. To make the app work with that as well you just have to set the respective connection string (which you get from the mongodb homepage) in the .env file (as described below).

### HTTPS
During development stage (see the Scripts section on how to start that) the app is running the backend on an HTTPS Express server and the frontend on an HTTPS webpack DevServer.  
I have used a self-signed SSL certificate but that is **not** part of the repo so you have to create that on your own and put the cert.key and cert.pem files in the /security folder.

The production build does not need the SSL certificate since it's a basic Express HTTP server running both the frontend and the backend. If the deployment of the app will require HTTPS then it's quite straight forward to change that.

A - in my opinion very clear - step-by-step instruction on how to create the SSL certificate and how to add it to Chrome can be found here: <https://stackoverflow.com/questions/21397809/create-a-trusted-self-signed-ssl-cert-for-localhost-for-use-with-express-node>

### .env
The URL for the MongoDB as well as the secret (e.g. for JWT) are stored in an .env file which is **not** part of this repo so you have to create this file in the root directory and it should have the following keys in it (the values are just examples e.g. for DB_URL it's an example with a local DB server but of course you can also use a cloud connection string):
    
    DB_URL = 'mongod://localhost:27017/your_DB_name'
    SECRET = 'your_secret_string'

## Scripts
First run

    npm install

to get all the necessary dependencies installed.

To start the development servers run
   
    npm run dev

or run 

    npm start

to create the production build and start the respective server.

You can use

    npm test

to start the tests based on [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/) but as outlined below the tests are outdated.

## Testing
I have written a few test in the past but since this project is a way for me to learn different technologies I was more interested in the concepts rather than following a TDD approach but I definitely plan to update those tests and increase the coverage in the future.
