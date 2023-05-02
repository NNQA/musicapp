import { Song } from '@/lib/utilts/model';
import { createSlice } from '@reduxjs/toolkit';
import {  SetPlayingAction, SetCurrentSongAction, SET_PLAYING, SET_CURRENT_SONG } from './features/Playerslice';

interface AudioPlayerState {
  playing: boolean;
  currentSong: Song | null;
}
const initialState: AudioPlayerState = {
  playing: false,
  currentSong: null,
};

type AudioPlayerAction = SetPlayingAction | SetCurrentSongAction;
function audioPlayerReducer(
  state: AudioPlayerState = initialState,
  action: AudioPlayerAction
): AudioPlayerState {
  switch (action.type) {
    case SET_PLAYING:
      return {
        ...state,
        playing: action.payload,
      };
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload,
      };
    default:
      return state;
  }
}

export const { setPlaying, resetState } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;