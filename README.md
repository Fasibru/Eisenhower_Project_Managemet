# JATLA Project Management
Looking at the title you might think 'Probably that's just another todo list app.' and to be honest as of now there are not a lot of arguments I can bring to the table to proof you wrong.  
Nevertheless maybe you will change your mind sometime in the future once I have all my ideas implemented because as the title suggests this repo is about project management not only todo task handling.  As of July 2019 you can add/edit/remove tasks, assign a priority, change the status to completed and filter on that as well as on the date the tasks where created. A search function will be the next filter to be implemented.  
Where I see this to be evolving to a real project management tool is once the following capabilities are implemented:

* User accounts (currently in development)
* User roles like team/project lead or member
* Different permissions for different user roles
* Assign multiple users to a task and only those can see the task in the app (and probably the team lead as well)
* Notification system for users if there are updates to an assigned task
* Timeline indications for tasks including progress milestones and reminders
* Archive/History for task updates
* Further filters specific to user role e.g. team lead can filter for tasks of a certain team member etc.

There will probably be more functionalities coming to my mind during the development phase but what's listed above is what I categorize as the necessary core functionalities.


One more word on setting the priorities of tasks: In the app you can assign categories A-D to a task and this approach is somewhat based on the Eisenhower Matrix. This time management technique should help you focusing on the important tasks although I think that tasks in the last category D are not necessarily to be dropped. You can read a short description on [Wikipedia](https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method).

## Technologies
This web app is based on the MERN stack. The main dependencies used are:

* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/) + [Redux](https://redux.js.org/)
* [Node](https://nodejs.org/en/)
* [Axios](https://github.com/axios/axios)
* [Bcrypt](https://www.npmjs.com/package/bcryptjs)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [JSONWebToken](https://jwt.io/)
* [Passport](http://www.passportjs.org/)

Naturally there are further dev dependencies like [webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/).

So far the app was developed for Chrome but should run on other browsers as well although CSS prefixing isn't included yet.

## Prerequisites
To make the app work there are a few things you have to do first and which are outlined below. Once you are settled and have started the app you can access it in the browser with <https://localhost:3000> (development) or <http://localhost:8080> (production).

### NodeJS
You need an installation of [Node](https://nodejs.org/en/). I have used the 10.16.0 LTS version for the development.

### MongoDB
Currently the app uses a connection to a local MongoDB server so you need to have MongoDB installed. You can find instructions on how to do that here: [Install MongoDB](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials). After the installation make sure to start the server with the

    mongod

command in the terminal.

### HTTPS
During development stage (see the Scripts section on how to start that) the app is running the backend on an https Express server and the frontend on an https webpack DevServer.  
I have used a self-signed SSL certificate but that is **not** part of the repo so you have to create that on your own and put the cert.key and cert.pem files in the /security folder.

The production build does not need the SSL certificate since it's a basic Express http server running both the frontend and the backend.

### .env
The URL for the MongoDB as well as the secret (e.g. for JWT) are stored in an .env file which is **not** part of this repo so you have to create this file in the root directory and it should have the following keys in it (the values are just examples):
    
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
