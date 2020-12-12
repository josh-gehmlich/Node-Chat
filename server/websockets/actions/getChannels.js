module.exports = (wss, ws) => {
  var channelsList = Object.keys(wss.channels);
  ws.send(JSON.stringify({
    type: MESSAGE_DELIVERED,
    payload: channelsList,
  }));
}