const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For hashing passwords

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    match: /.+\@.+\..+/ // Simple email validation
  },
  password: {
    type: String,
    required: true,
  },
  address:{
    type:String,
    required:true
  },
  mobile: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required:true
  },
}, { timestamps: true });

// Hash the password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
