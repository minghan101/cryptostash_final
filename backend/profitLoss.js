const express = require('express');
const router = express.Router();
const { Crypto, Transaction } = require('./models/models'); // Import models from models.js

router.post('/api/profit-loss', async (req, res) => {
  const { cryptoAsset, cryptoAmount, sellPrice, date, buyPrice } = req.body;

  try {
    // Find the crypto asset
    const crypto = await Crypto.findOne({ cryptoAsset });
    
    if (!crypto) {
      return res.status(400).json({ error: 'Crypto Asset does not exist' });
    }
    
    // Check if the user has enough coins
    if (crypto.cryptoAmount < cryptoAmount) {
      return res.status(400).json({ error: `Your current balance is: ${crypto.cryptoAmount}` });
    }

    /*
    // Check for existing transaction
    const existingTransaction = await Transaction.findOne({ cryptoAsset, numCoinsSold, sellPrice, dateSold });

    if (existingTransaction) {
        return res.status(400).json({ error: 'Transaction already exists' });
    } */
    
    // Update the crypto amount
    crypto.cryptoAmount -= cryptoAmount;
    await crypto.save();
    /*
    // Record the transaction
    const newTransaction = new Transaction({
      cryptoAsset,
      numCoinsSold,
      sellPrice,
      dateSold,
    });

    await newTransaction.save();
    */
    return res.status(200).json({ message: 'Transaction recorded successfully' });
    
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
