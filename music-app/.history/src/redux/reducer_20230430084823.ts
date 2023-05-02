import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  audio: null,
  playing: false,
  volume: 1,
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    resetState: (state) => {
      state.audio = null;
      state.playing = false;
      state.volume = 1;
    },
  },
});

export const { setAudio, setPlaying, setVolume, resetState } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;