async function getSongAndTracksData() {
  //const response = await fetch(
  //    'https://pub-2ee020cd36f344d7aa50a37abdbf165b.r2.dev/%0Amultitrack-getworship-umnovodia.json.json'
  //  );
  //const { data } = await response.json();

  const data = {
    songInfo: {
      name: 'Um novo dia',
      author: 'Get Worship',
      currentTime: 0,
      duration: 0,
      elapsedTime: 0,
    },
    tracks: [
      {
        id: 1,
        name: 'Musica',
        filePath: 'assets/MinhaAlma.mp3',
      },
      {
        id: 1,
        name: 'Click',
        filePath: 'assets/click.mp3',
        isMuted: true,
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

function trackAudioContextCurrentTime(currentTime, callback, interval = 1000) {
  return setInterval(() => {
    callback(currentTime);
  }, interval);
}
