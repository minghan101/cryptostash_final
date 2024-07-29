// src/components/ProfitLossForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import './ProfitLossForm.css'; // Updated CSS
import { useCryptoData } from '../CryptoDataContext';

const ProfitLossForm = () => {
  const [cryptoAsset, setCryptoAsset] = useState('');
  const [cryptoAmount, setNumCoinsSold] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [date, setDateSold] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [availableAssets, setAvailableAssets] = useState([]);

  // Access crypto data from context
  const { cryptoData, fetchCryptoData } = useCryptoData();

  /*
  useEffect(() => {
    // Fetch available assets
    const fetchAvailableAssets = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/available-assets');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setAvailableAssets(data.assets);
        } catch (error) {
          console.error('Error fetching available assets:', error);
        }
      };
  
      fetchAvailableAssets();
    }, []);
    */

    useEffect(() => {
      // Fetch available assets from context
      fetchCryptoData();
    }, [fetchCryptoData]);
  
    useEffect(() => {
      // Update availableAssets state whenever cryptoData changes
      setAvailableAssets(cryptoData.map(asset => asset.cryptoAsset));
    }, [cryptoData]);

const handleSubmit = async (e) => {
  e.preventDefault();

    // Helper function to convert dd/mm/yyyy to yyyy-mm-dd
    const formatDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
      };
    
      const formattedDate = formatDate(date);
  
  try {
    // Submit profit/loss
    const response = await axios.post('/api/profit-loss', {
      cryptoAsset,
      cryptoAmount: parseFloat(cryptoAmount),
      sellPrice: parseFloat(sellPrice),
      date: new Date(formattedDate).toISOString(),
      buyPrice: 0
    });
    
    if (response.status === 200) {
      setSuccess(response.data.message);
      setError('');
      
      // Record the transaction
      const transactionData = {
        cryptoAsset,
        cryptoAmount,
        sellPrice,
        date,
        buyPrice: 0 // Assuming this is always zero for sales
      };

      const transactionResponse = await axios.post('http://localhost:5000/storeTransaction', transactionData);
      if (transactionResponse.status === 200) {
        console.log('Transaction recorded successfully');
      } else {
        console.error('Failed to record transaction');
            }
        }
    } 
    catch (err) {
        setError(err.response?.data?.error || 'Something went wrong');
        setSuccess('');
    }
    };

  return (
    <div className="profit-loss-form-container">
      <div className="profit-loss-form-box">
        <header>CryptoAssets Sold</header>
        <form onSubmit={handleSubmit}>
          <div className="profit-loss-form-field-input">
            <FormControl fullWidth margin="normal">
              <InputLabel id="cryptoAsset-label" className="profit-loss-form-label">Crypto Asset Sold</InputLabel>
              <Select
                labelId="cryptoAsset-label"
                id="cryptoAsset"
                value={cryptoAsset}
                onChange={(e) => setCryptoAsset(e.target.value)}
                className="profit-loss-form-select"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: '#333', // Black background for dropdown menu
                      color: 'white', // White text color for dropdown menu
                      '& .MuiMenuItem-root': {
                        color: 'white', // White text color for menu items
                        backgroundColor: '#333', // Black background for menu items
                        '&:hover': {
                          backgroundColor: '#444' // Slightly lighter black on hover
                        }
                      }
                    }
                  }
                }}
              >
                {availableAssets.map((asset) => (
                  <MenuItem key={asset} value={asset}>
                    {asset}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="profit-loss-form-field-input">
            <label htmlFor="numCoinsSold" className="profit-loss-form-label">No. of Coins Sold</label>
            <TextField
              id="numCoinsSold"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={cryptoAmount}
              onChange={(e) => setNumCoinsSold(e.target.value)}
              className="profit-loss-form-textField"
            />
          </div>
          <div className="profit-loss-form-field-input">
            <label htmlFor="sellPrice" className="profit-loss-form-label">Sell Price</label>
            <TextField
              id="sellPrice"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              className="profit-loss-form-textField"
            />
          </div>
          <div className="profit-loss-form-field-input">
            <label htmlFor="dateSold" className="profit-loss-form-label">Date Sold</label>
            <TextField
              id="dateSold"
              variant="outlined"
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDateSold(e.target.value)}
              className="profit-loss-form-textField"
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            className="profit-loss-form-submit-button"
          >
            Submit
          </Button>
          {error && <Typography className="profit-loss-form-error-text">{error}</Typography>}
          {success && <Typography className="profit-loss-form-success-text">{success}</Typography>}
        </form>
      </div>
    </div>
  );
};

export default ProfitLossForm;
