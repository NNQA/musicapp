import { createSlice } from '@reduxjs/toolkit';

interface AudioPlayerState {
  playing: boolean;
  currentSong: Song | null;
}

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    resetState: (state) => {
      state.playing = false;
    },
  },
});

export const { setPlaying, resetState } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;