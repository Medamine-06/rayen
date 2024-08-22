const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    Email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin : {type: Boolean, required :true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UsersSchema);