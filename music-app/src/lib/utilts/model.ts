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
