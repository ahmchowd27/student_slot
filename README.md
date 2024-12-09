Student Demo Registration
This project is a web application designed to allow students to register for project demonstration time slots. The application is built with a Node.js and Express backend and a React frontend. It features a user-friendly interface for registering students, managing time slots, and viewing the list of registered students.

Features
Student Registration:

Students can register by providing their details, including:
Student ID (8 digits)
Name
Project Title
Email Address
Phone Number (formatted as 999-999-9999)
Students are assigned to an available time slot.
Time Slot Management:

Six time slots are available.
Each time slot can accommodate up to six students.
Fully booked slots are automatically blocked.
Student Management:

View all registered students.
Delete a student, freeing up their time slot.
Validation:

Inputs are validated on both the client and server side.
Technologies Used
Backend
Node.js with Express.js
MongoDB with Mongoose
Cors for cross-origin requests
Body-Parser for parsing incoming JSON requests
Frontend
React.js
Axios for API calls
Setup Instructions
Prerequisites
Node.js and npm installed.
MongoDB database (e.g., MongoDB Atlas or local installation).
Backend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/your-repository-name.git
Navigate to the backend folder:

bash
Copy code
cd /path/to/project
Install dependencies:

bash
Copy code
npm install
Initialize the database:

Start your MongoDB instance.
Use the POST /api/init-timeslots endpoint to initialize time slots.
Start the backend server:

bash
Copy code
node server.js
The backend will run on http://localhost:5000.

Frontend Setup
Navigate to the frontend folder:

bash
Copy code
cd /path/to/project
Install dependencies:

bash
Copy code
npm install
Start the frontend development server:

bash
Copy code
npm start
The frontend will run on http://localhost:3000.

API Endpoints
Time Slots
GET /api/timeslots: Retrieve all time slots.
POST /api/init-timeslots: Initialize time slots.
Students
POST /api/register: Register or update a student.
GET /api/students: Retrieve all registered students.
DELETE /api/students/:studentId: Remove a student.
How to Use
Registration Page
Open the application at http://localhost:3000.
Fill out the student registration form.
Select an available time slot.
Submit the form.
Manage Students
Navigate to http://localhost:3000/students.
View the list of registered students.
Remove a student by clicking the "Remove" button.
Validation Rules
Student ID: Must be 8 digits.
First and Last Name: Must only contain alphabetic characters.
Email: Must be a valid email format.
Phone Number: Must be in the format 999-999-9999.
Known Issues
None reported.
Contributing
Feel free to submit issues or pull requests. Contributions are welcome!

