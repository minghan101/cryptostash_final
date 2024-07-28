import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CoinList } from "../src/config/api";

const CryptoDataContext = createContext();

export const CryptoDataProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [realCryptos, setRealCryptos] = useState([]); // State for real cryptocurrencies
  const [cryptoPrices, setCryptoPrices] = useState({}); // State for storing current prices
  const [transactions, setTransactions] = useState([]); // Add state for transactions

  // Fetch crypto data from the backend
  const fetchCryptoData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getCryptoAssets');
      setCryptoData(response.data.assets);
    } catch (error) {
      console.error('Error fetching crypto data', error);
    }
  };

    // Fetch transactions from the backend
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getTransactions');
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

  // Fetch real cryptocurrencies from the CoinList API
  const fetchRealCryptos = async (currency = 'usd') => {
    try {
      const response = await axios.get(CoinList(currency));
      setRealCryptos(response.data.map(coin => ({ id: coin.id, name: coin.name }))); // Store only the names
    } catch (error) {
      console.error('Error fetching real cryptos', error);
    }
  };

  // Fetch current prices from CoinGecko
  const fetchCurrentPrices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getCurrentPrices');
      setCryptoPrices(response.data);
    } catch (error) {
      console.error('Error fetching current prices', error);
    }
  };

    // Add or replace a crypto asset
    const saveCryptoAsset = async (cryptoAsset, cryptoAmount, action) => {
      try {
        const response = await axios.post('http://localhost:5000/storeCryptoAsset', {
          cryptoAsset,
          cryptoAmount,
          action,
        });
        if (response.data.success) {
          fetchCryptoData(); // Refresh data after adding or replacing
        }
      } catch (error) {
        console.error('Error saving crypto asset:', error);
      }
    };

  // Delete a crypto asset and update local state
  const deleteCryptoAsset = async (cryptoAsset) => {
    try {
      // Call backend API to delete the asset
      await axios.delete(`http://localhost:5000/deleteCryptoAsset/${cryptoAsset}`);
      
      // Update local state to remove the deleted asset
      setCryptoData(prevData => prevData.filter(item => item.cryptoAsset !== cryptoAsset));
    } catch (error) {
      console.error('Error deleting crypto asset:', error);
    }
  };

    // Add a transaction
    const saveTransaction = async (transaction) => {
      try {
        const response = await axios.post('http://localhost:5000/storeTransaction', transaction);
        if (response.data.success) {
          fetchTransactions(); // Refresh transactions after adding
        }
      } catch (error) {
        console.error('Error saving transaction:', error);
      }
    };
  
    // Delete a transaction and update local state
    const deleteTransaction = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/deleteTransaction/${id}`);
        setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction._id !== id));
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    };

  useEffect(() => {
    fetchCryptoData(); // Fetch data when the component mounts
    fetchRealCryptos(); // Fetch real cryptocurrencies when the component mounts
    fetchCurrentPrices(); // Fetch current prices when the component mounts
    fetchTransactions(); // Fetch transactions when the component mounts
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchCurrentPrices, 60000); // Refresh prices every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <CryptoDataContext.Provider value={{ cryptoData, fetchCryptoData, realCryptos, cryptoPrices, saveCryptoAsset, deleteCryptoAsset, transactions, fetchTransactions, saveTransaction, deleteTransaction }}>
      {children}
    </CryptoDataContext.Provider>
  );
};

export const useCryptoData = () => useContext(CryptoDataContext);
