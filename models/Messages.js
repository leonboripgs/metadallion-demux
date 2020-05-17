const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  from: String, // sender username
  to: String, // recipient username
  amount: Number, // blockchain transaction amount
  memo: String, // text of the DM message
  status: String, // can be 'sent' or 'read'
});

let Messages = mongoose.model('message', MessageSchema);

module.exports = Messages;
