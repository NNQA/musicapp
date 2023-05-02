import { Song } from '@/lib/utilts/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
If you're still having issues, try adding console logs to your code to help debug the issue.





User
?? in pre-code u design for me in reducer is slice? what's above code ?
ChatGPT
The code I provided earlier is using the createSlice function from the Redux Toolkit library, which is a utility that helps you write Redux code faster and with less boilerplate.

The code you posted earlier is not using createSlice but is instead manually defining the actions and reducer functions. This is also a valid way to write Redux code, but it requires more manual setup.

Both approaches achieve the same thing, and the choice between them comes down to personal preference and the needs of your specific project. The Redux Toolkit approach can help make your code more concise and easier to read, while the manual approach can give you more flexibility and control over your code.





User
import { Song } from '@/lib/utilts/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AudioPlayerState {
  playing: boolean;
  currentSong: Song | null;
}
const initialState: AudioPlayerState = {
  playing: false,
  currentSong: null,
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setCurrentSong: (state, action) => {
      console.log(action.payload);
      state.currentSong = action.payload;
    },
    resetState: (state) => {
      state.playing = false;
    },
  },
});

export const { setPlaying, resetState } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;so convert it to like your above code
ChatGPT
Here is the code with the combined function as well as the export statement:

typescript
Copy code
import { Song } from '@/lib/utilts/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AudioPlayerState {
  playing: boolean;
  currentSong: Song | null;
}
const initialState: AudioPlayerState = {
  playing: false,
  currentSong: null,
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setCurrentSong: (state, action) => {
      console.log(action.payload);
      state.currentSong = action.payload;
    },
    resetState: (state) => {
      state.playing = false;
    },
  },
});

export const { setPlaying, setCurrentSong, resetState } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;

export const handlePlayClick = (song: Song, playing: boolean, audioRef: HTMLAudioElement | null, dispatch: any, currentSong: Song | null) => {
  if (song === currentSong) {
    if (audioRef?.paused) {
      audioRef?.play();
    } else {
      audioRef?.pause();
    }
    dispatch(setPlaying(!playing));
  } else {
    dispatch(setCurrentSong(song));
    dispatch(setPlaying(true));
    audioRef?.play()
  }
};
You can call the function handlePlayClick with the required parameters, including the dispatch function that comes from the react-redux library.








export const { setPlaying, resetState } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;