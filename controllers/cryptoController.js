import Crypto from '../models/Crypto.js';

// @desc    Get all cryptocurrencies for a user
// @route   GET /api/crypto
// @access  Private
export const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: cryptos.length,
      data: cryptos
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error fetching cryptocurrencies',
      error: error.message 
    });
  }
};

// @desc    Get top gainers (highest percentage increase)
// @route   GET /api/crypto/gainers
// @access  Private
export const getGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ userId: req.user.userId })
      .sort({ change24h: -1 })
      .limit(10);
    
    res.json({
      success: true,
      count: gainers.length,
      data: gainers
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error fetching gainers',
      error: error.message 
    });
  }
};

// @desc    Get newest cryptocurrency listings
// @route   GET /api/crypto/new
// @access  Private
export const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({
      success: true,
      count: newListings.length,
      data: newListings
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error fetching new listings',
      error: error.message 
    });
  }
};

// @desc    Get single cryptocurrency by ID
// @route   GET /api/crypto/:id
// @access  Private
export const getCryptoById = async (req, res) => {
  try {
    const crypto = await Crypto.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!crypto) {
      return res.status(404).json({ 
        success: false,
        message: 'Cryptocurrency not found' 
      });
    }
    
    res.json({
      success: true,
      data: crypto
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error fetching cryptocurrency',
      error: error.message 
    });
  }
};

// @desc    Create new cryptocurrency
// @route   POST /api/crypto
// @access  Private
export const createCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    // Validation
    if (!name || !symbol || price === undefined || price === null || change24h === undefined || change24h === null) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide name, symbol, price, and 24h change' 
      });
    }

    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Price must be a positive number' 
      });
    }

    // Create crypto
    const crypto = await Crypto.create({
      name,
      symbol: symbol.toUpperCase(),
      price,
      image: image || `https://cryptologos.cc/logos/${symbol.toLowerCase()}-btc-logo.png`,
      change24h,
      userId: req.user.userId
    });

    res.status(201).json({
      success: true,
      message: 'Cryptocurrency added successfully',
      data: crypto
    });
  } catch (error) {
    console.error('Create crypto error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating cryptocurrency',
      error: error.message 
    });
  }
};

// @desc    Update cryptocurrency
// @route   PUT /api/crypto/:id
// @access  Private
export const updateCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;
    
    const crypto = await Crypto.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!crypto) {
      return res.status(404).json({ 
        success: false,
        message: 'Cryptocurrency not found' 
      });
    }

    // Update fields
    if (name) crypto.name = name;
    if (symbol) crypto.symbol = symbol.toUpperCase();
    if (price !== undefined) crypto.price = price;
    if (image) crypto.image = image;
    if (change24h !== undefined) crypto.change24h = change24h;
    
    await crypto.save();

    res.json({
      success: true,
      message: 'Cryptocurrency updated successfully',
      data: crypto
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error updating cryptocurrency',
      error: error.message 
    });
  }
};

// @desc    Delete cryptocurrency
// @route   DELETE /api/crypto/:id
// @access  Private
export const deleteCrypto = async (req, res) => {
  try {
    const crypto = await Crypto.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!crypto) {
      return res.status(404).json({ 
        success: false,
        message: 'Cryptocurrency not found' 
      });
    }

    res.json({
      success: true,
      message: 'Cryptocurrency deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error deleting cryptocurrency',
      error: error.message 
    });
  }
};