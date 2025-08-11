// src/models/user.model.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    tenantId: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const bcrypt = require('bcrypt');
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
