# Express TypeScript API with Google reCAPTCHA

This project is a REST API built using **TypeScript** and **Express.js**. It includes authentication with **Google reCAPTCHA** integration, along with several other routes for handling responses, preferences, questions, feedback, and activity tracking.

## Features

- **User Authentication** with Google reCAPTCHA validation.
- **Response Handling** for user answers to questions.
- **Preferences Management** for user programming language preferences.
- **Caching** of questions using `node-cache` to enhance performance.
- **Activity Tracking** for user login and test-taking time.
- **Feedback** system with questions and submission.

## Technologies

- **TypeScript**
- **Express.js**
- **MongoDB** with **Mongoose**
- **Google reCAPTCHA**
- **Node Cache**

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file with the following values:

    ```
    RECAPTCHA_SECRET_KEY=your-secret-key
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

## Routes

### Authentication Routes

1. **Login** (`POST /login`)
    - Request Body:
        ```json
        {
            "studentNumber": "string",
            "password": "string",
            "token": "string"  // Google reCAPTCHA token
        }
        ```
    - Response:
        - `200 OK`: Login successful
        - `400 Bad Request`: Invalid credentials or CAPTCHA failure
        - `500 Internal Server Error`: Server issues
    
    - **Note**: Google reCAPTCHA validation is used in this route to verify user authenticity.

### Test and Response Routes

2. **Submit Response** (`POST /response`)
    - Request Body:
        ```json
        {
            "userId": "string",
            "quesId": "string",
            "status": "string",
            "ansId": "string"
        }
        ```
    - Response:
        - `200 OK`: Response recorded or updated
        - `500 Internal Server Error`: Server issues

3. **Set Preferences** (`POST /preferences`)
    - Request Body:
        ```json
        {
            "userId": "string",
            "preference": "number"  // 3: C, 4: C++, 5: Python, 6: Java
        }
        ```
    - Response:
        - `200 OK`: Preference set successfully
        - `400 Bad Request`: Preference already set
        - `500 Internal Server Error`: Server issues

4. **Get Questions** (`GET /questions`)
    - Query Parameters:
        - `subject`: Subject of the questions (required)
        - `userId`: User ID
    - Response:
        - `200 OK`: List of questions
        - `400 Bad Request`: Subject not provided
        - `500 Internal Server Error`: Server issues

5. **Get Responses** (`GET /getResponses`)
    - Query Parameters:
        - `userId`: User ID (required)
    - Response:
        - `200 OK`: User's responses
        - `500 Internal Server Error`: Server issues

6. **Get User Preferences** (`GET /getPreference`)
    - Query Parameters:
        - `userId`: User ID (required)
    - Response:
        - `200 OK`: User preference (C, C++, Python, Java)
        - `400 Bad Request`: Invalid preference number
        - `500 Internal Server Error`: Server issues

7. **Get Remaining Time** (`GET /timeRemaining`)
    - Query Parameters:
        - `userId`: User ID (required)
    - Response:
        - `200 OK`: Remaining time for the user
        - `500 Internal Server Error`: Server issues

### Feedback Routes

8. **Get Feedback Questions** (`GET /feedbackQuestions`)
    - Response:
        - `200 OK`: Feedback questions list
        - `500 Internal Server Error`: Server issues

9. **Submit Feedback** (`POST /submitFeedback`)
    - Request Body:
        ```json
        {
            "userId": "string",
            "feedback": "string"
        }
        ```
    - Response:
        - `200 OK`: Feedback submitted
        - `500 Internal Server Error`: Server issues

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
