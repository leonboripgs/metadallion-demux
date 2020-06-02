const updateTransferData = require('./updaters/updateTransferData');
const logUpdate = require('./effects/logUpdate');
const updateSentDM = require('./updaters/updateSentDM');
// const updateAcceptedDM = require('./updaters/updateAcceptedDM');
// const updateCanceledDM = require('./updaters/updateCanceledDM');

const updaters = [
  {
    actionType: "eosio.token::transfer",
    apply: updateTransferData
  },
  {
    actionType: "eosio.token::send_dm",
    apply: updateSentDM
  },
  // {
  //   actionType: "eosio.token::accept_dm",
  //   apply: updateAcceptedDM
  // },
  // {
  //   actionType: "eosio.token::cancel_dm",
  //   apply: updateCanceledDM
  // },
];

const effects = [
  {
    actionType: "eosio.token::transfer",
    run: logUpdate
  },
];

const handlerVersion = {
  versionName: "v1",
  updaters,
  effects
};

module.exports = handlerVersion;
