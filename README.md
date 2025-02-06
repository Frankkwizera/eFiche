# eFiche Take Home Test - Full Stack Application

This is a full stack application built with Node.js, Express, and React, designed to manage user authentication and patient data. It uses PostgreSQL as the database and Sequelize as the ORM.

## Features

- User Registration and Login
- JWT-based Authentication
- Role-based Access Control
- Patient Management
- Medical History Management
- Lab Orders and Results Management
- Prescription Management

## Prerequisites

- Node.js (v18.17.1 or later)
- PostgreSQL
- npm

## Installation - Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/Frankkwizera/eFiche
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file or copy `.env.example` in the root directory and add the following:

   ```plaintext
   DB_NAME=<your-database-name>
   DB_USER=<your-database-username>
   DB_PASS=<your-database-password>
   DB_HOST=<your-database-host>
   JWT_SECRET=<your-jwt-secret>
   PORT=<your-port-number>
   ```

4. Sync the database:

   ```bash
   node syncDatabase.js
   ```

## Installation - Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/Frankkwizera/eFiche
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running Tests both Backend and Frontend

To run the tests for this application, use the following command:

```bash
npm test
```

## Running the Application without Docker

### Backend

Start the server:
```bash
npm start
```

The server will run on the port specified in your `.env` file or default to `5001`.

### Frontend

Start the server:
```bash
npm run dev
```

## Running the Application with Docker

To run the application using Docker Compose, follow these steps:

1. Ensure you have Docker and Docker Compose installed on your machine.

2. Build the Docker images:

   ```bash
   docker-compose build
   ```

3. Start the Docker containers:

   ```bash
   docker-compose up -d
   ```

   This command will start the application in detached mode. Ensure your `.env` file is correctly configured with your environment variables.

4. Verify the application is running by accessing `http://localhost:5001/ping` in your browser or using a tool like `curl` or Postman.


## API Endpoints

### Public Routes

- `GET /ping`: Check server status.
  - **Example Success Output:**
    ```json
    {
      "message": "pong"
    }
    ```

### Authentication Routes

- `POST /auth/register`: Register a new user.
  - **Example Payload:**
    ```json
    {
      "username": "john_doe",
      "password": "securePassword123",
      "role": "patient",
      "fullName": "John Doe",
      "age": 30,
      "gender": "Male",
      "contactInfo": "john.doe@example.com"
    }
    ```
  - **Example Success Output:**
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": 1,
        "username": "john_doe",
        "role": "patient",
        "createdAt": "2023-10-01T12:00:00Z",
        "updatedAt": "2023-10-01T12:00:00Z"
      }
    }
    ```

- `POST /auth/login`: Login and receive a JWT token.
  - **Example Payload:**
    ```json
    {
      "username": "john_doe",
      "password": "securePassword123"
    }
    ```
  - **Example Success Output:**
    ```json
    {
      "token": "your.jwt.token.here"
    }
    ```

### Patient Routes

- `GET /patients/:id/medical-history`: Get a patient's medical history.
  - **Example Success Output:**
    ```json
    {
      "allergies": [],
      "labOrders": [],
      "labResults": [],
      "prescriptions": []
    }
    ```

### Practitioner Routes

- `GET /patients/`: Get all patients.
  - **Example Success Output:**
    ```json
    [
      {
        "id": 1,
        "fullName": "John Doe",
        "age": 30,
        "gender": "Male",
        "contactInfo": "john.doe@example.com",
        "createdAt": "2023-10-01T12:00:00Z",
        "updatedAt": "2023-10-01T12:00:00Z"
      }
    ]
    ```

- `GET /patients/search`: Search for patients by name or ID.
  - **Example Request Parameters:**
    ```
    name=John
    ```
  - **Example Success Output:**
    ```json
    [
      {
        "id": 1,
        "fullName": "John Doe",
        "age": 30,
        "gender": "Male",
        "contactInfo": "john.doe@example.com",
        "createdAt": "2023-10-01T12:00:00Z",
        "updatedAt": "2023-10-01T12:00:00Z"
      }
    ]
    ```

- `POST /patients/:id/allergies`: Add an allergy for a patient.
  - **Example Payload:**
    ```json
    {
      "allergy": "Peanuts",
      "severity": "Severe"
    }
    ```
  - **Example Success Output:**
    ```json
    {
      "id": 1,
      "patientId": 1,
      "allergy": "Peanuts",
      "severity": "Severe",
      "createdAt": "2023-10-01T12:00:00Z",
      "updatedAt": "2023-10-01T12:00:00Z"
    }
    ```

- `POST /patients/:id/lab-orders`: Add a lab order for a patient.
  - **Example Payload:**
    ```json
    {
      "testName": "Blood Test"
    }
    ```
  - **Example Success Output:**
    ```json
    {
      "id": 1,
      "patientId": 1,
      "testName": "Blood Test",
      "status": "Pending",
      "createdAt": "2023-10-01T12:00:00Z",
      "updatedAt": "2023-10-01T12:00:00Z"
    }
    ```

- `POST /patients/:id/lab-results`: Add a lab result for a patient.
  - **Example Payload:**
    ```json
    {
      "testName": "Blood Test",
      "result": "Normal"
    }
    ```
  - **Example Success Output:**
    ```json
    {
      "id": 1,
      "patientId": 1,
      "testName": "Blood Test",
      "result": "Normal",
      "createdAt": "2023-10-01T12:00:00Z",
      "updatedAt": "2023-10-01T12:00:00Z"
    }
    ```

- `POST /patients/:id/prescriptions`: Add a prescription for a patient.
  - **Example Payload:**
    ```json
    {
      "medication": "Ibuprofen",
      "dosage": "200mg",
      "instructions": "Take one tablet every 8 hours"
    }
    ```
  - **Example Success Output:**
    ```json
    {
      "id": 1,
      "patientId": 1,
      "medication": "Ibuprofen",
      "dosage": "200mg",
      "instructions": "Take one tablet every 8 hours",
      "createdAt": "2023-10-01T12:00:00Z",
      "updatedAt": "2023-10-01T12:00:00Z"
    }
    ```

## Middleware

- `roleMiddleware.js`: Verifies practitioner/patient roles for certain routes.

## Models

- User
- Patient
- Allergy
- LabOrder
- LabResult
- Prescription
