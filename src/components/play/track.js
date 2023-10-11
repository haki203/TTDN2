var track1 = {
    url: 'http://example.com/avaritia.mp3', // Load media from the network
    title: 'Avaritia',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork: 'http://example.com/cover.png', // Load artwork from the network
    duration: 402 // Duration in seconds
};

const track2 = {
    url: require('./coelacanth.ogg'), // Load media from the app bundle
    title: 'Coelacanth I',
    artist: 'deadmau5',
    artwork: require('./cover.jpg'), // Load artwork from the app bundle
    duration: 166
};

const track3 = {
    url: 'file:///storage/sdcard0/Downloads/iceage.mp3', // Load media from the file system
    title: 'Ice Age',
    artist: 'deadmau5',
     // Load artwork from the file system:
    artwork: 'file:///storage/sdcard0/Downloads/cover.png',
    duration: 411
};

// You can then [add](https://rntp.dev/docs/api/functions/queue#addtracks-insertbeforeindex) the items to the queue
await TrackPlayer.add([track1, track2, track3]);