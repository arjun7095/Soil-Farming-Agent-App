const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();
const readline = require('readline');

// Setup readline interface to take input from console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .catch((err) => console.log(err));

// Function to create a new admin
const createAdmin = async (email, password) => {
  try {
    // Check if an admin with the same email already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log('Admin with this email already exists.');
      mongoose.disconnect();
      return;
    }

    // If admin doesn't exist, create new admin
    const admin = new Admin({
      email: email,
      password: password
    });

    await admin.save();
    console.log('Admin created');
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
    mongoose.disconnect();
  }
};

// Prompt user for email and password
rl.question('Enter admin email: ', (email) => {
  rl.question('Enter admin password: ', (password) => {
    createAdmin(email, password);
    rl.close(); // Close the readline interface after getting input
  });
});
