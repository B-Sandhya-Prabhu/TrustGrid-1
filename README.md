# Blockchain Charity Platform

A decentralized platform for transparent charitable donations using blockchain technology.

## Features

- Create and manage charity campaigns
- Make donations using cryptocurrency
- Track donation history
- Transparent fund distribution
- Real-time donation tracking

## Tech Stack

- Solidity (Smart Contracts)
- Hardhat (Development Environment)
- React.js (Frontend)
- Web3.js (Blockchain Interaction)
- MetaMask (Wallet Integration)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start local blockchain:
```bash
npx hardhat node
```

3. Deploy smart contracts:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

4. Start the frontend:
```bash
cd frontend
npm start
```

## Project Structure

- `/contracts` - Smart contracts
- `/frontend` - React frontend application
- `/scripts` - Deployment scripts
- `/test` - Test files

## License

MIT 