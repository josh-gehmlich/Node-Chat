import { CONNECT_TO_SERVER, REGISTER_USER, UPDATE_HEAD_HEIGHT } from 'actions/types';

export const connectToServer = () => (dispatch, getState) => {
  const { ws } = getState().websockets;
  ws.onopen = () => {
    console.log('Connected to websockets!');
  }
  dispatch({
    type: CONNECT_TO_SERVER,
    payload: ws,
  });
};

export const registerUser = user => (dispatch, getState) => {
  dispatch({
    type: REGISTER_USER,
    payload: user,
  });
}

export const updateHeadHeight = height => dispatch => {
  dispatch({
    type: UPDATE_HEAD_HEIGHT,
    payload: height,
  });
}