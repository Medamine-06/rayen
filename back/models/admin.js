const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin : {type: Boolean, required :true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UsersSchema);