const db = require('./db');

module.exports.handleSignUp = (email, password) => {
    // Check if an email already exist
    db.saveUser({ email, password });
    // Save the user to the database
    // Send the welcome email
};