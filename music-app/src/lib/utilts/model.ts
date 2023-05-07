export interface User {
  id: string;
  name: string;
  image?: string;
  email?: string;
  hashedPassword?: string;
  songs: Song[];
  likes: Like[];
  comments: Comment[];
}

export interface Song {
  id: string;
  title: string;
  description?: string;
  authorId: string;
  image?: string;
  audio?: string;
  date: Date;
  likes: Like[];
  comments: Comment[];
  author: User;
}

export interface Comment {
  id: string;
  userId: string;
  songId: string;
  text?: string;
  user: User;
  song: Song;
}

export interface Like {
  id: string;
  userId: string;
  songId: string;
  user: User;
  song: Song;
}
export interface Playlist {
  id: string;
  title: string;
  img?: string | null;
  userId: string;

  user: User; // Assuming you have a separate `User` interface defined
}
export interface Playlist_Song {
  id: string;
  songId: string;
  playlistId: string;

  song: Song;
  playlist: Playlist;
}
