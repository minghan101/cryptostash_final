import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransactionRecord.css';
import { useCryptoData } from '../CryptoDataContext';

/*
const TransactionRecord = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getTransactions');
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteTransaction/${id}`);
      if (response.data.success) {
        setTransactions(transactions.filter(transaction => transaction._id !== id));
      } else {
        console.error('Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };
  */

  const TransactionRecord = () => {
    const { transactions, fetchTransactions, deleteTransaction } = useCryptoData();
  
    // Fetch transactions when the component mounts
    useEffect(() => {
      fetchTransactions();
    }, [fetchTransactions]);
  
    // Handle delete transaction
    const handleDelete = async (id) => {
      try {
        await deleteTransaction(id);
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    };

  return (
    <div className="transaction-record-container">
      <h2 className="transaction-record-title">Transaction Records</h2>
      <table className="transaction-record-table">
        <thead>
          <tr>
            <th>Crypto Asset</th>
            <th>Amount</th>
            <th>Buy Price</th>
            <th>Sell Price</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.cryptoAsset}</td>
              <td>{transaction.cryptoAmount}</td>
              <td>{transaction.buyPrice}</td>
              <td>{transaction.sellPrice}</td>
              <td>{transaction.date}</td>
              <td>
                <button
                  className="transaction-record-delete-button"
                  onClick={() => handleDelete(transaction._id)}
                >
                  Remove From Records
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionRecord;
