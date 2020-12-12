import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateHeadHeight } from 'actions/websockets';
import PropTypes from 'prop-types';
import { black, latoFont, outlineGray, white } from 'style/constants';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 20px 12px;
  box-sizing: border-box;
  border-bottom: 1px solid ${outlineGray};
  background-color: ${white};
  z-index: 100;
`;

const Title = styled.h1`
  font-family: ${latoFont};
  font-size: 20px;
  font-weight: 600;
  color: ${black};
  margin-bottom: 2px;

  &::before {
    content: '#';
  }
`;

const Description = styled.p`
  font-family: ${latoFont};
  font-size: 16px;
  font-weight: 400;
  color: #aaa;
`;

const Stats = styled.ul`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

const Stat = styled.li`
  font-family: ${latoFont};
  font-size: 12px;
  font-weight: 400;
  color: #666;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
`

class Head extends Component {
  componentDidUpdate() {
    this.props.updateHeadHeight(this.container.offsetHeight);
  }

  render() {
    let { channel } = this.props;
    return (
      <Container innerRef={r => this.container = r}>
        {channel && (
          <Fragment>
            <Title>{channel.name}</Title>
            <Description>{channel.description}</Description>
            <Stats>
              <Stat>{channel.users.length} members</Stat>
            </Stats>
          </Fragment>
        )}
      </Container>
    );
  }
}

Head.propTypes = {
  updateHeadHeight: PropTypes.func.isRequired,
  channel: PropTypes.object,
};

const mapStateToProps = state => ({
  channel: state.websockets.channel,
});

export default connect(mapStateToProps, { updateHeadHeight })(Head);