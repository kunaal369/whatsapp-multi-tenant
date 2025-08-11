// src/models/contact.model.ts
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    tenantId: String,
    userId: String,
    sessionName: String,
    contactId: String,
    name: String,
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
