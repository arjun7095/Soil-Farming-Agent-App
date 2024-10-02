# Soil-Farming-Agent-app
## Description
This project is a Soil Farming Agent application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows administrators to manage soil and distributor details and enables users to view this information.

## Table of Contents
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Creating Admin Credentials](#creating-admin-credentials)
- [Usage](#usage)
- [License](#license)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/arjun7095/Soil-Farming-Agent-App.git
   cd Soil-Farming-Agent-app
   
2.**Install server dependencies**:
  cd server
  npm install

3.**Install client dependencies**:
  cd client
  npm install

4. **Create a .env file in the server directory and add your MongoDB connection string:**
  MONGO_URI=your_mongodb_connection_string

## Running the Project
# Start the Server
1. **Navigate to the server directory:**
    cd server
2. **Start the server:**
   nodmon app.js

# Start the Client
1. **Open a new terminal and navigate to the client directory:**
   cd client
2. **Start the client application:**
   npm start
Note: The client application will be accessible at http://localhost:3000, and the server will typically run on http://localhost:5000.

## Creating Admin Credentials
1. Open a terminal and navigate to the server directory.
2. **Run the script to create an admin**:
    node createAdmin.js
3. Follow the prompts to enter the admin password and email.

## Usage
--> Navigate to the client application in your web browser.
--> You will be able to view soil and distributor details.
--> Admins can manage these details via the admin dashboard.



















