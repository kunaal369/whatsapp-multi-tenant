import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import Group from '../models/group.model';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/waha-multitenant';

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Step 1: Clean up existing admin
    await User.deleteMany({ username: 'admin' });

    // Step 2: Ensure group exists
    let adminGroup = await Group.findOne({ name: 'Admins' });
    if (!adminGroup) {
      adminGroup = await Group.create({
        tenantId: 'defaultTenant',
        name: 'Admins',
        permissions: ['MANAGE_USERS', 'VIEW_USERS'],
      });
    }

    // Step 3: Hash password and log it
    // const plainPassword = 'admin123';
    // const hashedPassword = await bcrypt.hash(plainPassword, 10);
    // console.log('Hash:', hashedPassword);

    // Step 4: Create admin user
    const admin = await User.create({
      tenantId: 'defaultTenant',
      username: 'admin',
      password: "Demo@123",
      groupId: adminGroup._id,
    });

    console.log('✅ Admin user created:');
    console.log('Username:', admin.username);
    console.log('Hash:', admin.password);

    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to create admin:', err);
    process.exit(1);
  }
};

createAdmin();
