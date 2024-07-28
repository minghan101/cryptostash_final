import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsWidget.css'; // Ensure you have the CSS file imported

const NewsWidget = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fc32e1b70e284eccb800c346892a0e42', {
          params: {
            country: 'us',
            apiKey: 'fc32e1b70e284eccb800c346892a0e42', // Replace with your actual API key
          },
        });
        // Only set the latest 1 or 2 articles
        setArticles(response.data.articles.slice(0, 4));
        console.log(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-widget">
      <h2>Breaking Finance News</h2>
      {articles.map((article, index) => (
        <div key={index} className="news-article">
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="news-image"
            />
          )}
          <div className="news-content">
            <h3>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-headline"
              >
                {article.title}
              </a>
            </h3>
            <p>{article.description || 'No description available'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsWidget;
