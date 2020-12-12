import {
  MESSAGE_DELIVERED,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  TOGGLE_TYPING,
  UPDATE_TYPERS,
  UPDATE_SENDBAR_HEIGHT
} from 'actions/types';

const initialState = {
  log: [],
  history: {},
  lastDelivered: '',
  lastSent: '',
  lastReceived: '',
  typing: false,
  typers: new Set(),
  sendbarHeight: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_DELIVERED:
      var userHistory = state.history[action.payload.from] || {};
      userHistory[action.payload.created_at] = action.payload;
      state.history[action.payload.from] = userHistory;
      return {
        ...state,
        history: state.history,
        lastDelivered: action.payload.received_at,
      };
    case RECEIVE_MESSAGE:
      var userHistory = state.history[action.payload.from] || {};
      userHistory[action.payload.created_at] = action.payload;
      state.history[action.payload.from] = userHistory;
      return {
        ...state,
        log: [...state.log, action.payload],
        history: state.history,
        lastReceived: action.payload.received_at,
      }
    case SEND_MESSAGE:
      var userHistory = state.history[action.payload.from] || {};
      userHistory[action.payload.created_at] = action.payload;
      state.history[action.payload.from] = userHistory;
      return {
        ...state,
        log: [...state.log, action.payload],
        history: state.history,
        lastSent: action.payload.created_at,
      }
    case TOGGLE_TYPING:
      return {
        ...state,
        typing: action.payload.typing
      }
    case UPDATE_TYPERS:
      const { typing, user } = action.payload;
      if (typing) {
        state.typers.add(user);
      } else {
        state.typers.delete(user);
      }
      return {
        ...state,
        typers: state.typers,
      };
    case UPDATE_SENDBAR_HEIGHT:
      return {
        ...state,
        sendbarHeight: action.payload,
      }
    default:
      return state;
  }
}