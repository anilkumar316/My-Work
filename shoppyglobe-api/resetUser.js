const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error', err));

const resetUser = async () => {
  try {
    await User.deleteMany({ email: 'test@shoppy.com' });

    const user = new User({
      username: 'testuser',
      email: 'test@shoppy.com',
      password: '123456' // THIS WILL BE HASHED
    });

    await user.save();
    console.log('✅ Test user created successfully');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

resetUser();

