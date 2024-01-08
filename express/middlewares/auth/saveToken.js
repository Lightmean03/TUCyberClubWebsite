const Token = require("../models/token");

// Function to save a token to the database
const saveTokenToDatabase = async (token) => {
  try {
    const newToken = new Token({ value: token });
    await newToken.save();
    console.log("Token saved to the database:", token);
  } catch (error) {
    console.error("Error saving token to the database:", error);
  }
};

// Example usage
const frontendToken = "your_frontend_token_here";
saveTokenToDatabase(frontendToken);
