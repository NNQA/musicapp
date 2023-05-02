import { Song } from '@/lib/utilts/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetPlayingAction, SetCurrentSongAction } from './features/Playerslice';

interface AudioPlayerState {
  playing: boolean;
  currentSong: Song | null;
}
const initialState: AudioPlayerState = {
  playing: false,
  currentSong: null,
};

function audioPlayerReducer(
  state: AudioPlayerState = initialState,
  action: SetPlayingAction | SetCurrentSongAction
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