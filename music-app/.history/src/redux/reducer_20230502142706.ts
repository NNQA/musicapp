import { Song } from '@/lib/utilts/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AudioPlayerState {
  playing: boolean;
  currentSong: Song | null;
  duration: number;
  appear: boolean;
}
const initialState: AudioPlayerState = {
  playing: false,
  currentSong: null,
  duration: 0,
  appear: false,
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
    setAppeat: (state, action) => {
      state.appear =  action.payload;
    }
    ,
    resetState: (state) => {
      state.playing = false;
    },
  },
});

export const { setPlaying,setCurrentSong,setDuration, resetState } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;