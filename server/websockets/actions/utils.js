module.exports = {
  clientInChannel: (wss, ws, channelName, callback) => {
    if (channelName) {
      var channel = wss.channels[channelName];
      if (channel) {
        if (channel.hasUser(ws)) {
          return callback(channel);
        } else {
          console.log('Client not in the given channel.');
        }
      } else {
        console.log('Channel does not exist.');
      }
    } else {
      console.log('no channel given');
    }
    return false;
  }
}