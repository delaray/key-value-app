const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.status(200).send('up');
});

console.log('Connecting to DB');

mongoose.connect("mongodb://mongodb/$KEY-VALUE-DB", {
    auth: {
	username: process.env.KEY_VALUE_USER,
	password: process.env.KEY_VALUE_PASSWORD
    },
    connectTimeoutMS: 500
})
    .then(() => {
	app.listen(3000, () => {
	    console.log('Listening on port 3000');
	});
	console.log('Connected to DB');
    })
    .catch(err => {
	console.log('Something went wrong!');
	console.error(err);
    });



// console.error('Something went wrong.');
	      

