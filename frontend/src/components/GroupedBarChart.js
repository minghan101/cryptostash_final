import React, { useState, useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './GroupedBarChart.css';
import { useCryptoData } from '../CryptoDataContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GroupedBarChart = () => {
  const [data, setData] = useState([]);
  const [visibleDatasets, setVisibleDatasets] = useState({ 'Buy Price': true, 'Sell Price': true });
  const [visibleLabels, setVisibleLabels] = useState({});
  const { cryptoData, transactions } = useCryptoData(); // Get data from context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/chart-data');
        const chartData = await response.json();
        console.log('Fetched chart data:', chartData);

        setData(chartData);

        const initialVisibleLabels = chartData.reduce((acc, item) => {
          acc[item.cryptoAsset] = true;
          return acc;
        }, {});
        setVisibleLabels(initialVisibleLabels);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, [cryptoData]);

    // Combine context data with API data
    useEffect(() => {
      if (cryptoData) {
        // Initialize visibility state for each coin based on context data
        const initialVisibleLabels = cryptoData.reduce((acc, item) => {
          acc[item.cryptoAsset] = true;
          return acc;
        }, {});
        setVisibleLabels(prevLabels => ({
          ...prevLabels,
          ...initialVisibleLabels
        }));
      }
    }, [cryptoData]); // Re-run when cryptoData changes

  useEffect(() => {
    if (cryptoData) {
      const initialVisibleLabels = cryptoData.reduce((acc, item) => {
        acc[item.cryptoAsset] = true;
        return acc;
      }, {});
      setVisibleLabels(prevLabels => ({
        ...prevLabels,
        ...initialVisibleLabels
      }));
    }
  }, [cryptoData]);

  const chartLabels = useMemo(() => {
    return Array.isArray(data) ? data.map(item => item.cryptoAsset) : [];
  }, [data]);

  const buyPriceData = useMemo(() => {
    return Array.isArray(data) ? data.map(item => visibleLabels[item.cryptoAsset] ? item.buyPrice : null) : [];
  }, [data, visibleLabels]);

  const sellPriceData = useMemo(() => {
    return Array.isArray(data) ? data.map(item => visibleLabels[item.cryptoAsset] ? item.sellPrice : null) : [];
  }, [data, visibleLabels]);

  //const chartLabels = Array.isArray(data) ? data.map(item => item.cryptoAsset) : [];
  //const buyPriceData = Array.isArray(data) ? data.map(item => visibleLabels[item.cryptoAsset] ? item.buyPrice : null) : [];
  //const sellPriceData = Array.isArray(data) ? data.map(item => visibleLabels[item.cryptoAsset] ? item.sellPrice : null) : [];

  const handleLegendClick = (event, legendItem) => {
    const datasetKey = legendItem.text;
    setVisibleDatasets(prevState => ({
      ...prevState,
      [datasetKey]: !prevState[datasetKey]
    }));
  };

  const toggleVisibility = (label) => {
    setVisibleLabels(prevState => ({
      ...prevState,
      [label]: !prevState[label]
    }));
  };

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Buy Price',
        data: visibleDatasets['Buy Price'] ? buyPriceData : [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barThickness: 20,
        maxBarThickness: 30
      },
      {
        label: 'Sell Price',
        data: visibleDatasets['Sell Price'] ? sellPriceData : [],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        barThickness: 20,
        maxBarThickness: 30
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', // Color of the legend text
          font: {
            weight: 'bold', // Make legend text bold
            size: 14 // Adjust the size if needed
          }
        },
        onClick: handleLegendClick
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            return `${label}: $${context.raw !== null ? context.raw.toFixed(2) : 'hidden'}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          color: 'white', // Color of the x-axis labels
          font: {
            weight: 'bold' // Make x-axis labels bold
          }
        }
      },
      y: {
        stacked: false,
        title: {
          display: true,
          text: 'Price (USD)',
          color: 'white', // Color of the y-axis title
          font: {
            weight: 'bold' // Make y-axis title bold
          }
        },
        ticks: {
          color: 'white', // Color of the y-axis labels
          font: {
            weight: 'bold' // Make y-axis labels bold
          }
        }
      }
    }
  };

  return (
    <div className="grouped-bar-chart-container">
      <h2 className="grouped-bar-chart-title">Profit-Loss Chart</h2>
      <div className="chart-wrapper-container">
        <div className="chart-wrapper">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
      <div className="custom-legend-container">
        <div className="custom-legend">
          {chartLabels.map((label, index) => (
            <span
              key={index}
              className={`custom-legend-item ${visibleLabels[label] ? '' : 'hidden'}`}
              onClick={() => toggleVisibility(label)}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupedBarChart;
