interface Song = {
    id: string;
    title: string;
    description?: string;
    authorId: string;
    image?: string;
    audio?: string;
    date: string; // you may need to update the date format to match what the server sends
    author: {
      id: string;
      // add any other properties as needed
    };
  };