import { REGISTER_USER, UPDATE_HEAD_HEIGHT } from 'actions/types';

const ws = new WebSocket('ws://localhost:3001');

const initialState ={
  ws,
  id: null,
  channel: null,
  headHeight: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        ...action.payload,
      }
    case UPDATE_HEAD_HEIGHT:
      return {
        ...state,
        headHeight: action.payload,
      }
    default:
      return state;
  }
}