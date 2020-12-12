import React, { Children, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { receiveMessage, updateTypers, messageDelivered } from 'actions/messages';
import { registerUser } from 'actions/websockets';

class WSProvider extends Component {
  componentDidMount() {
    this.props.ws.onmessage = e => {
      var action = JSON.parse(e.data);
      switch (action.type) {
        case 'REGISTER_USER':
          return this.props.registerUser(action.payload);
        case 'RECEIVE_MESSAGE':
          return this.props.receiveMessage(action.payload);
        case 'MESSAGE_DELIVERED':
          return this.props.messageDelivered(action.payload);
        case 'USER_TYPING':
          return this.props.updateTypers(action.payload);
        default:
          console.log(action);
      }
    }
  }

  componentWillUnmount() {
    this.props.ws.close();
  }

  render() {
    return Children.only(this.props.children);
  }
}

WSProvider.propTypes = {
  messageDelivered: PropTypes.func.isRequired,
  receiveMessage: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  updateTypers: PropTypes.func.isRequired,
  ws: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  ws: state.websockets.ws,
});

export default connect(
  mapStateToProps,
  {
    messageDelivered,
    receiveMessage,
    registerUser,
    updateTypers,
  },
)(WSProvider);