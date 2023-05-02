


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