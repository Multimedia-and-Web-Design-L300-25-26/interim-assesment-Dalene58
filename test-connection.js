import mongoose from 'mongoose';

const MONGO_URI = "mongodb+srv://mdmattydaniels_db_user:6ZSL.26hyw6JXYM@cluster0.1btubvp.mongodb.net/coinbase-prod?retryWrites=true&w=majority";

console.log('Testing MongoDB connection...');

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  });
