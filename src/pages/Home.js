import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Head, MessageLog, SendBar } from 'components';
import { H1 } from 'style';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100%;
`;

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Container>
          <Head />
          <MessageLog />
          <SendBar />
        </Container>
      </Fragment>
    );
  }
}

export default Home;