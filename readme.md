
# Cine Student API Documentation

This document provides a comprehensive overview and documentation for the Cine Student API. This API is responsible for handling student-facing functionality, including authentication, testing, and feedback.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
  - [Student](#student)
- [Data Models](#data-models)
  - [Student](#student-model)
  - [Activity](#activity)
  - [Question](#question)
  - [Response](#response)
  - [Feedback](#feedback)
  - [Feedback Response](#feedback-response)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
   ```bash
   cd cine_student
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the server:**
   ```bash
   npm start
   ```

## Configuration

The application's configuration is located in the `config` directory. Key configuration files include:

- `db.config.ts`: Configures the database connection.
- `env.config.ts`: Manages environment variables.
- `cors.config.ts`: Configures Cross-Origin Resource Sharing (CORS).

## API Endpoints

### Student

- **POST /student/login**
  - **Description:** Authenticates a student.
  - **Request Body:**
    ```json
    {
      "studentNumber": "string",
      "password": "string"
    }
    ```
  - **Response:**
    - `200 OK`: Login successful.
    - `400 Bad Request`: Invalid credentials.
    - `500 Internal Server Error`: Server error.

- **POST /student/forgotPassword**
  - **Description:** Sends a password reset email to the student.
  - **Request Body:**
    ```json
    {
      "studentNumber": "string"
    }
    ```
  - **Response:**
    - `200 OK`: Password reset email sent.
    - `400 Bad Request`: Student not found.
    - `500 Internal Server Error`: Server error.

- **POST /student/resetPassword**
  - **Description:** Resets the student's password.
  - **Request Body:**
    ```json
    {
      "studentNumber": "string",
      "otp": "string",
      "password": "string"
    }
    ```
  - **Response:**
    - `200 OK`: Password reset successful.
    - `400 Bad Request`: Invalid OTP or student not found.
    - `500 Internal Server Error`: Server error.

- **GET /student/getQuestions**
  - **Description:** Retrieves all questions, grouped by subject.
  - **Response:**
    - `200 OK`: A map of subjects to lists of questions.
    - `500 Internal Server Error`: Server error.

- **POST /student/submit**
  - **Description:** Submits a student's test responses.
  - **Request Body:**
    ```json
    {
      "studentNumber": "string",
      "responses": [
        {
          "quesId": "string",
          "status": "number"
        }
      ]
    }
    ```
  - **Response:**
    - `200 OK`: Responses submitted successfully.
    - `400 Bad Request`: Invalid input or student not found.
    - `500 Internal Server Error`: Server error.

- **GET /student/leaderboard**
  - **Description:** Retrieves the leaderboard.
  - **Response:**
    - `200 OK`: A list of students with their scores and ranks.
    - `500 Internal Server Error`: Server error.

- **GET /student/getFeedbackQuestions**
  - **Description:** Retrieves all feedback questions.
  - **Response:**
    - `200 OK`: A list of feedback question objects.
    - `500 Internal Server Error`: Server error.

- **POST /student/submitFeedback**
  - **Description:** Submits a student's feedback.
  - **Request Body:**
    ```json
    {
      "studentNumber": "string",
      "responses": [
        {
          "question": "string",
          "answer": "string"
        }
      ]
    }
    ```
  - **Response:**
    - `200 OK`: Feedback submitted successfully.
    - `400 Bad Request`: Invalid input or student not found.
    - `500 Internal Server Error`: Server error.

## Data Models

### Student Model

- `name`: `string` (required)
- `studentNumber`: `string` (required, unique)
- `branch`: `string` (required)
- `gender`: `string` (required)
- `residency`: `string` (required)
- `email`: `string` (required, unique)
- `phone`: `string` (required)
- `isVerified`: `boolean` (default: `false`)
- `password`: `string` (required)

### Activity

- `studentNumber`: `string` (required)
- `otp`: `string`
- `createdAt`: `Date` (expires in 10 minutes)

### Question

- `subject`: `string` (required)
- `question`: `string` (required)
- `options`: `[string]` (required)
- `answer`: `number` (required)

### Response

- `userId`: `mongoose.Schema.Types.ObjectId` (ref: 'Student', required)
- `quesId`: `mongoose.Schema.Types.ObjectId` (ref: 'Question', required)
- `status`: `number` (required)

### Feedback

- `question`: `string` (required)

### Feedback Response

- `student`: `mongoose.Schema.Types.ObjectId` (ref: 'Student', required)
- `responses`: `[{ question: string, answer: string }]`
