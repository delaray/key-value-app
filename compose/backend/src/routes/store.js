const express = require("express");
const { KeyValue } = require('../models/keyValue')

const keyValueRouter = express.Router();

keyValueRouter.post('/', async (req, res) => {
    const { key, value } = req.query;

    console.log(`Key = ${key}, Value = ${value}`)
    
    if (!key || !value) {
	return res
	    .status(400)
	    .json({error: "Both key and value are required."});
	}
    try {
	const existingKey = await KeyValue.findOne({ key });
	
	if (existingKey) {
	    return res.status(400).json({error: "Key already exists"});
	}

	const keyValue = new KeyValue({key, value});
	await keyValue.save();
	return res.status(201).json({message: "key value strored successfully."});
   
    } catch (err) {
	res.status(500).json({message: "Internal server error."});
    };
});
    

keyValueRouter.get('/:key', async (req, res) => {
    const { key } = req.params;
    
    try {
	const keyValue = await KeyValue.findOne({ key });
	if (!keyValue) {
	    return res.status(404).json({error: "No key-value pair found"});
	}
	return res.status(200).json({key: key, value: keyValue.value});
	
    } catch (err) {
	res.status(500).json({message: "Internal server error."});
    };
});


keyValueRouter.put('/:key', (req, res) => {
		       
    try {
    } catch (err) {
	res.status(500).json({message: "Internal server error."});
    };
});

keyValueRouter.delete('/:key', (req, res) => {
    try {
    } catch (err) {
	res.status(500).json({message: "Inteernal server error."});
    };
});


module.exports = {
    keyValueRouter,
}
