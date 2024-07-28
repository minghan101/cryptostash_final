import React from 'react';
import PropTypes from 'prop-types';
import { useCryptoData } from '../CryptoDataContext';
import './CryptoTable.css';

const CryptoTable = ({ cryptoData, onDelete }) => {
  const { cryptoPrices } = useCryptoData();

  const handleDelete = (cryptoAsset) => {
    // Call the onDelete function with the asset to be deleted
    onDelete(cryptoAsset);
  };

  return (
    <div className="crypto-table-container">
      <h2 className="crypto-assets-header">Crypto Assets</h2>
      <div className="crypto-table">
        <table>
          <thead>
            <tr>
              <th>Cryptocurrency</th>
              <th>Amount</th>
              <th>Value (USD)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((item, index) => {
              const price = cryptoPrices[item.cryptoID]?.usd || 0;
              const valueInUSD = item.cryptoAmount * price;

              return (
                <tr key={index}>
                  <td>{item.cryptoAsset}</td>
                  <td>{item.cryptoAmount}</td>
                  <td>${valueInUSD.toFixed(2)}</td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(item.cryptoAsset)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

CryptoTable.propTypes = {
  cryptoData: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CryptoTable;
