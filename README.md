
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
This application has been split into two parts, with a frontend and backend contained
in the 'frontend' and 'backend' directories respectively.
The frontend has been implemented with React using the Chakra UI framework,
and the backend has been written in nodeJS with expressJS.

(Docker deployment instructions incoming)


Local Development Notes
-----------------------
(not part of submission)

To debug the frontend, run:
- `cd frontend`
- `npm install`
- `npm run dev`
- open a browser window to http://127.0.0.1:5173/
