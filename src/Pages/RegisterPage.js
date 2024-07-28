import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // This function creates a fixed starry background similar to App.js
    const createShootingStars = () => {
      const container = document.querySelector('.stars');
      if (container) {
        container.innerHTML = ''; // Clear previous stars
        for (let i = 0; i < 10; i++) {
          const star = document.createElement('div');
          star.className = 'shooting-star';
          star.style.top = `${Math.random() * 100}vh`;
          star.style.left = `${Math.random() * 100}vw`;
          star.style.animationDuration = `${Math.random() * 3 + 2}s`;
          container.appendChild(star);
        }
      }
    };

    createShootingStars();
    const interval = setInterval(createShootingStars, 5000); // Recreate shooting stars every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form submission which causes page reload
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      navigate('/login');
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <div className="register-page">
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
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}> {/* Wrap inputs in a form */}
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <button type="submit">Register</button>
        </form>
        <div className="login-link">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
