// const { Messages } = require("../../../../../models");
const { Message } = require("../../../../../schemas")

function parseTokenString(tokenString) {
  const [amountString, symbol] = tokenString.split(" ")
  const amount = parseFloat(amountString)
  return { amount, symbol };
}

function updateSentDM(state, payload, blockInfo, context) {
  console.log("\n\nSENT DM TRANSACTION DETECTED WITH TX PAYLOAD:");
  console.log(payload);
  console.log("\n\nTransaction amount:");
  console.log(payload.data.quantity);
  console.log("\n\nblockInfo:");
  console.log(blockInfo);

  const {
    from,
    to,
    quantity,
    memo,
  } = payload.data;
  const { amount, symbol } = parseTokenString(quantity);
  if (!state.volumeBySymbol[symbol]) {
    state.volumeBySymbol[symbol] = amount;
  } else {
    state.volumeBySymbol[symbol] += amount;
  }
  state.totalTransfers += 1;
  context.stateCopy = JSON.parse(JSON.stringify(state));

  Message.create({
    from,
    to,
    amount,
    memo,
    status: "sent",
    transactionId: payload.transactionId
  });
}

module.exports = updateSentDM;
