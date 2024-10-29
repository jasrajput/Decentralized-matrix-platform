# Decentralized Matrix Investment Platform

## Overview

Welcome to the **Decentralized Matrix Investment Platform** – an innovative investment solution built on the Binance Smart Chain. Our platform features a dynamic 2x2 matrix pool system with 8 distinct pools, allowing users to choose between token-based or USDT-based investment strategies. We leverage advanced technologies to provide a seamless and engaging experience.

## Key Features

- **2x2 Matrix Pools:** Engage with our unique 2x2 matrix system across 8 pools, designed to optimize your investment strategy.
- **Flexible Investment Options:** Choose between using custom tokens or USDT for your investments.
- **Custom USDT Token:** Our platform utilizes a custom USDT token, developed to streamline the investment process and bypass the challenges of acquiring testnet USDT.
- **Efficient Distribution:** For every $20 distributed, 45% is allocated to the referrer and parent, while 5% goes to the admin.

## Architecture

- **Frontend:** Built with React.js to offer a responsive and user-friendly interface.
- **Backend:**
  - **Main Backend:** Developed using Solidity for smart contract functionality.
  - **Custom Backend:** Implemented in Node.js to handle event data storage via webhooks.
- **Blockchain:** Operates on Binance Smart Chain for secure and efficient transactions.

## Libraries and Tools

Our project integrates a variety of libraries and tools to enhance functionality and user experience:

- **ethers.js:** For interacting with the Ethereum blockchain and managing transactions.
- **react-content-loader:** For skeleton loading animations to improve user experience during data fetching.
- **react-placeholder-loading:** Provides loading placeholders while data is being fetched.
- **react-router-dom:** Manages routing within the React application.
- **swiper:** Adds smooth and interactive carousel functionality.
- **react-toastify:** Displays notifications and alerts in a user-friendly manner.
- **@web3modal/ethers5:** Facilitates easy connection to Ethereum wallets.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/jasrajput/unity-bank-matrix-testnet.git


2. **Enter the Repository & Install dependencies:**

   ```bash
   cd unity-bank-matrix-testnet/ && cd frontend/ && npm install && cd ../backend && npm install


3. **Set Up Environment Variables:**

   ```bash
   Create a .env file in the root directory and add the following environment variables.
   Frontend
   REACT_APP_CONTRACT_ADDRESS="Investment Address"
   REACT_APP_TOKEN_CONTRACT_ADDRESS="Token Address"
   REACT_APP_USDT_CONTRACT_ADDRESS="USDT Address"
   REACT_APP_DOMAIN="API Domain URI"
   REACT_APP_DOMAIN_REF="MAIN DOMAIN URI"
   REACT_APP_PROJECT_ID="INUFRA PROJECT ID"

   Backend
   PORT=3001
   HOST=localhost
   USERNAME="DATABASE USERNAME"
   PASSWORD="DATABASE PASSWORD"
   DATABASE="DATABASE NAME"
   WSSPROVIDER="WEBSOCKET PROVIDER"
   CONTRACT_ADDRESS="INVESTMENT CONTRACT ADDRESS"

4. **Start the Development Server:**

   ```bash
   npm start


### Contributing
We welcome contributions to improve the platform. To contribute:

Fork the repository.
Create a new branch for your changes.
Commit your changes with clear messages.
Push your branch to your forked repository.
Open a pull request with a description of your changes.


### License
This project is licensed under the MIT License.


### Contact
For any inquiries or support, please contact us at jasrajput956@gmail.com
