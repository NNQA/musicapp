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
    setAudio: (state, action) => {
      state.audio = new Audio(action.payload);
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
      if (state.audio) {
        state.audio.volume = action.payload;
      }
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