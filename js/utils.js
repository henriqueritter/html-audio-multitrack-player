async function getSongAndTracksData() {
  /*const response = await fetch(
    'https://pub-2ee020cd36f344d7aa50a37abdbf165b.r2.dev/%0Amultitrack-getworship-umnovodia.json.json'
  );*/
  //const { data } = await response.json();

  const data = {
    songInfo: {
      name: 'Um novo dia',
      author: 'Get Worship',
      currentTime: 0,
      duration: 0,
    },
    tracks: [
      {
        id: 1,
        name: 'Música',
        filePath: 'assets/click.mp3',
      },
    ],
  };

  if (!data) return 'Response is empty.';

  return data;
}

async function getAudioBufferFromFilePath(filepath) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

async function loadAudioTrack(track) {
  const trackBuffer = await getAudioBufferFromFilePath(track.filePath);
  track.audioBuffer = trackBuffer;
  return;
}

function trackAudioContextCurrentTime(audioCtx, callback, interval = 1000) {
  return setInterval(() => {
    callback(audioCtx.currentTime);
  }, interval);
}
