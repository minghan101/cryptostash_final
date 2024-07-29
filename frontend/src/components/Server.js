const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cryptoPortfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
const cryptoSchema = new mongoose.Schema({
  cryptoAsset: String,
  cryptoAmount: Number,
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

// API Endpoints
app.post('/storeCryptoAsset', async (req, res) => {
  const { cryptoAsset, cryptoAmount } = req.body;
  try {
    const newCrypto = new Crypto({ cryptoAsset, cryptoAmount });
    await newCrypto.save();
    res.json({ success: true, message: 'Data stored successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error storing data' });
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

app.get('/getCryptoAssets', async (req, res) => {
  try {
    const data = await Crypto.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
