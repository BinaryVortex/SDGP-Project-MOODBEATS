// Song data model
const song = {
    id: '1',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    duration: 263, // in seconds (4:23)
    albumArt: require('../assets/song-cover.jpg'),
    audioFile: 'perfect.mp3',
    lyrics: [
      {
        line: 'Barefoot on the grass,',
        startTime: 15,
        endTime: 19,
      },
      {
        line: 'oh, listenin\' to our favourite song',
        startTime: 19,
        endTime: 25,
      },
      {
        line: 'I have faith in what I see, now I know I have met',
        startTime: 25,
        endTime: 33,
      },
      {
        line: 'An angel in person, and she looks perfect',
        startTime: 33,
        endTime: 41,
      },
      {
        line: 'Though I don\'t deserve this, you look perfect tonight',
        startTime: 41,
        endTime: 50,
      },
      // Additional lyrics would be added here
    ],
    color: '#80080', // Approx. deep burgundy color
  };
  
  export default song;