const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  cryptoAsset: String,
  cryptoAmount: Number,
  buyPrice: { type: Number, default: null }, // Optional field
  cryptoID: String
});

const transactionSchema = new mongoose.Schema({
    cryptoAsset: { type: String, required: true },
    cryptoAmount: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
    date: { type: Date, required: true },
    buyPrice: { type: Number, required: true }
  });

  // Add a unique index
//transactionSchema.index({ cryptoAsset: 1, numCoinsSold: 1, buyPrice: 1, sellPrice: 1, dateSold: 1 }, { unique: true });

// Avoid recompiling models by using mongoose.models
const Crypto = mongoose.models.Crypto || mongoose.model('Crypto', cryptoSchema);
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

module.exports = { Crypto, Transaction };
