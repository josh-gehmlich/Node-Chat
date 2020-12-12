import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { black, blueGrayMixin, outlineGray, white } from 'style/constants';

const Container = styled.div.attrs({
  className: 'type-indicator',
})`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  box-sizing: border-box;
  padding: 7px 12px;
  margin-bottom: 2px;
  color: ${props => props.clientSent ? white : black};
  ${blueGrayMixin(false)}
  border-radius: 17px;
  position: relative;
  transform-origin: 10px 10px;
  transform: scale(0);
  margin-bottom: -32px;
  
  ${props => props.hideAnim && css`
    transition: 0.2s cubic-bezier(0.25,-0.15, 0, 1.09);
  `}

  ${props => props.show && css`
    margin-bottom: 0;
    transform: scale(1);
    transition: 0.2s cubic-bezier(0.25,-0.15, 0, 1.09);
  `}

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    ${blueGrayMixin(false)}
    border-radius: 50%;
    width: 14px;
    height: 14px;
    transform: translate(-1px, 1px);
  }
`;

const dotPulse = keyframes`
  0% {
    background-color: ${outlineGray};
  }
  50% {
    background-color: #d0d0d0;
  }
  100% {
    background-color: ${outlineGray};
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${outlineGray};
  margin: 4px 0;
  margin-right: 5px;
  border-radius: 50%;
  animation: ${dotPulse} 1s ${props => props.delay}s ease-in-out infinite;

  &:last-child {
    margin-right: 0;
  }
`;

class TypeIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previous: this.props.lastReceived,
      lastReceived: this.props.lastReceived,
      hideAnim: true,
      updated: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.lastReceived !== nextProps.lastReceived) {
      this.setState({
        lastReceived: nextProps.lastReceived,
        hideAnim: false,
        updated: true,
      })
    } else if (this.state.lastReceived !== this.state.previous) {
      this.setState({
        previous: this.state.lastReceived,
        hideAnim: true,
      });
    } else if (this.state.updated) {
      this.setState({
        updated: false,
      })
    }
  }

  render() {
    return (
      <Container
        show={this.props.show}
        hideAnim={this.state.hideAnim && this.state.lastReceived === this.state.previous && !this.state.updated}
        >
        {[0, 1, 2].map(i => (
          <Dot key={i} delay={i / 3} />
        ))}
      </Container>
    );
  }
}

export default TypeIndicator;