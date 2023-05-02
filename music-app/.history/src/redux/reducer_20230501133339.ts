import { Song } from '@/lib/utilts/model';
import { createSlice } from '@reduxjs/toolkit';
import {  SetPlayingAction, SetCurrentSongAction } from './features/Playerslice';

interface AudioPlayerState {
  playing: boolean;
  currentSong: Song | null;
}
const initialState: AudioPlayerState = {
  playing: false,
  currentSong: null,
};

type AudioPlayerAction = SetPlayingAction | SetCurrentSongAction;
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