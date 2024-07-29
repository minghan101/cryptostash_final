import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CryptoDataProvider } from './CryptoDataContext';
import BannerComponent from './components/Banner/Banner';
import NewsWidget from './NewsWidget';
import CoinsTable from './components/CoinsTable';
import PortfolioPieChart from './components/PortfolioPieChart';
import ProfitLossTracker from './components/ProfitLossTracker';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './AuthContext';

// Create a theme instance
const theme = createTheme({
  palette: {
    background: {
      default: '#14161a',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
});

function App() {
  useEffect(() => {
    const createShootingStars = () => {
      const container = document.querySelector('.stars');
      container.innerHTML = ''; // Clear previous stars
      for (let i = 0; i < 10; i++) {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        container.appendChild(star);
      }
    };

    createShootingStars();
  }, []);

  return (
    <CryptoDataProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <div style={{ minHeight: '100vh', position: 'relative' }}>
              <div className="stars">
                {[...Array(100)].map((_, i) => (
                  <div
                    key={i}
                    className="star"
                    style={{
                      top: `${Math.random() * 100}vh`,
                      left: `${Math.random() * 100}vw`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  />
                ))}
              </div>
              <Header />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route 
                  path="/" 
                  element={
                    <PrivateRoute 
                      element={() => (
                        <>
                          <BannerComponent />
                          <PortfolioPieChart />
                          <div className='widgets-container'>
                            <ProfitLossTracker />
                            <NewsWidget />
                          </div>
                          <CoinsTable />
                          
                        </>
                      )} 
                    />
                  } 
                />
                <Route 
                  path="/coins/:id" 
                  element={<PrivateRoute element={CoinPage} />} 
                />
              </Routes>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </CryptoDataProvider>
  );
}


export default App;
