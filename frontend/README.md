# CryptoStash

CryptoStash is a web application designed to help users manage their cryptocurrency portfolios, view real-time news updates, and analyze market trends. Built with React for the frontend and Node.js with MongoDB for the backend, CryptoStash provides a user-friendly interface for tracking and analyzing cryptocurrency investments.

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
