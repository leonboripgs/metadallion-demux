const mongoose = require('mongoose');
const { Schema } = mongoose;
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const MessageSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: Number,
  memo: String,
  status: String,
  transactionId: String,
  created_at: { type: Date, default: Date.now()},
  updated_at: { type: Date, default: Date.now()}
});

MessageSchema.plugin(autoIncrement.plugin, 'data_messages')
module.exports = mongoose.model('data_messages', MessageSchema);
