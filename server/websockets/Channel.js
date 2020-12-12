const { OPEN } = require('ws');

module.exports = class Channel {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description || 'The best channel on planet earth!';
    this.users = new Set();
    this.history = [];
  }

  getChannelInfo(includeHistory) {
    var info = {
      id: this.id,
      name: this.name,
      description: this.description,
      users: Array.from(this.users).map(u => ({
        id: u.id
      })),
    };
    return includeHistory
      ? info 
      : Object.assign(info, {
        history: this.history,
      });
  }

  updateName(name) {
    this.name = name;
  }

  updateDescription(description) {
    this.description = description;
  }

  addUser(user) {
    if (this.users.size < 32) {
      const prevSize = this.users.size;
      if (prevSize !== this.users.add(user).size) {
        user.channels.add(this.name);
        return true;
      }
    }
    return false;
  }

  removeUser(user) {
    if (this.users.delete(user)) {
      user.channels.delete(channelName);
      return true;
    }
    return false;
  }

  hasUser(user) {
    return this.users.has(user);
  }

  broadcast(message, record, sender = undefined, includeSender = true) {
    if (record) {
      this.history.push(message);
      this.history = this.history.slice(-128);
    }
    this.users.forEach(user => {
      if (user.readyState === OPEN
        && (sender === undefined || (!includeSender && user !== sender))) {
          user.send(message);
      }
    });
  }
};