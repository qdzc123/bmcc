# Lab 25: CI/CD Pipeline Setup

This is a simple HTTPS Node.js project for Lab 25.

## Setup Steps

1. Clone this repo and run:
    ```
    npm install
    ```

2. Generate self-signed certs:
    ```
    openssl req -nodes -new -x509 -keyout server.key -out server.cert
    ```

3. Run the server:
    ```
    node app.js
    ```

4. Push changes to GitHub.

5. Configure GitHub Webhook:
   - URL: https://tribefires.com:5443/webhook/
   - Content-Type: application/json
   - Secret: [provided by instructor]

6. Visit: https://tribefires.com:[your-port]

## Feature Example

Change the `res.end()` content to test CI/CD deployment.
