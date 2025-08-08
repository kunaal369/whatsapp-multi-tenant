// src/models/message.model.ts
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    tenantId: String,
    userId: String,
    sessionName: String,
    to: String,
    content: String,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
