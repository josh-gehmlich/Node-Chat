const { OPEN } = require('ws');
const { USER_TYPING } = require('./types');
const { CHAIN_EXPIRE } = require('../constants');
const { clientInChannel } = require('./utils');

const broadcastTyping = (channel, ws, typing) => {
  ws.typing = typing;
  channel.broadcast(
    JSON.stringify({
      type: USER_TYPING,
      payload: {
        typing,
        user: ws.id,
        channel,
      },
    }),
    false,
    ws,
    false,
  );
};

module.exports = (wss, ws, msg) => {
  clientInChannel(wss, ws, msg.channel, channel => {
    const typing = msg.typing;
    if (ws.typeTimeout) {
      clearTimeout(ws.typeTimeout);
      ws.typeTimeout = undefined;
    }
    broadcastTyping(channel, ws, typing);
    ws.typeTimeout = setTimeout(() => {
      if (ws.typing) {
        broadcastTyping(channel, ws, false);
      }
    }, CHAIN_EXPIRE);
  })
};