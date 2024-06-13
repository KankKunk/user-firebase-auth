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
        "project_id": "healthy-eats-project",
        "private_key_id": "9eb665e47fee2cd1fa38763a410b560a321a7df3",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1V804bQAAtyHX\nDaL+DqENnr9ZmgjV31zhgWuufrseedpaKHMsXzB68B7qMqrTqaWV51Qw1H+F5kA8\nxJWmX41dGDwag3G92NyrzyVlFMFYv/W9KjHh4PlHbLos2mz2os78gqOMH+ZiYXqR\n5ql84F5Hyqiah2Aelxla5r2SZd+77a5FzrEBSS+gBmN73NiaLbLi7uWatVZk/Oub\n7V9oCweykYq0FVw5+Hi+IWQHEBtpyQ/LpHgGHMBAs6/8f/J75kcih0f7kKLa6wPk\nfloAEmFtTXsZbf8xaBcwowmVM2BpjtmFhOJkB5zoorxxGdsfdp30BU/95mjTfMHt\nPllU4UzJAgMBAAECggEAF6WlazA7idxXm1V55as+sSn8RdDiShFgaT+ZLR31hJnb\nMVqI+kZHaiCZx2xn/kXnA88wmVV8c5d81O/Fm/Zl1rfsToDJejonPHg8phu4wrv1\nbX9tFclieD/jXyn0f4zndOIMNZ+LSVTwyMnNXC1d3fq9VblFfXeypLnmCosiS70Q\nf/TdeQ18sxECkkqfMWPP3vckuCxY+6WPgXgtlpIf4GlO4M5fyBpvmCio3jHvBOxB\nZUWd5FP6+5jlzgi4qKj+Rn9POgP70MEItBzOm0a+TU0pSg89LnCifU8sUhazLE0B\n5w1TvJDxSMVeeDpgaEFdPj4/mv7e+m0wrpsOdWhxCQKBgQDdXFGTDFQFOx6h/VGo\nPId6BuJda4Ps+AX3EJn8wi/W16vIP/39P4+EpFIfUX4HnC0AbMeMcWXOKg1+NVlI\nI3WvQ03gM9VacTdzlP/0EtzlL/WZpWbSa7Kq0vX/yUQGDEqSB7z7Uxv504Xm7qC7\nLkNX8vrSn1nrBByRK+ADSwZVOwKBgQDRuGF0h+QJ2IrYOLYpHcEGRXZI0aPOrO7z\n2relERsK6lGuQpE2Z3EM8jNosLGdNqfLBrQV/+Y8c2UmIJUe5BpaayEHpKW4Tf8/\nZW+UHZOeRIx3A70lxbbVVPBjr3JXOA55GI3ik3JC/mMDO99fuoIhplnRBx/QRMvg\nmbcXqDu1ywKBgEbvE3DkrXPzqvBL5cPcialP1XAMSP1ByV+PoVi+vWfCOtjzsKdb\nm9jscyh4C8PShxUwxo05tV7oWOSNoeuc+VRNZAIpef/+cb+HCrIi7UhAIxq2Rwm8\n20ckTRJHY5XwkGDVO/jpe/iFkM4cv8Lbo1bmlPuzdrP54FGg1qsXepMLAoGAOE+W\ns1BtlYs0NLx9hOq9Um7CROktX6glfQqkNskyBqtGBVFQZlg+DajWzuxqtHjhcu04\n25Nbga3GYgdrouDChravJrs52BPxTldxL0cFxQBI6wfw+LxuzDdDWLDaNbsSf8dt\nCYJnsr9VXJ/t6WlN2bUt9qdADo76YzNC6zI73iMCgYEAqhne6QfYvXZ08gWro6CY\nrLAeKneRCWoWOHl2GMLvTqWzkK46OJLnfWv8j/De25cniThWVSPhmNWo0kSmR3oa\n9INqHlmmvHge6pZ6h501GFouNx2EBvZYDoRnvm2IVcNZ2MmXcrllhO3Zlb3vwLEY\nuI6f4CkOH7WVzd/PUY08cs0=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-nrnlt@healthy-eats-project.iam.gserviceaccount.com",
        "client_id": "105233877761043526661",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nrnlt%40healthy-eats-project.iam.gserviceaccount.com",
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
