// src/models/group.model.ts
import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    tenantId: { type: String, required: true },
    name: { type: String, required: true },
    permissions: [{ type: String, required: true }], // e.g., ['MANAGE_USERS', 'SEND_MESSAGES']
  },
  { timestamps: true }
);

const Group = mongoose.model('Group', groupSchema);
export default Group;
