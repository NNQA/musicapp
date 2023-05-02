import { Song } from '@/lib/utilts/model';
import { createSlice } from '@reduxjs/toolkit';

interface AudioPlayerState {
  playing: boolean;
  currentSong: Song | null;
}
const initialState: AudioPlayerState = {
  playing: false,
  currentSong: null,
};

const SET_PLAYING = "SET_PLAYING";
const SET_CURRENT_SONG = "SET_CURRENT_SONG";

interface SetPlayingAction {
  type: typeof SET_PLAYING;
  payload: boolean;
}

interface SetCurrentSongAction {
  type: typeof SET_CURRENT_SONG;
  payload: Song | null;
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