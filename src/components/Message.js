import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { black, blueGrayMixin, fontSize, radiusMd, radiusSm, latoFont, white } from 'style/constants';
import { newlineResolver } from 'utils';

const Container = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-${props => props.clientSent ? 'end': 'start'};
  margin-bottom: ${props => props.last ? '2px' : props.chainedNext ? '2px' : '6px'};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 75%;
  align-items: flex-${props => props.clientSent ? 'end': 'start'};
`;

const Bubble = styled.div`
  padding: 6px 12px 8px;
  box-sizing: border-box;
  font-family: ${latoFont};
  font-size: ${fontSize};
  line-height: 18px;
  vertical-align: middle;
  word-break: break-word;
  border-radius: ${radiusMd};
  ${props => props.chainedLast && css`
    border-top-${props => props.clientSent ? 'right': 'left'}-radius: ${radiusSm};
  `}
  ${props => props.chainedNext && css`
    border-bottom-${props => props.clientSent ? 'right': 'left'}-radius: ${radiusSm};
  `}
  ${props => blueGrayMixin(props.clientSent)}
  color: ${props => props.clientSent ? white : black};
`;

const SubMessage = styled.p`
  font-size: 12px;
  line-height: 12px;
  color: #9f9f9f;
  font-family: ${latoFont};
  padding-top: 4px;
  transform-origin: 50% 50%;
  transition: 0.2s ease-in-out;
  transform: translateY(-6px) scale(0);
  margin-bottom: -16px;

  ${props => props.show && css`
    margin-bottom: 0;
    transform: translateY(0px) scale(1);
  `}
`;

class Message extends Component {
  render() {
    const { last, clientSent, chainedLast, chainedNext, created_at, received_at, delivered, sent } = this.props;
    return (
      <Container
        clientSent={clientSent}
        chainedNext={chainedNext}
        last={last}
        >
        <Wrapper clientSent={clientSent}>
          <Bubble
            clientSent={clientSent}
            chainedLast={chainedLast}
            chainedNext={chainedNext}
            >
            {newlineResolver(this.props.children)}
          </Bubble>
          {clientSent && <SubMessage show={delivered}>Delivered</SubMessage>}
        </Wrapper>
      </Container>
    );
  }
}

export default Message;