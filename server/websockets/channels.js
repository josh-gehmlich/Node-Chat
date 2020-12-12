const WebSocket = require('ws');
const uuid = require('node-uuid');
const Channel = require('./Channel');

WebSocket.Server.prototype.channels = {};

WebSocket.Server.prototype.createChannel = function(channelName, description) {
  if (channelName in this.channels) {
    console.log('channel already exists!');
    return false;
  }
  this.channels[channelName] = new Channel(uuid.v4(), channelName, description);
  console.log('new channel created: ' + channelName)
  return true;
}

WebSocket.Server.prototype.joinChannel = function(client, channelName) {
  if (this.channels && this.channels[channelName]) {
    if (this.channels[channelName].addUser(client)) {
      console.log(client.id + " joined " + channelName);
      return true;
    }
    console.log(client.id + ' already in channel ' + channelName)
  } else {
    console.log('The channel \"' + channelName + '\" does not exist.');
  }
  return false;
}

WebSocket.Server.prototype.leaveChannel = function(client, channelName) {
  if (this.channels && this.channels[channelName]) {
    if (this.channels[channelName].removeUser(client)) {
      return true;
    }
    console.log(client.id + ' was not in channel ' + channelName)
  } else {
    console.log('The channel \"' + channelName + '\" does not exist.');
  }
  return false;
}