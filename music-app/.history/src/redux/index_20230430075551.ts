import { legacy_createStore as createStore} from 'redux'

interface AppState {
  currentIndex: number;
}

interface SetCurrentIndexAction {
  type: 'SET_CURRENT_INDEX';
  payload: {
    index: number;
  };
}

type AppAction = SetCurrentIndexAction;

const initialState: AppState = {
  currentIndex: 0,
};

// Define the reducer function
function reducer(state = initialState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CURRENT_INDEX':
      return {
        ...state,
        currentIndex: action.payload.index,
      };
    default:
      return state;
  }
}

// Create the store
const store = createStore(reducer);

export default store;
