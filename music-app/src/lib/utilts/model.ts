export interface Song {
  id: string;
  title: string;
  description?: string;
  authorId: string;
  image?: string;
  audio?: string;
  date: string;
  likes: Like[];
  author: User;
}

export interface Like {
  id: string;
  userId: string;
  songId: string;
  user: User;
  song: Song;
}

export interface User {
  id: string;
  name: string;
  image?: string;
  email?: string;
  hashedPassword?: string;
  songs: Song[];
}