# Exam Administration Application

An application for managing and conducting exams for students with role-based functionalities for Admin and Student.

## Features

### Backend
- User Authentication and Authorization (JWT-based).
- Admin:
  - Manage students.
  - Create exams with MCQ questions.
- Student:
  - Take exams and submit answers.
  - View results with pass/fail remarks.
- REST API structure with proper HTTP methods.
- Security measures for authentication and data validation.

### Frontend
- Login and Register functionality for Admin and Student.
- Admin:
  - Add new exams with dynamic MCQs.
  - Manage students.
- Student:
  - View available exams and attempt them.
  - View results post-exam.

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT)

### Frontend
- React.js
- Chakra UI for responsive design
- Redux Toolkit for state management

## Installation

### Backend
1. Navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
