import { Song } from "@/lib/utilts/model";


export const SET_PLAYING = "SET_PLAYING";
export const SET_CURRENT_SONG = "SET_CURRENT_SONG";

export interface SetPlayingAction {
  type: typeof SET_PLAYING;
  payload: boolean;
}

export interface SetCurrentSongAction {
  type: typeof SET_CURRENT_SONG;
  payload: Song | null;
}
export function setPlaying(playing: boolean): SetPlayingAction {
  return {
    type: SET_PLAYING,
    payload: playing,
  };
}

export function setCurrentSong(song: Song | null): SetCurrentSongAction {
  return {
    type: SET_CURRENT_SONG,
    payload: song,
  };
}