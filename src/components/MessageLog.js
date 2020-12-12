import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { receiveMessage } from 'actions/messages';
import { registerUser } from 'actions/websockets';
import { Message, TypeIndicator } from 'components';

const Container = styled.section`
  position: absolute;
  left: 0;
  top: ${props => props.topOffset}px;
  width: 100%;
  height: calc(100% - ${props => props.bottomOffset}px - ${props => props.topOffset}px);
  overflow: auto;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  padding-bottom: 3px;
  box-sizing: border-box;
`

Array.prototype.omniMap = function(callback) {
  var result = [],
      last = null,
      next = null;
  for (var i = 0; i < this.length; i++) {
    next = this[i + 1] || null;
    result.push(callback(i, last, this[i], next));
    last = this[i];
  }
  return result;
}

const CONTINUE_EXPIRE = 1000 * 30;

class MessageLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topOffset: this.props.topOffset,
      bottomOffset: this.props.bottomOffset,
      logCount: this.props.logCount,
    };
    
    this.bottomScroll = this.bottomScroll.bind(this);
  }

  componentDidMount() {
    this.observer = new MutationObserver(this.bottomScroll);
    this.observer.observe(this.list, {
      childList: true,
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.topOffset !== this.state.topOffset
      || nextProps.bottomOffset !== this.state.bottomOffset
      || nextProps.logCount !== this.state.logCount) {
      this.setState({
        topOffset: nextProps.topOffset,
        bottomOffset: nextProps.bottomOffset,
        logCount: nextProps.logCount,
      }, this.bottomScroll);
    } else if (nextProps.typers.length > 0) {
      setTimeout(this.bottomScroll, 200);
    }
  }

  bottomScroll() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  render() {
    const { typers, log } = this.props;
    return (
      <Container
        innerRef={r => this.container = r}
        topOffset={this.props.topOffset}
        bottomOffset={this.props.bottomOffset}
        >
        <List innerRef={r => this.list = r}>
          {log.omniMap((i, last, msg, next) => {
            const { data, ...metaData } = msg,
                  chainedLast = last === null ? false : last.from === msg.from && this.props.history[msg.from][msg.created_at].chained,
                  chainedNext = next === null ? false : next.from === msg.from && this.props.history[next.from][next.created_at].chained;
            return (
              <Message
                key={i}
                {...metaData}
                chainedLast={chainedLast}
                chainedNext={chainedNext}
                clientSent={msg.from === this.props.userId}
                last={i === log.length - 1}
                sent={msg.from === this.props.userId && !('received_at' in this.props.history[msg.from][msg.created_at])}
                delivered={this.props.lastDelivered === this.props.history[msg.from][msg.created_at].received_at}
                >
                {data}
              </Message>
            );
          })}
          <TypeIndicator show={typers.length > 0} lastReceived={this.props.lastReceived} />
        </List>
      </Container>
    );
  }
}

MessageLog.propTypes = {
  receiveMessage: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  ws: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  log: PropTypes.array.isRequired,
  logCount: PropTypes.number.isRequired,
  typers: PropTypes.array.isRequired,
  topOffset: PropTypes.number.isRequired,
  bottomOffset: PropTypes.number.isRequired,
  userId: PropTypes.string,
  lastDelivered: PropTypes.string.isRequired,
  lastSent: PropTypes.string.isRequired,
  lastReceived: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  ws: state.websockets.ws,
  history: state.messages.history,
  log: state.messages.log,
  logCount: state.messages.log.length,
  typers: Array.from(state.messages.typers),
  topOffset: state.websockets.headHeight,
  bottomOffset: state.messages.sendbarHeight,
  userId: state.websockets.id,
  lastDelivered: state.messages.lastDelivered,
  lastSent: state.messages.lastSent,
  lastReceived: state.messages.lastReceived,
});

export default connect(
  mapStateToProps,
  {
    receiveMessage,
    registerUser,
  },
)(MessageLog);