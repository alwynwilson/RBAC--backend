const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["superadmin", "staff"], default: "staff" },
  permissions: {
    create: { type: Boolean, default: false },
    read: { type: Boolean, default: true },
    update: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  createdAt: {
  type: Date,
  default: Date.now
}
});

const users = mongoose.model("users", userSchema);

module.exports = users;