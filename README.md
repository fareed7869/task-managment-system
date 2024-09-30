## task-managment-system
This is a full-stack Task Management System.
## Features
- **Task Management**: Create, update, delete, and view tasks.
- **User Authentication**: Signup, login, and logout with JWT-based authentication.
- **Role-based Authorization**: Admin and user roles with different permissions.
- **Search**: Search tasks by title.
- **Sort**: Sort tasks by status.
- **Pagination**: Efficient pagination for task listings.

## Technologies Used
- **Backend:**
  - Node.js
  - Express.js
  - PostgreSQL
  - Sequelize ORM
  - JWT for authentication
  - Joi for validation
- **Frontend:**
  - React
  - Vite for fast development and build
  - Redux Toolkit for state management
  - Formik for form handling
  - Yup for form validation
  - Tailwind CSS for styling

## Prerequisites
Before running the application, make sure you have the following tools installed:

- **Node.js** (v16 or later)
- **npm** (v8 or later)
- **PostgreSQL** (v15 or later)
- **PgAdmin4**
  
## How to Set Up and Run the Application
1. **Clone the Repository**:
   git clone https://github.com/fareed7869/task-managment-system.git
   
3. **Backend Setting**:
   - cd Backend
   - npm i (install dependencies)
   - create .env file in root directory of Backend
   - start: npm run dev
   - **.env** {
     <br>PORT=3000
     <br>DB_NAME= ***  
     DB_USER= ***
     <br>DB_PASSWORD= ***
     <br>DB_HOST=localhost 
     <br>DB_PORT=5432 
     <br>NODE_ENV=development 
     <br>JWT_SECRET= *** 
     <br>JWT_REFRESH_SECRET= *** }
   
5. **Frontend Setting**:
   - cd Frontend
   - npm i (install dependencies)
   - start: npm run dev


   



