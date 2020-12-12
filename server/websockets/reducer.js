const {
  ERR_ACTION_UNKOWN,
  GET_CHANNELS,
  SEND_MESSAGE,
  TOGGLE_TYPING,
} = require('./actions/types');
const sendMessage = require('./actions/sendMessage');
const toggleTyping = require('./actions/toggleTyping');
const getChannels = require('./actions/getChannels');

module.exports = (wss, ws, msg) => {
  var actions = JSON.parse(msg);
  if (!Array.isArray(actions)) {
    actions = [actions];
  }
  actions.forEach(action => {
    switch (action.type) {
      case SEND_MESSAGE:
        return sendMessage(wss, ws, action.payload);
      case TOGGLE_TYPING:
        return toggleTyping(wss, ws, action.payload);
      case GET_CHANNELS:
        return getChannels(wss, ws);
      default:
        ws.send(JSON.stringify({
          type: ERR_ACTION_UNKOWN,
          payload: {
            message: 'The given action type "' + action.type + '" is unknown.',
          },
        }));
    }
  });
}