const { AbstractActionHandler } = require("demux");
const mongoose = require("mongoose");
const { BlockIndexState } = require("../../models");

// Initial state
let state = {
  volumeBySymbol: {},
  totalTransfers: 0,
  indexState: {
    blockNumber: 0,
    blockHash: "",
    isReplay: false,
    handlerVersionName: "v1",
  }
};

const stateHistory = {};

class ActionHandler extends AbstractActionHandler {
  constructor(props) {
    super(props);
    console.log(state);

    let uri = "mongodb://FlameheadSG:ashy007@ds163530.mlab.com:63530/appa-dev";
    mongoose.connect(uri, { useNewUrlParser: true });

    // CONNECTION EVENTS
    // Connection successful
    mongoose.connection.on('connected', async () => {
      console.info(`Mongoose default connection open to ${uri}`);
      // STORE INITIAL BLOCK INDEX STATE IN MONGODB
      // let initialIndexState = await BlockIndexState.create(state.indexState);
      // console.log("Initial block index state created and stored in database:\n" + initialIndexState)
      console.log("Initial block index state:\n" + JSON.stringify(state.indexState));
    });

    // Connection throws an error
    mongoose.connection.on('error', console.error.bind(console, 'Mongoose default connection error:'));

    // Connection is disconnected
    mongoose.connection.on('disconnected', () => {
      console.info('Mongoose default connection disconnected');
    });

    // Close the connection if the node process is terminated
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
  }

  async handleWithState(handle) {
    await handle(state);
    const { blockNumber } = state.indexState;
    stateHistory[blockNumber] = JSON.parse(JSON.stringify(state));
  }

  async loadIndexState() {
    return state.indexState;
  }

  async updateIndexState(stateObj, block, isReplay, handlerVersionName) {
    stateObj.indexState.blockNumber = block.blockInfo.blockNumber;
    stateObj.indexState.blockHash = block.blockInfo.blockHash;
    stateObj.indexState.isReplay = isReplay;
    stateObj.indexState.handlerVersionName = handlerVersionName;
  }

  async rollbackTo(blockNumber) {
    const latestBlockNumber = state.indexState.blockNumber;
    const toDelete = [...Array(latestBlockNumber - (blockNumber)).keys()].map(n => n + blockNumber + 1);
    for (const n of toDelete) {
      delete stateHistory[n];
    }
    state = stateHistory[blockNumber];
  }
}

module.exports = ActionHandler;
