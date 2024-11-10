# Hospital Management System (HMS)

A comprehensive Hospital Management System (HMS) designed to streamline administrative, medical, and patient interactions. This project leverages the MERN (MongoDB, Express, React, Node.js) stack to provide a robust solution with role-based functionality for **Admin**, **Doctor**, and **Patient** users.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authentication**: Role-based login and registration for patients; doctors registered by admin.
- **Admin Dashboard**: Manage doctors, patients, appointments, and system settings.
- **Doctor Dashboard**: Access appointments, view patient records, write prescriptions.
- **Patient Dashboard**: Book appointments, view records, access educational content.
- **Appointment Management**: Schedule, reschedule, and manage appointments.
- **Role-Based Access Control**: Authorization ensures only specific roles can access particular functionalities.

## Technologies Used

- **Frontend**: React, CSS Modules for styling, Axios for API requests.
- **Backend**: Node.js, Express, MongoDB.
- **Authentication**: JSON Web Tokens (JWT).
- **Database**: MongoDB for handling data storage.

## Project Structure

Here’s a breakdown of the project’s folder structure, explaining each module’s role in the system:

### Project Tree

```
HMS
├── backend
│   ├── config
│   │   └── db.js                     # MongoDB connection configuration
│   ├── controllers
│   │   ├── authController.js         # Authentication logic
│   │   ├── userController.js         # User CRUD operations
│   │   ├── doctorController.js       # Doctor-specific operations
│   │   ├── patientController.js      # Patient-specific operations
│   │   └── adminController.js        # Admin-exclusive operations
│   ├── middleware
│   │   ├── authMiddleware.js         # Authorization and role-based access control
│   │   └── errorMiddleware.js        # Error handling
│   ├── models
│   │   ├── UserModel.js              # Base user model
│   │   ├── DoctorModel.js            # Doctor-specific details
│   │   ├── PatientModel.js           # Patient-specific details
│   │   └── AppointmentModel.js       # Appointment schema
│   ├── routes
│   │   ├── authRoutes.js             # Routes for authentication
│   │   ├── userRoutes.js             # General user routes
│   │   ├── doctorRoutes.js           # Doctor-specific routes
│   │   ├── patientRoutes.js          # Patient-specific routes
│   │   └── adminRoutes.js            # Admin-specific routes
│   ├── utils
│   │   └── generateToken.js          # JWT token generator
│   └── server.js                     # Entry point for backend server
├── frontend
│   ├── public                        # Public assets
│   └── src
│       ├── components
│       │   ├── Authentication
│       │   │   ├── Login.js          # Login component
│       │   │   ├── Register.js       # Registration component
│       │   │   └── LoginOptions.js   # Login options for selecting user type
│       │   ├── Admin                 # Admin-specific components
│       │   │   ├── AdminDashboard.js # Admin's main dashboard
│       │   ├── Doctor                # Doctor-specific components
│       │   │   ├── DoctorDashboard.js# Doctor's main dashboard
│       │   ├── Patient               # Patient-specific components
│       │   │   ├── PatientDashboard.js# Patient's main dashboard
│       ├── App.js                    # Main app entry point
│       └── index.js                  # ReactDOM render
├── .env                              # Environment variables
├── README.md                         # Project documentation
└── package.json                      # Dependencies and scripts
```

### Folder Explanation

#### `/backend`

- **config**: Contains the database configuration file for connecting to MongoDB.
- **controllers**: Handles logic for each route; includes controllers for user roles and actions.
- **middleware**: Contains middlewares for authentication, authorization, and error handling.
- **models**: Mongoose schemas for data modeling.
- **routes**: Defines all the backend routes categorized by role and functionality.
- **utils**: Utility functions, such as generating JWT tokens for authenticated sessions.

#### `/frontend`

- **components/Authentication**: Handles the login and registration functionalities.
- **components/Admin**: Contains components accessible only to the admin role.
- **components/Doctor**: Contains components accessible only to doctors.
- **components/Patient**: Contains components accessible only to patients.

## Installation

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/), and [MongoDB](https://www.mongodb.com/) installed on your machine.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/HMS.git
   cd HMS
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the root of the backend folder:
     ```plaintext
     MONGO_URI=<Your MongoDB connection string>
     JWT_SECRET=<Your JWT Secret Key>
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

## Usage

1. **Admin**:
   - Login via `LoginOptions.js`.
   - Access the **Admin Dashboard** for managing doctors, patients, and system settings.

2. **Doctor**:
   - Login to access the **Doctor Dashboard**, where they can view appointments, interact with patients, and manage prescriptions.

3. **Patient**:
   - Register via the **Registration** form, login, and access the **Patient Dashboard** to book appointments, view records, and more.

## API Routes

This project includes multiple API routes categorized by role. Here are some primary routes:

- **Auth Routes**:
  - `POST /api/auth/login`: Login for all users.
  - `POST /api/auth/register`: Register a new user (patients only, doctors managed by admin).

- **User Routes**:
  - `GET /api/user/profile`: Get the logged-in user's profile.
  - `PUT /api/user/profile`: Update profile information.

- **Admin Routes**:
  - `GET /api/admin/doctors`: View and manage doctors.
  - `GET /api/admin/patients`: View and manage patients.

- **Doctor Routes**:
  - `GET /api/doctor/patients`: View assigned patients.
  - `POST /api/doctor/prescriptions`: Create and manage prescriptions.

- **Patient Routes**:
  - `POST /api/patient/appointments`: Book new appointments.
  - `GET /api/patient/appointments`: View personal appointments.

## Contributing

Contributions are welcome! Please fork the repository, create a branch, and submit a pull request.

## License

This project is licensed under the Apache 2.0 License. See the `LICENSE` file for details.
