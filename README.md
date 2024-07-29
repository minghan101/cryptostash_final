# 📈 CryptoStash

![CryptoStash](https://github.com/user-attachments/assets/91409ad2-2ad8-488e-a58f-60a07430be50)

CryptoStash is a web application designed to help users manage their cryptocurrency portfolios, view real-time news updates, and analyze market trends. Built with React for the frontend and Node.js with MongoDB for the backend, CryptoStash provides a user-friendly interface for tracking and analyzing cryptocurrency investments.

## 1. Introduction

### 1.1 Overview
CryptoStash is a cryptocurrency portfolio management application designed to help users track, analyze, and optimize their crypto investments. The application provides real-time data on cryptocurrency prices, visualizations of portfolio distribution, and tools for managing profit and loss.

#### Milestone Reports
Milestone reports, Poster, Video & Walkthrough: [Google Drive](https://drive.google.com/drive/u/0/folders/1temiALn9MeJzfk_cD1DB7Wb20UqV5f2y)  
Old repository (not in use): [GitHub](https://github.com/minghan101/CryptoStash)

### 1.2 Main Features
1. Interactive Coin Table
2. Dynamic Portfolio Pie Chart
3. Profit and Loss Tracker
4. Secure Authentication and User Management
5. NewsFeed
6. Transaction History
7. Consolidated Portfolio
8. Currency Converter

### 2. Technologies Used
- **Frontend**: React, Material-UI, Chart.js
- **Backend**: Node.js, Axios (API requests), Context API (state management)
- **Deployment**: render.com

## 3. Application Architecture

### 3.1 Frontend Structure
- **`src/components`**: Contains React components for various UI elements.
- **`src/pages`**: Includes page components for different views (e.g., Dashboard, Portfolio).
- **`src/context`**: Contains context providers for state management.
- **`src/api`**: Includes API utility functions.
- **`src/styles`**: Contains styling files and themes.

### 3.2 Backend Structure (if applicable)
- **`routes`**: API endpoints.
- **`controllers`**: Functions to handle API logic.
- **`models`**: Database schemas and models.
- **`services`**: External services and utilities.

### 3.3 State Management
Utilizes **Context API** for managing global state across the application. The `StateProvider` component wraps the application, providing access to state and dispatch functions.

## 4. Features and Usage

### 4.1 Interactive Coin Table
![Interactive Coin Table](https://github.com/user-attachments/assets/aac5c4fe-bbbb-4e29-85aa-9c14a33756cb)
![Interactive Coin Table](https://github.com/user-attachments/assets/ddfab723-a9ce-4e3f-92ee-2413538b8bd3)

- **Purpose**: View and manage cryptocurrency prices.
- **Usage**:
  - Search and filter cryptocurrencies.
  - Click on a row to see detailed information.

### 4.2 Portfolio Pie Chart
![Portfolio Pie Chart](https://github.com/user-attachments/assets/016282d3-bcce-4db1-b343-095b8f4da1e4)

- **Purpose**: Visualize the distribution of your cryptocurrency holdings.
- **Usage**:
  - View real-time distribution.
  - Hover over sections to see detailed percentages.

### 4.3 Profit and Loss Tracker
![Profit and Loss Tracker](https://github.com/user-attachments/assets/b917f969-2ff2-486f-988a-59f8888b6af6)

- **Purpose**: Record and track cryptocurrency transactions.
- **Usage**:
  - **Submit a Transaction**: Use the form to input transaction details.
  - **Review History**: View a list of historical transactions and their impact on your portfolio.

### 4.4 Authentication and Security
- **Private Routes**: Secure access to authenticated pages.
- **User Management**: Handles user registration and login.

### 4.5 NewsFeed
![image](https://github.com/user-attachments/assets/23a2e8b3-770b-4cad-b4d1-b369d2d940b9)

- **Purpose**: Provide real-time news updates related to cryptocurrency.
- **Usage**:
  - Browse through the latest news articles.
  - Click on articles for detailed views.

### 4.6 Transaction History
![image](https://github.com/user-attachments/assets/658eb47a-8020-423d-ac07-ae5e87f5d888)
![image](https://github.com/user-attachments/assets/40696ee3-501d-4fa1-a527-74959bce170d)

- **Purpose**: View a history of all cryptocurrency transactions.
- **Usage**:
  - Access detailed records of past transactions.
  - Filter, Delete and sort transactions as needed.

### 4.7 Consolidated Portfolio Table
![image](https://github.com/user-attachments/assets/d9370a94-dea1-43fd-99e9-397dc52d147d)

- **Purpose**: Provide a summary view of the entire portfolio across different cryptocurrencies.
- **Usage**:
  - Review aggregated data on holdings and performance.

### 4.8 Currency Converter
![image](https://github.com/user-attachments/assets/050badfa-d925-4bcf-931f-874390f579a1)
![image](https://github.com/user-attachments/assets/4c3f0f1b-ad98-4327-8ac6-0b0059ab1dc3)
![image](https://github.com/user-attachments/assets/53d0f85a-211b-45f6-a366-ab3754e3a2db)

- **Purpose**: Convert cryptocurrency values to different fiat currencies.
- **Usage**:
  - Toggle the currency on the top right hand corner of the label.

## 5. API Integration

### 5.1 API Endpoints
- **`GET /coins`**: Retrieve a list of cryptocurrencies.
- **`GET /coins/:id`**: Retrieve detailed information about a specific coin.
- **`POST /transactions`**: Submit a new transaction.
- **`GET /transactions`**: Retrieve transaction history.

### 5.2 Example Requests

**Get Coin Data:**

```bash
curl -X GET "https://api.yourcryptoapi.com/coins"

## 6. Database Structure

### 6.1 Entity-Relationship Diagram
![image](https://github.com/user-attachments/assets/ec745924-8b1c-460a-951e-074f1c1f9db7)

### 6.2 Unified Modelling Language (UML)
![image](https://github.com/user-attachments/assets/52aa03cd-2ef6-4379-bca7-191ce0d62172)

## 7. Application Design Flow
![image](https://github.com/user-attachments/assets/e9c4cf48-89a3-4488-9fad-b2994f38478f)


# 📝 User Usage Guide

## 📑 Table of Contents
- [🚀 Getting Started](#getting-started)
- [📋 Prerequisites](#prerequisites)
- [💾 Installation](#installation)
- [🔧 Configuration](#configuration)
- [📚 Usage](#usage)
- [🧪 Testing](#testing)
- [🚀 Deployment](#deployment)
- [🤝 Contributing](#contributing)
- [📜 License](#license)


```markdown
# 📝 User Usage Guide

## 📑 Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Getting Started

To get a local copy of CryptoStash up and running on your machine, follow these steps.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (for the backend)

## 💾 Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/CryptoStash.git
cd CryptoStash
```

### Install Backend Dependencies

Navigate to the backend directory and install the required packages.

```bash
cd backend
npm install
```

### Install Frontend Dependencies

Navigate to the frontend directory and install the required packages.

```bash
cd ../frontend
npm install
```

## 🔧 Configuration

### Set up MongoDB

Make sure MongoDB is running on your local machine or a remote server. Update the MongoDB connection string in `backend/config/db.js`.

```javascript
// backend/config/db.js
module.exports = {
  mongoURI: 'mongodb://localhost:27017/cryptostash'
};
```

### Environment Variables

Create a `.env` file in the backend directory with the following content:

```
MONGO_URI=mongodb://localhost:27017/cryptostash
JWT_SECRET=your_jwt_secret
```

Make sure to replace `your_jwt_secret` with a strong secret key.

## 📚 Usage

### Start the Backend Server

In the backend directory, run the following command to start the server:

```bash
npm start
```

The server will start on [http://localhost:5000](http://localhost:5000).

### Start the Frontend Application

In the frontend directory, run the following command to start the React application:

```bash
npm start
```

The React app will open in your browser at [http://localhost:3000](http://localhost:3000).

## 🧪 Testing

### Run Unit Tests

To run unit tests for the frontend, navigate to the frontend directory and run:

```bash
npm test
```

To run unit tests for the backend, navigate to the backend directory and run:

```bash
npm test
```

### Integration Testing

For integration testing, you can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test API endpoints.

## 🚀 Deployment

### Build the Frontend for Production

Navigate to the frontend directory and run:

```bash
npm run build
```

This creates a production build of your application in the `frontend/build` directory.

### Deploy Backend and Frontend

- Deploy the backend to a service like [Heroku](https://www.heroku.com/) or [AWS](https://aws.amazon.com/).
- Deploy the frontend to a service like [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).

Ensure you update the environment variables and MongoDB URI accordingly.

## 🤝 Contributing

We welcome contributions to CryptoStash! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.
