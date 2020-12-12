import React, { Component } from 'react';
import styled, { extend } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendMessage, toggleTyping, updateSendBarHeight } from 'actions/messages';
import { blue, disabled, fontSize, outlineGray, radiusMd, radiusLg, latoFont, white } from 'style/constants';
import { newlineResolver } from 'utils';

const Container = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
`;

const TextBox = styled.textarea`
  width: 100%;
  height: ${props => props.height}px;
  resize: none;
  overflow: hidden;
  padding: 8px 12px;
  padding-right: 42px;
  box-sizing: border-box;
  font-family: ${latoFont};
  font-size: ${fontSize};
  line-height: 18px;
  vertical-align: middle;
  background-color: ${white};
  outline: none;
  border: 1px solid ${outlineGray};
  border-radius: ${radiusMd};
  border-top-right-radius: ${radiusLg};
  border-bottom-right-radius: ${radiusLg};
  caret-color: ${blue};
`;

const ShadowInput = styled.div`
  border: 1px solid black;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  padding: 8px 12px;
  padding-right: 42px;
  box-sizing: border-box;
  font-family: ${latoFont};
  font-size: ${fontSize};
  line-height: 18px;
  vertical-align: middle;
  min-height: ${props => props.minHeight}px;
  pointer-events: none;
  word-wrap: break-word;
  text-wrap: unrestricted;
  visibility: hidden;
`;

const Submit = styled.div`
  position: absolute;
  top: 6px;
  right: 10px;
  width: 26px;
  height: 26px;
  background-color: ${props => props.clickable ? blue : disabled};
  border-radius: 50%;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3px;
  height: 14px;
  border-radius: 1px;
  background-color: ${white};

  &::before, &::after {
    content: '';
    position: absolute;
    background-color: ${white};
  }

  &::before {
    left: 0;
    top: 0;
    width: 2px;
    height: 8px;
    border-radius: 1px;
    transform-origin: top center;
    transform: rotate(45deg) translate(0px, 1px);
  }

  &::after {
    left: 0;
    top: 0;
    width: 8px;
    height: 2px;
    border-radius: 1px;
    transform-origin: top center;
    transform: rotate(45deg) translate(3px, 1px);
  }
`

class SendBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      defaultHeight: 38,
      height: 38,
      scrollbarPresent: false,
      fontSize: parseInt(fontSize),
    };

    this.typeTimeout = null;
    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.newLineHandler = this.newLineHandler.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
  }

  componentDidMount() {
    const { message } = this.state;
    this.textBox.focus();
    this.updateHeight(this.state.height
      + (message.length <= 0
        ? 0
        : this.state.fontSize * JSON.stringify(message).split(/\r\n|\r|\n/).length));
  }

  sendMessage(e) {
    e.preventDefault();
    const { message } = this.state;
    if (message.trim().length > 0) {
      clearTimeout(this.typeTimeout);
      this.typeTimeout = null;
      const msg = {
        from: this.props.userId,
        data: message,
        created_at: Date.now().toString(),
      };
      this.props.sendMessage(msg);
      this.setState({
        message: '',
      }, () => {
        this.textBox.focus();
      });
    }
  }

  updateHeight(height, callback) {
    this.setState({
      height: height,
    }, () => {
      this.props.updateSendBarHeight(this.container.offsetHeight);
      if (callback) callback();
    });
  }

  updateMessage(e) {
    const { value } = e.target;
    if (value.trim().length <= 0) {
      clearTimeout(this.typeTimeout);
      this.typeTimeout = setTimeout(() => {
        this.typeTimeout = null;
        this.props.toggleTyping(false);
      }, 500);
      this.updateHeight(this.state.defaultHeight);
    } else if (!this.props.typing && this.typeTimeout === null) {
      clearTimeout(this.typeTimeout);
      this.typeTimeout = setTimeout(() => {
        this.typeTimeout = null;
        this.props.toggleTyping(true);
      }, 250);
    }
    this.setState({
      message: value,
    }, () => {
      const shadowHeight = this.shadowInput.offsetHeight;
      if (shadowHeight !== this.state.height) {
        this.updateHeight(shadowHeight, () => {
          this.setState({
            scrollbarPresent: this.textBox.clientHeight < this.textBox.scrollHeight,
          });
        });
      }
    });
  }

  newLineHandler(e) {
    if (e.keyCode === 13) {
      if (e.shiftKey) {
        this.updateHeight(this.state.height + this.state.fontSize);
      } else {
        this.sendMessage(e);
        this.updateHeight(this.state.defaultHeight);
      }
    }
  }

  render() {
    const { message } = this.state;
    return (
      <Container innerRef={r => this.container = r}>
        <Wrapper>
          <ShadowInput
            innerRef={r => this.shadowInput = r}
            minHeight={this.state.defaultHeight}
            scrollbarPresent={this.state.scrollbarPresent}
            >
            {newlineResolver(message)}
          </ShadowInput>
          <TextBox
            innerRef={r => this.textBox = r}
            placeholder="nMessage"
            value={message}
            onChange={this.updateMessage}
            onKeyDown={this.newLineHandler}
            height={this.state.height}
            />
          <Submit onClick={this.sendMessage} clickable={message.trim().length > 0}>
            <Arrow />
          </Submit>
        </Wrapper>
      </Container>
    );
  }
}

SendBar.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  toggleTyping: PropTypes.func.isRequired,
  updateSendBarHeight: PropTypes.func.isRequired,
  typing: PropTypes.bool.isRequired,
  userId: PropTypes.string,
};

const mapStateToProps = state => ({
  typing: state.messages.typing,
  userId: state.websockets.id,
})

export default connect(
  mapStateToProps,
  {
    sendMessage,
    toggleTyping,
    updateSendBarHeight,
  },
)(SendBar);