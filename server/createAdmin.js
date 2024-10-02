const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();
const readline = require('readline');

// Setup readline interface to take input from console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Connect to MongoDB without deprecated options
mongoose
  .connect(process.env.MONGO_URI)
  .catch((err) => console.log(err));

// Function to create a new admin
const createAdmin = async (email, password) => {
  const admin = new Admin({
    email: email,
    password: password
  });

  try {
    await admin.save();
    console.log('Admin created');
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
    mongoose.disconnect();
  }
};

// Prompt user for password first, then email
rl.question('Enter admin email: ', (email) => {
  rl.question('Enter admin password: ', (password) => {
    createAdmin(email, password);
    rl.close(); // Close the readline interface after getting input
  });
});
