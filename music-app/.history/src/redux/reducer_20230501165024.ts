import { Song } from '@/lib/utilts/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AudioPlayerState {
  playing: boolean;
  currentSong: Song | null;
  duration: number;
}
const initialState: AudioPlayerState = {
  playing: false,
  currentSong: null,
  duration: 0,
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    resetState: (state) => {
      state.playing = false;
    },
  },
});

export const { setPlaying,setCurrentSong, resetState } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;