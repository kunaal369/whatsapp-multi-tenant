// src/models/chatGroup.model.ts
import mongoose from 'mongoose';

const chatGroupSchema = new mongoose.Schema(
  {
    tenantId: String,
    userId: String,
    sessionName: String,
    groupId: String,
    name: String,
    participants: [String],
  },
  { timestamps: true }
);

const ChatGroup = mongoose.model('ChatGroup', chatGroupSchema);
export default ChatGroup;
