const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      unique: true
    },
    password: String,
    githubID: String,
    googleID: String
});

const User = model("User", userSchema);

module.exports = User;
