interface AppState {
    currentIndex: number;
  }
  
  interface SetCurrentIndexAction {
    type: 'SET_CURRENT_INDEX';
    payload: {
      index: number;
    };
  }