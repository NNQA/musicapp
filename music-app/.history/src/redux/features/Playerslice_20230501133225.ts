import { Song } from "@/lib/utilts/model";


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