# Serverless Notes App

The Serverless Notes App is a web application that allows users to create, manage, and share their personal notes securely. The app is built using a serverless architecture, leveraging AWS Lambda and DynamoDB for the backend, and React with Redux for the frontend.


## Features

- User Authentication: Users can sign up, log in, and log out securely using OAuth with Google Sign-In.
- Create/Update/Delete Notes: Users can create, update, and delete their own notes after logging in.
- View Notes: Users can view a list of all their notes on the dashboard.
- Note Details: Users can view the details of a specific note on a separate page.
- Share Notes: Users can generate a shareable link to their notes and share them with others.
- Responsive Design: The app is designed to be responsive and accessible on various devices.

  

## Tech Stack

- Frontend: React, Redux, Axios
- Backend: AWS Lambda (Node.js), API Gateway, Cognito (OAuth), DynamoDB
- Deployment: AWS Serverless Application Model (SAM)
- Authentication: OAuth with Google Sign-In using AWS Cognito Identity Pool

  

## DynamoDB Modeling

The data is modeled in DynamoDB with the following schema:

- Table Name: `notes`
- Primary Key: Composite key with `userId` (partition key) and `noteId` (sort key).
- Attributes: 
  - `userId`: The ID of the user who created the note.
  - `noteId`: The unique ID of the note.
  - `title`: The title of the note.
  - `description`: The content of the note.
  - `date`: The date the note was created or last updated.
  - `time`: The time the note was created or last updated.
  - `category`: The category of the note.



## Installation

1. Install dependencies: `npm install`
2. Set up AWS CLI with the necessary credentials for your AWS account.
3. Deploy the backend using AWS SAM: `sam deploy --guided`
4. Update the frontend configuration: Open `src/config.js` and update the `API_ENDPOINT` value with the API Gateway URL obtained from the deployment step.
5. Start the development server: `npm start`
6. Open your browser and navigate to `http://localhost:3000` to access the app.

   

## Deployment

To deploy the app to a production environment, follow these steps:

1. Build the frontend: Run npm run build to create the production-ready frontend.
2. Deploy frontend: Host the frontend on a static hosting service like AWS S3, Netlify, or Vercel.
3. Deploy backend: Install Serverless Framework (npm install -g serverless), then run serverless deploy to deploy the backend to AWS.
4. Set environment variables: Configure API endpoints and necessary values for both frontend and backend.
5. Set permissions: Ensure proper IAM roles and security settings for AWS resources.
6. Test: Verify all features in the deployed app, and address any issues that arise.
7. Monitor and maintain: Regularly monitor app performance, apply updates, and address security concerns.

   

### Backend (AWS Lambda and DynamoDB)

1. Set up and configure AWS credentials on your machine.
2. Deploy the Serverless backend using the `serverless deploy` command.

   

### Frontend (React and Redux)

1. Navigate to the `frontend` directory.
2. Update the API endpoint in `src/config.js` to match your deployed backend API Gateway URL.
3. Run the frontend application using `npm start`.

