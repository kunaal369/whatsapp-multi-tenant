// src/models/session.model.ts
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    tenantId: { type: String, required: true },
    userId: { type: String, required: true },
    sessionName: { type: String, required: true }, // e.g. "session-kunal1"
    linked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Session = mongoose.model('Session', sessionSchema);
export default Session;
