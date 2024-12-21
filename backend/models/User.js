const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // If password is not modified, skip hashing
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword; // Set the hashed password
    next(); // Proceed with saving the user
  } catch (err) {
    next(err); // Pass the error to the next middleware
  }
});

module.exports = mongoose.model('User', UserSchema);
