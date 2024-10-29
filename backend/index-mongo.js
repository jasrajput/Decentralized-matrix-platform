const db = require("./connectDb");
const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();
const cors = require('cors');

const { PORT, WSSPROVIDER, CONTRACT_ADDRESS } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

const contractAddress = CONTRACT_ADDRESS;
const contractABI = require('./abi/contract.json');

const connectWebSocket = () => {
	const provider = new ethers.providers.WebSocketProvider(WSSPROVIDER);

	const contract = new ethers.Contract(contractAddress, contractABI, provider);
	
	contract.on('Reinvest', (user, referrer, matrix, level, event) => {
		handleEvent("Reinvest", user, referrer, matrix, level, event);
	});
	
	contract.on('NewUserPlace', (user, referrer, matrix, level, place, event) => {
		handleEvent("NewUserPlace", user, referrer, matrix, level, event, place);
	});
	
	contract.on('MissedEthReceive', (receiver, from, matrix, level, event) => {
		handleEvent("MissedEthReceive",from, receiver, matrix, level, event);
	});
	
	contract.on('SentExtraEthDividends', (from, receiver, matrix, level, event) => {
		handleEvent("ExtraEthDividends", from, receiver, matrix, level, event);
	});

	provider._websocket.on('open', () => console.log('WebSocket connection opened.'));
	provider._websocket.on('message', (msg) => console.log('Message received:', msg));
	provider._websocket.on('ping', () => console.log('Ping received.'));
	provider._websocket.on('pong', () => console.log('Pong received.'));


	provider._websocket.on('close', () => {
		console.log("WebSocket connection closed. Reconnecting...'");
		setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
	});

	provider._websocket.on('error', (error) => {
        console.error('WebSocket error:', error);
        provider._websocket.close(); // Trigger reconnection
    });
}

connectWebSocket();


const handleEvent = async (eventType, user, referrer, matrix, level, event, place = null) => {
	try {
	  await db.collection('event_logs').insertOne({
		event_type: eventType,
		user_address: user,
		ref_address: referrer,
		matrix: matrix,
		level: level,
		place: place,
		block_number: event.blockNumber,
		transaction_hash: event.transactionHash
	  });
  
	  console.log('Success.');
	} catch (error) {
	  console.error('Error during event process:', error);
	  res.status(500).json({ error: er.message });
	}
  };

// API Endpoint to Fetch Events from MySQL (for frontend)
app.post('/api/events', async (req, res) => {
	try {
	  const user_address = req.body.user_address;
	  const data = await db.collection('event_logs').find({ ref_address: user_address })
						   .sort({ _id: -1 })
						   .toArray();
  
	  res.status(200).json({ data });
	} catch (er) {
	  res.status(500).json({ error: er.message });
	} 
  });
  

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});