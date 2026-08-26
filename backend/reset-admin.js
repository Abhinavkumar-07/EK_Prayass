const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Admin = require('./models/Admin');

async function resetAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB");
    
    // Check existing admins
    const admins = await Admin.find({});
    console.log("Existing admins found:");
    admins.forEach(a => console.log(`- Username: ${a.username}`));

    // Reset or create default admin
    const username = 'ekprayass';
    const password = 'ekp@321';
    
    // Clear all existing admins
    await Admin.deleteMany({});
    
    // Create new one
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newAdmin = new Admin({
      username: username,
      passwordHash: hashedPassword,
      role: 'superadmin'
    });
    
    await newAdmin.save();
    console.log(`\n✅ Admin reset successful!`);
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

resetAdmin();
