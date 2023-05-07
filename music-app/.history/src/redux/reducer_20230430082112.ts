interface AppState {
  currentIndex: number;
}

interface SetCurrentIndexAction {
  type: "SET_CURRENT_INDEX";
  payload: {
    index: number;
  };
}
type AppAction = SetCurrentIndexAction;

const initialState: AppState = {
  currentIndex: 0,
};
const reducer = () => {
  switch (action.type) {
    case "SET_CURRENT_INDEX":
      return {
        ...state,
        currentIndex: action.payload.index,
      };
    default:
      return state;
  }
}
export default reducer