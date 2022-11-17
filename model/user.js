const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String, select: false },
  token: { type: String },
  role: { type: String, enum: ['teacher', 'director', 'student', 'secretary', 'admin'] }
});

module.exports = mongoose.model("user", userSchema);