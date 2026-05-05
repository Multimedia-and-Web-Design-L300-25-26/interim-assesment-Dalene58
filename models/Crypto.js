import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  symbol: { 
    type: String, 
    required: [true, 'Symbol is required'],
    uppercase: true,
    trim: true
  },
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  image: { 
    type: String, 
    default: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
  },
  change24h: { 
    type: Number, 
    required: [true, '24h change is required']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Crypto', cryptoSchema);