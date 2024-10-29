const connection = require('./connectDb');
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
	
	contract.on('NewUserPlace', (user, referrer, matrix, level, place, event) => {
		handleEvent("NewUserPlace", user, referrer, matrix, level, event, place);
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
		const sql = "INSERT INTO event_logs SET event_type = ?, user_address = ?, ref_address = ?, matrix = ?, level = ?, place = ?, block_number = ?, transaction_hash = ?";
		await connection.execute(sql, [eventType, user, referrer, matrix, level, place, event.blockNumber, event.transactionHash]);
	} catch (error) {
		return error.message
	}
}

app.post('/api/events', async (req, res) => {
	try {
		const user_address = req.body.user_address;
		const sql = 'Select * from event_logs where ref_address = ? order by id desc';
		const [data] = await connection.execute(sql, [user_address]);
		res.status(200).json({data: data});
	} catch(er) {
		res.status(500).json({error: er.message});
	}
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});