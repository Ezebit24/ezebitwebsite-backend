const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userService = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },

  validatePassword: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },

  findUserByEmail: async (email) => {
    return User.findOne({ email });
  }
};

module.exports = userService;