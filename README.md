# NexusLink

NexusLink is an innovative platform designed to connect startups, established companies, and job seekers. It aims to streamline the recruitment process by providing tools for posting jobs, discovering talent, and managing applications. This project is powered by Ballerina, an open-source language developed by WSO2, for its robust backend services, and a modern frontend for a rich user experience.

## Project Structure

The project is organized into two main directories:

*   `frontend/`: Contains all the client-side code for the NexusLink web application.
*   `backend/`: Houses the Ballerina service that powers the API and interacts with the Firebase Realtime Database.

## Features

### Backend (Ballerina)

The Ballerina backend, running on port `9090`, is responsible for:
*   **Hybrid Data Serving:** Combining static "dummy" data (loaded from `dummy-data.json`) with live data fetched from the Firebase Realtime Database for endpoints like `/advertisements`, `/ideas`, and `/students`.
*   **Contact Management:**
    *   A dedicated `/api/contact` POST endpoint for submitting contact form messages, including input validation, unique ID generation, and timestamping.
    *   Robust error handling for Firebase operations, featuring a local file backup (`contact_messages_backup.json`) if saving to Firebase fails.
    *   A `/api/contact/{messageId}` PATCH endpoint to update the status or other fields of specific contact messages (e.g., for administrative use).
    *   A GET endpoint for `/api/contact` to retrieve all contact messages.
*   **CORS Support:** Configured to allow cross-origin requests from the frontend application running on `http://localhost:5173`.
*   **Firebase Integration:** Utilizes both a custom `lakpahana/firebase_realtime_database` module and direct HTTP client calls to the Firebase Realtime Database REST API for efficient data persistence.

### Frontend

The frontend provides the user interface for NexusLink, allowing:
*   Users (job seekers, companies, startups) to interact with the platform.
*   Display of advertisements, ideas, and student profiles.
*   A contact form to send messages to the platform administrators.
*   (Assumed) Interaction with the backend APIs to fetch and submit data.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Ballerina:** Download and install the Ballerina SDK (version compatible with WSO2's recommendations).
*   **Node.js & npm/yarn:** For the frontend development.
*   **Firebase Project:** An active Firebase project with a Realtime Database enabled.
*   **Firebase Configuration Files:**
    *   `firebaseConfig.json`: Your Firebase Web App configuration (for the frontend and potentially for `lakpahana/firebase_realtime_database` client initialization).
    *   `serviceAccount.json`: Your Firebase service account key file (downloaded from Firebase console, crucial for backend authentication).
*   A `dummy-data.json` file in the backend directory for initial data.

## Getting Started

Follow these steps to set up and run the NexusLink project.

### 1. Firebase Setup

1.  **Create a Firebase Project:** Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Enable Realtime Database:** In your Firebase project, navigate to "Build" > "Realtime Database" and create a new database.
3.  **Generate Service Account Key:**
    *   In your Firebase project, go to "Project settings" (gear icon) > "Service accounts".
    *   Click "Generate new private key" and then "Generate key". This will download a `serviceAccount.json` file.
4.  **Get Web App Config:**
    *   In "Project settings" > "General", scroll down to "Your apps".
    *   If you don't have a web app, add one. Copy the `firebaseConfig` object. Create a file named `firebaseConfig.json` in the `backend/` directory and paste this configuration inside it. Also, you'll need this information for your frontend `src/firebase.js`.

### 2. Backend Setup

1.  **Navigate to Backend Directory:**
    ```bash
    cd backend
    ```
2.  **Place Configuration Files:**
    *   Place the `serviceAccount.json` file you downloaded from Firebase into the `backend/` directory.
    *   Place the `firebaseConfig.json` file (containing your Firebase web app config) into the `backend/` directory.
3.  **Create Dummy Data:**
    *   Create a file named `dummy-data.json` in the `backend/` directory. This file should contain initial JSON data for `students`, `ideas`, and `advertisements` in a structure similar to:
        ```json
        {
            "students": {
                "student1_id": { "name": "John Doe", "field": "Software" },
                "student2_id": { "name": "Jane Smith", "field": "Marketing" }
            },
            "ideas": {
                "idea1_id": { "title": "AI Assistant", "description": "Automate tasks" }
            },
            "advertisements": {
                "ad1_id": { "company": "Tech Corp", "position": "Developer" }
            }
        }
        ```
4.  **Run Ballerina Service:**
    ```bash
    bal run
    ```
    The Ballerina service will start on `http://localhost:9090`. You should see log messages indicating successful Firebase client initialization and dummy data loading.

### 3. Frontend Setup

1.  **Navigate to Frontend Directory:**
    ```bash
    cd frontend
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    # or if you use yarn
    # yarn install
    ```
3.  **Create Firebase Initialization File:**
    *   Create a file `src/firebase.js` (or adjust the path based on your frontend's structure).
    *   Populate it with your Firebase web app configuration (from `firebaseConfig.json`) to initialize the Firebase SDK.
    *   Example `src/firebase.js`:
        ```javascript
        import { initializeApp } from "firebase/app";
        import { getFirestore } from "firebase/firestore"; // if using Firestore
        import { getAuth } from "firebase/auth"; // if using Auth
        import { getDatabase } from "firebase/database"; // if using Realtime Database directly from frontend

        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID",
          measurementId: "YOUR_MEASUREMENT_ID" // if you have it
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        export const db = getDatabase(app); // For Realtime Database
        // export const firestore = getFirestore(app); // For Firestore
        // export const auth = getAuth(app); // For Authentication
        ```
        **Note:** The provided backend code uses Realtime Database. Ensure your frontend configuration matches your usage.
4.  **Run Frontend Development Server:**
    ```bash
    npm start
    # or if you use yarn
    # yarn start
    ```
    The frontend application will typically open in your browser at `http://localhost:5173`.

## Usage

Once both the backend and frontend are running:

*   Navigate to `http://localhost:5173` in your web browser to access the NexusLink platform.
*   Explore the various sections like "Company", "Startup", and "Job Seeker".
*   Use the contact form to send messages, which will be processed by the Ballerina backend and stored in your Firebase Realtime Database.
*   (For developers/admins) You can make direct API calls to `http://localhost:9090/api/contact` (GET, PATCH) to manage contact messages.

## Authors

*   Kiruthiyan Theivendrarasa
*   Shampavi Premananthan
*   Pious Hephzibah Peries
*   Jannan Harichandran

## Acknowledgements

This project leverages the power and expressiveness of **Ballerina**, an open-source programming language for the cloud, organized by **WSO2**.
