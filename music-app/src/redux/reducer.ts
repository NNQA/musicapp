import { Song } from "@/lib/utilts/model";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AudioPlayerState {
  playing: boolean;
  currentSong: Song | null;
  appear: boolean;
  songs: Song[];
  currentSongIndex: number;
  isLoading: boolean;
  error: string | null;
}
const initialState: AudioPlayerState = {
  playing: false,
  currentSong: null,
  appear: false,
  songs: [],
  currentSongIndex: 0,
  isLoading: false,
  error: null,
};

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    setNextSong: (state, action) => {
      if (state.currentSongIndex < state.songs.length - 1) {
        state.currentSongIndex = action.payload;
        state.currentSong = state.songs[state.currentSongIndex];
      }
    },
    setPreSong: (state, action) => {
      if (action.payload > -1) {
        state.currentSongIndex = action.payload;
        state.currentSong = state.songs[state.currentSongIndex];
      }
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setCurrentSong: (state, action) => {
      const songId = action.payload.id;
      state.currentSong = action.payload;
      state.currentSongIndex = state.songs.findIndex((song) => song.id === songId);
    },
    setAppeat: (state, action) => {
      state.appear = action.payload;
    },
    resetState: (state) => {
      state.playing = false;
    },
    setSong: (state, action) => {
      state.songs = action.payload;
      console.log(state.songs);
    },
  },
});

export const { setPlaying, setCurrentSong, setSong,setPreSong, setNextSong,setAppeat, resetState } =
  audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
