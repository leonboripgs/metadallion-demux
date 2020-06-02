const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlockIndexStateSchema = new Schema({
  blockNumber: Number,
  blockHash: String,
  isReplay: Boolean,
  handlerVersionName: String
});

let BlockIndexState = mongoose.model('block_index_state', BlockIndexStateSchema);

module.exports = BlockIndexState;
