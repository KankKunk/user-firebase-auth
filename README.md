# User Firebase Auth

This repository contains a Node.js application for Firebase Authentication using Express, Cookie-Parser, and Firebase Admin SDK.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have a Google Cloud Platform (GCP) account.
- You have created a Compute Engine instance.
- You have Node.js and npm installed on your instance.

## Setting Up the Environment

1. **Connect to your Compute Engine instance via SSH**.

2. **Install Node.js and npm**:
    ```sh
    sudo apt update
    sudo apt install nodejs npm -y
    ```

3. **Clone the repository**:
    ```sh
    git clone https://github.com/KankKunk/user-firebase-auth.git
    ```

4. **Navigate to the project directory**:
    ```sh
    cd user-firebase-auth
    ```

5. **Initialize the project**:
    ```sh
    npm init -y
    npm init
    ```

6. **Install necessary dependencies**:
    ```sh
    npm install express cookie-parser firebase firebase-admin dotenv
    ```

7. **Create a `.env` file**:
    ```sh
    nano .env
    ```

8. **Add Firebase configuration to `.env`**:
    ```
    PORT=5000
    FIREBASE_API_KEY=<your-api-key>
    FIREBASE_AUTH_DOMAIN=<your-auth-domain>
    FIREBASE_PROJECT_ID=<your-project-id>
    FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
    FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
    FIREBASE_APP_ID=<your-app-id>
    ```

9. **Navigate to the `src` directory**:
    ```sh
    cd src
    ```

10. **Create a `FirebaseService.json` file in the `config` directory**:
    ```sh
    cd config
    nano FirebaseService.json
    ```

11. **Add your Firebase service account credentials to `FirebaseService.json`**:
    ```json
    {
        "type": "service_account",
        "project_id": "<your-project-id>",
        "private_key_id": "<your-private-key-id>",
        "private_key": "-----BEGIN PRIVATE KEY-----\n<your-private-key>\n-----END PRIVATE KEY-----\n",
        "client_email": "<your-client-email>",
        "client_id": "<your-client-id>",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/<your-client-email>",
        "universe_domain": "googleapis.com"
    }
    ```

## Running the Application

1. **Start the application**:
    ```sh
    node src/app.js
    ```

2. You should see the output:
    ```
    Listening on port 5000
    ```

## Testing the API Endpoints

You can test the API endpoints using Postman. Refer to the [Postman Collection Guide](https://docs.google.com/document/d/1kvSbwL57XVjMX6Ije7vDp3Pix2sCaofgeJS37aJvVGA/edit?usp=sharing) for detailed instructions.

For a more comprehensive guide on Firebase Authentication with Node.js, visit this [Permify Blog Post](https://permify.co/post/firebase-authentication-nodejs/#testing-authentication-flow).

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Google Cloud Platform](https://cloud.google.com/)
- [Firebase](https://firebase.google.com/)
- [Permify Blog Post on Firebase Authentication](https://permify.co/post/firebase-authentication-nodejs/#testing-authentication-flow)
