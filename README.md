
DANIEL-GUENTHER-IS24-full-stack-competition-req97073
====================================================

This is a submission for the [IS-24 Full Stack Developer Position](https://github.com/bcgov/citz-imb-full-stack-code-challenge-req97073) code challenge.
The requirement, as specified on that page is to submit:
* GitHub Repository
* Modern Backend API Framework 
    * **BONUS** Swagger Documentation
* Modern Frontend Web Application Framework
    * 3 user stories providing basic functionality
    * **BONUS** 2 user stories providing a search for product resource names
* Basic Documentation on how to effortlessly run your solution components on a local development machine
    * This includes basic npm or docker commands required to have your solution stood up on **any** workstation

Deployment notes
-----------------
I have provided a docker-compose.yml file for your convenience, if you have it installed
the app should be ready to go with `docker-compose up`.

Otherwise just run:
- `docker build -t product-manager .`
- `docker run -p 3000:3000 product-manager`

and the web api documentation available at http://localhost:3000/api/api-docs

Other Notes
-----------
This application has been split into two parts, with a frontend and backend contained
in the 'frontend' and 'backend' directories respectively.
The frontend has been implemented with React using the Chakra UI framework,
and the backend has been written in nodeJS with expressJS.

if you want to try debugging it, run it locally with:
- `cd frontend`
- `npm install`
- `npm run dev`
- open a browser window to http://127.0.0.1:5173/

Similar to the backend:
- `cd backend`
- `npm install`
- `npm start`
- and run requests to https://127.0.0.1:3000/
- (in postman or what have you)
