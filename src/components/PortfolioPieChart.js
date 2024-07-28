import './PortfolioPieChart.css';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useCryptoData } from '../CryptoDataContext';
import CryptoTable from './CryptoTable';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PortfolioPieChart = () => {
  const { cryptoData, fetchCryptoData, cryptoPrices, deleteCryptoAsset } = useCryptoData(); // Add deleteCryptoAsset from context
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Crypto Portfolio',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchCryptoData(); // Fetch data on mount
  }, [fetchCryptoData]);

  useEffect(() => {
    const labels = cryptoData.map(item => item.cryptoAsset || 'Unknown');
    const valuesInUSD = cryptoData.map(item => {
      const price = cryptoPrices[item.cryptoID]?.usd || 0;
      return item.cryptoAmount * price;
    });

    setChartData({
      labels,
      datasets: [
        {
          label: 'Crypto Portfolio',
          data: valuesInUSD,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [cryptoData, cryptoPrices]);

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        },
        fullSize: false,
        onHover: (e) => e.native.target.style.cursor = 'default', // set cursor to default on hover
      },
    },
  };

  const handleDelete = (cryptoAsset) => {
    // Call the deleteCryptoAsset function from context
    deleteCryptoAsset(cryptoAsset);
  };

  return (
    <div className="chart-table-container">
      <div className="chart-container">
        <h2 className="portfolioTitle">Portfolio Distribution</h2>
        <div className="pie-chart">
          <Pie data={chartData} options={options}/>
        </div>
      </div>
      <CryptoTable cryptoData={cryptoData} onDelete={handleDelete} />
    </div>
  );
};

export default PortfolioPieChart;
