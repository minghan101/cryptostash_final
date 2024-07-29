# CryptoStash
![image](https://github.com/user-attachments/assets/91409ad2-2ad8-488e-a58f-60a07430be50)
CryptoStash is a web application designed to help users manage their cryptocurrency portfolios, view real-time news updates, and analyze market trends. Built with React for the frontend and Node.js with MongoDB for the backend, CryptoStash provides a user-friendly interface for tracking and analyzing cryptocurrency investments.

## 1 Introduction

## 1.1 Overview
CryptoStash is a cryptocurrency portfolio management application designed to help users track, analyze, and optimize their crypto investments. The application provides real-time data on cryptocurrency prices, visualizations of portfolio distribution, and tools for managing profit and loss.

### 1.2 Features
1. Interactive Coin Table
2. Dynamic Portfolio Pie Chart
3. Profit and Loss Tracker
4. Secure Authentication and User Management

 ### 2 Technologies Used
Frontend: React, Material-UI, Chart.js
Backend: Axios (API requests), Context API (state management)
Deployment: [Specify if applicable, e.g., AWS, Heroku]

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
![image](https://github.com/user-attachments/assets/aac5c4fe-bbbb-4e29-85aa-9c14a33756cb)
![image](https://github.com/user-attachments/assets/ddfab723-a9ce-4e3f-92ee-2413538b8bd3)


- **Purpose**: View and manage cryptocurrency prices.
- **Usage**:
  - Search and filter cryptocurrencies.
  - Click on a row to see detailed information.

### 4.2 Portfolio Pie Chart
![image](https://github.com/user-attachments/assets/016282d3-bcce-4db1-b343-095b8f4da1e4)

- **Purpose**: Visualize the distribution of your cryptocurrency holdings.
- **Usage**:
  - View real-time distribution.
  - Hover over sections to see detailed percentages.

### 4.3 Profit and Loss Tracker
![image](https://github.com/user-attachments/assets/b917f969-2ff2-486f-988a-59f8888b6af6)

- **Purpose**: Record and track cryptocurrency transactions.
- **Usage**:
  - **Submit a Transaction**: Use the form to input transaction details.
  - **Review History**: View a list of historical transactions and their impact on your portfolio.

### 4.4 Authentication and Security

- **Private Routes**: Secure access to authenticated pages.
- **User Management**: Handles user registration and login.

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
```

## Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get a local copy of CryptoStash up and running on your machine, follow these steps.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (for the backend)

### Installation

1. **Clone the repository**

    ```sh
    git clone https://github.com/yourusername/CryptoStash.git
    cd CryptoStash
    ```

2. **Install Backend Dependencies**

    Navigate to the backend directory and install the required packages.

    ```sh
    cd backend
    npm install
    ```

3. **Install Frontend Dependencies**

    Navigate to the frontend directory and install the required packages.

    ```sh
    cd ../frontend
    npm install
    ```

### Configuration

1. **Set up MongoDB**

    Make sure MongoDB is running on your local machine or a remote server. Update the MongoDB connection string in `backend/config/db.js`.

    ```js
    // backend/config/db.js
    module.exports = {
      mongoURI: 'mongodb://localhost:27017/cryptostash'
    };
    ```

2. **Environment Variables**

    Create a `.env` file in the backend directory with the following content:

    ```env
    MONGO_URI=mongodb://localhost:27017/cryptostash
    JWT_SECRET=your_jwt_secret
    ```

    Make sure to replace `your_jwt_secret` with a strong secret key.

### Usage

1. **Start the Backend Server**

    In the backend directory, run the following command to start the server:

    ```sh
    npm start
    ```

    The server will start on [http://localhost:5000](http://localhost:5000).

2. **Start the Frontend Application**

    In the frontend directory, run the following command to start the React application:

    ```sh
    npm start
    ```

    The React app will open in your browser at [http://localhost:3000](http://localhost:3000).

### Testing

1. **Run Unit Tests**

    To run unit tests for the frontend, navigate to the frontend directory and run:

    ```sh
    npm test
    ```

    To run unit tests for the backend, navigate to the backend directory and run:

    ```sh
    npm test
    ```

2. **Integration Testing**

    For integration testing, you can use tools like Postman or Insomnia to test API endpoints.

### Deployment

1. **Build the Frontend for Production**

    Navigate to the frontend directory and run:

    ```sh
    npm run build
    ```

    This creates a production build of your application in the `frontend/build` directory.

2. **Deploy Backend and Frontend**

    - Deploy the backend to a service like Heroku or AWS.
    - Deploy the frontend to a service like Netlify or Vercel.
    - Ensure you update the environment variables and MongoDB URI accordingly.

### Contributing

We welcome contributions to CryptoStash! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
