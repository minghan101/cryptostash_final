const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const profitLossRoutes = require('./profitLoss');
const { Crypto, Transaction } = require('./models/models');
const User = require('./models/userModel'); // Adjust the path if needed
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cryptoPortfolio')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Crypto API</h1>');
});

// Use the profit-loss routes
app.use(profitLossRoutes);

// User Registration Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const newUser = new User({ username, password }); // Do not hash password here
    await newUser.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

// User Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send('Invalid credentials');
    }

    const token = user.generateAuthToken(); // Use method from user model
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};

// Example protected route
app.get('/protected', authenticate, (req, res) => {
  res.send('This is a protected route');
});

/*
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));
*/

// API Endpoints

app.post('/storeCryptoAsset', async (req, res) => {
  const { cryptoAsset, cryptoAmount, buyPrice, action } = req.body;

  const amount = parseFloat(cryptoAmount);
  const price = parseFloat(buyPrice);

  if (isNaN(amount) || isNaN(price)) {
    return res.status(400).json({ success: false, message: 'Invalid amount or price' });
  }

  try {
    // Fetch the CoinGecko ID for the given cryptoAsset name
    //const coinList = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    if (!cachedCoinList || (Date.now() - cacheTimestamp) > 24 * 60 * 60 * 1000) {
      await fetchCoinList();
    }
    const coin = cachedCoinList.find(c => c.name.toLowerCase() === cryptoAsset.toLowerCase());
    //const coin = coinList.data.find(c => c.symbol.toLowerCase() === cryptoAsset.toLowerCase());

    if (!coin) {
      return res.status(400).json({ success: false, message: 'Crypto asset not found in CoinGecko list' });
    }

    const existingCrypto = await Crypto.findOne({ cryptoID: coin.id });
    //const existingCrypto = await Crypto.findOne({ cryptoAsset });

    if (existingCrypto) {
      if (action === 'Add') {
        existingCrypto.cryptoAmount += amount;
        existingCrypto.buyPrice += price;
        await existingCrypto.save();
        res.json({ success: true, message: 'Data updated by adding the amount and buy price' });
      } else if (action === 'Replace') {
        existingCrypto.cryptoAmount = amount;
        existingCrypto.buyPrice = price;
        await existingCrypto.save();
        res.json({ success: true, message: 'Data replaced with the new amount and price' });
      } else {
        res.status(400).json({ success: false, message: 'Invalid action' });
      }
    } else {
      const newCrypto = new Crypto({
        cryptoAsset,
        cryptoAmount: amount,
        buyPrice: price,
        cryptoID: coin.id,
      });
      await newCrypto.save();
      res.json({ success: true, message: 'Data stored successfully' });
    }
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({ success: false, message: 'Error storing data' });
  }
});

app.get('/getCryptoAssets', async (req, res) => {
  try {
    const data = await Crypto.find();
    res.json({ assets: data });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.get('/getCryptoAsset/:cryptoAsset', async (req, res) => {
  const { cryptoAsset } = req.params;
  try {
    const data = await Crypto.findOne({ cryptoAsset });
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'Crypto asset not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// New endpoint to get available crypto assets
app.get('/api/available-assets', async (req, res) => {
  try {
    const assets = await Crypto.find().distinct('cryptoAsset');
    res.json({ assets });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available assets' });
  }
});

app.delete('/deleteCryptoAsset/:cryptoAsset', async (req, res) => {
  const { cryptoAsset } = req.params;
  try {
    const result = await Crypto.deleteOne({ cryptoAsset });
    if (result.deletedCount > 0) {
      res.json({ success: true, message: 'Data deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Crypto asset not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting data' });
  }
});

let cachedCoinList = null;
let cacheTimestamp = null;

const fetchCoinList = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    cachedCoinList = response.data;
    cacheTimestamp = Date.now();
    console.log('Coin list updated');
  } catch (error) {
    console.error('Error fetching coin list:', error);
  }
};

// Fetch coin list initially and set interval to refresh every 24 hours
fetchCoinList();
setInterval(fetchCoinList, 24 * 60 * 60 * 1000);

app.get('/getCurrentPrices', async (req, res) => {
  try {
    if (!cachedCoinList || (Date.now() - cacheTimestamp) > 24 * 60 * 60 * 1000) {
      await fetchCoinList();
    }

    //const assets = await Crypto.find().distinct('cryptoAsset');

    const cryptoIDs = await Crypto.find().distinct('cryptoID');
    console.log('IDs from database:', cryptoIDs); // Log the assets from the database
    const ids = cryptoIDs.join(',');
    /*
    const ids = assets.map(asset => {
      const coin = cachedCoinList.find(coin => coin.name.toLowerCase() === asset.toLowerCase());
      console.log(`Asset: ${asset}, Coin ID: ${coin ? coin.id : 'Not Found'}`); // Log each asset and its corresponding coin ID
      return coin ? coin.id : null;
    }).filter(id => id !== null).join(',');
    */

    console.log('Final list of IDs:', ids); // Log the final list of IDs

    if (!ids) {
      return res.status(400).json({ message: 'No valid cryptocurrency IDs found' });
    }

    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    console.log('Price data from CoinGecko:', response.data); // Log the response data from CoinGecko

    // Log each ID and its corresponding price
    ids.split(',').forEach(id => {
      const price = response.data[id] ? response.data[id].usd : 'Price not found';
      console.log(`ID: ${id}, Price: ${price}`);
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ message: 'Error fetching prices' });
  }
});

/*
// New endpoint to fetch current prices from CoinGecko
app.get('/getCurrentPrices', async (req, res) => {
    try {
      // Build dynamic query for available cryptocurrencies
      const assets = await Crypto.find().distinct('cryptoAsset');
      const ids = assets.map(asset => asset.toLowerCase()).join(',');
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching prices' });
    }
  });
*/
  // New endpoint to fetch grouped bar chart data
app.get('/api/chart-data', async (req, res) => {
  try {
    const cryptos = await Crypto.find();
    const transactions = await Transaction.find();

    console.log('Cryptos:', cryptos); // Log fetched cryptos
    console.log('Transactions:', transactions); // Log fetched transactions
    
    // Prepare data
    const chartData = cryptos.map(crypto => {
      const totalSellPrice = transactions
      .filter(t => t.cryptoAsset === crypto.cryptoAsset)
      .reduce((acc, t) => acc + t.sellPrice, 0);
    
      
      return {
        cryptoAsset: crypto.cryptoAsset,
        buyPrice: crypto.buyPrice || 0,
        sellPrice: totalSellPrice
      };
    });

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chart data' });
  }
});

// Transaction List storage 
app.post('/storeTransaction', async (req, res) => {
  console.log('Request Body:', req.body);
  const { cryptoAsset, cryptoAmount, sellPrice, date, buyPrice } = req.body;

  try {
      const newTransaction = new Transaction({ cryptoAsset, cryptoAmount, sellPrice, date, buyPrice });
      await newTransaction.save();
      res.json({ success: true, message: 'Transaction stored successfully' });
  } catch (error) {
      console.error('Error storing transaction:', error);
      res.status(500).json({ success: false, message: 'Error storing transaction' });
  }
});

app.get('/getTransactions', async (req, res) => {
  try {
      const transactions = await Transaction.find();
      res.json({ transactions });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching transactions' });
  }
});

app.delete('/deleteTransaction/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Transaction.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.json({ success: true, message: 'Transaction deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting transaction' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});