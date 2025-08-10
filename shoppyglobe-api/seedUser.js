const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error', err));

const seedUser = async () => {
  try {
    const user = new User({
      username: 'testuser',
      email: 'test@shoppy.com',
      password: '123456'
    });
    await user.save();
    console.log('✅ Test user created');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

seedUser();
