const mongoose = require("mongoose");

const keyValueSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
});

const KeyValue = mongoose.mode('KeyValue', keyValueSchema);

module.exports = {
    keyValue,
};
