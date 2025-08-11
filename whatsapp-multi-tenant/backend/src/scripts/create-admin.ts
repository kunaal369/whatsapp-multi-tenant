import mongoose from 'mongoose';
import Group from '../models/group.model';
import User from '../models/user.model';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/waha-multitenant';

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to Mongo');

  const tenantId = 'tenant-default';

  const groupsData = [
    { name: 'Admins', permissions: ['MANAGE_USERS', 'LINK_DEVICES', 'SEND_MESSAGES', 'VIEW_LOGS'] },
    { name: 'Editors', permissions: ['LINK_DEVICES', 'SEND_MESSAGES', 'VIEW_LOGS'] },
    { name: 'Viewers', permissions: ['VIEW_LOGS'] }
  ];

  for (const g of groupsData) {
    await Group.findOneAndUpdate(
      { tenantId, name: g.name },
      { tenantId, name: g.name, permissions: g.permissions },
      { upsert: true, new: true }
    );
  }

  // Create default admin
  const adminGroup = await Group.findOne({ tenantId, name: 'Admins' });
  const existingAdmin = await User.findOne({ username: 'admin', tenantId });
  if (!existingAdmin) {
    const admin = new User({
      tenantId,
      username: 'admin',
      password: 'admin123', // You can hash later if needed
      groupId: adminGroup?._id
    });
    await admin.save();
    console.log(`Admin created: admin / admin123`);
  } else {
    console.log(`Admin already exists`);
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
