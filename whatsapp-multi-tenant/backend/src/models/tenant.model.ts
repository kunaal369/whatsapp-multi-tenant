// src/models/tenant.model.ts
import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tenantId: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const Tenant = mongoose.model('Tenant', tenantSchema);
export default Tenant;
