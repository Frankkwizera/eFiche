# eFiche Take Home Test - Backend Application

This is a backend application built with Node.js and Express, designed to manage user authentication and patient data. It uses PostgreSQL as the database and Sequelize as the ORM.

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

## Installation

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

   Create a `.env` file or copy .env.example in the root directory and add the following:

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

## Running the Application

Start the server:
```bash
npm start
```

The server will run on the port specified in your `.env` file or default to `5000`.

## API Endpoints

### Public Routes

- `GET /ping`: Check server status.

### Authentication Routes

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login and receive a JWT token.

### Patient Routes

- `GET /patients/:id/medical-history`: Get a patient's medical history.

### Practitioner Routes

- `GET /patients/`: Get all patients.
- `POST /patients/:id/allergies`: Add an allergy for a patient.
- `POST /patients/:id/lab-orders`: Add a lab order for a patient.
- `POST /patients/:id/lab-results`: Add a lab result for a patient.
- `POST /patients/:id/prescriptions`: Add a prescription for a patient.

## Middleware

- `roleMiddleware.js`: Verifies practitioner/patient roles for certain routes.

## Models

- User
- Patient
- Allergy
- LabOrder
- LabResult
- Prescription
