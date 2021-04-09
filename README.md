# Cycloud Frontend App

This is the front-end React application for Cycloud. It displays the main user interface and map component to the user. Try it out in your browser at https://cycloud.link.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Deployment Options

In the project directory, you can run via npm or Docker:

### NPM (Preffered)

If you do not have Docker installed or have some issues with running with Docker (it might have a lot of cache and optimization that causes errors):

1. Clone this repository and the parent directory.
2. Run the command `amplify init` in the command line.
3. Run the command `npm start` in the command line
4. Visit the frontend application in `localhost:3000`

### Docker

If you have Docker installed on your machine you can run the application using Docker:
Clone this repository and go to the parent directory.

1. Run the command `amplify init` in the command line.
2. Run the command `docker-compose up` in the command line.
3. Visit the frontend application in `localhost:3000`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### IMPORTANT

Although this method works, you might not be able to enjoy the full features of Cycloud because the localhost frontend might have CORS issue when calling the backend.
