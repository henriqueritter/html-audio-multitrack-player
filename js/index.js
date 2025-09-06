const tracksCurrentTime = document.getElementById('tracksCurrentTime');
const tracksCurrentTimeLabel = document.getElementById(
  'tracksCurrentTimeLabel'
);
const loadTracksButton = document.getElementById('loadTracks');
const playTracksButton = document.getElementById('playTracks');
const pauseTracksButton = document.getElementById('pauseTracks');

const htmlTracksSection = document.getElementById('tracks');

let audioCtx;

const songInfo = {
  name: 'Música 1',
  currentTime: 0,
  duration: 0,
};

const tracks = [
  {
    id: 1,
    name: 'Click',
    isMuted: false,
    filePath: 'assets/click.mp3',
  },
  {
    id: 2,
    name: 'Click2',
    isMuted: false,
    volume: 0,
    filePath: 'assets/click.mp3',
  },
];

//https://pub-2ee020cd36f344d7aa50a37abdbf165b.r2.dev/Click.mp3

function playTracks() {
  if (!audioCtx) return;
  if (audioCtx.state != 'running') audioCtx.resume();

  for (const track of tracks) {
    if (track.audioElement.paused) track.audioElement.play();
  }
}

function pauseTracks() {
  if (!audioCtx) return;
  if (audioCtx.state != 'suspended') audioCtx.suspend();
}
//------
async function getAudioBufferFromFilePath(filepath) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

async function loadAudioTrackFromFilePath(filePath) {
  const trackBuffer = await getAudioBufferFromFilePath(filePath);
  return trackBuffer;
}
//---

function loadTracks() {
  loadTracksButton.disabled = true;
  loadTracksButton.hidden = true;
  document.getElementById('songName').innerText = 'Loading...';

  if (!audioCtx) {
    audioCtx = new AudioContext();
    audioCtx.suspend();
  }

  for (const track of tracks) {
    loadAudioTrackFromFilePath(track.filePath).then((trackBuffer) => {
      track.audioBuffer = trackBuffer;

      createTrackElement(track);

      if (track.audioElement) {
        track.audioElement.addEventListener('loadeddata', () => {
          if (songInfo.duration < track.audioElement.duration) {
            songInfo.duration = track.audioElement.duration.toFixed(2);

            tracksCurrentTime.setAttribute('max', songInfo.duration);
            document.getElementById('tracksTotalDuration').innerText =
              songInfo.duration;
          }
          track.audioElement.play();
        });
      }
    });
  }

  /*
  tracks[0].mediaElement.addEventListener('timeupdate', () => {
    songInfo.currentTime = tracks[0].mediaElement.audioBuffer.toFixed(2);

    tracksCurrentTimeLabel.innerText = songInfo.currentTime;
    tracksCurrentTime.value = songInfo.currentTime;
  });
  */

  tracksCurrentTime.addEventListener('input', () => {
    songInfo.currentTime = tracksCurrentTime.value;
    updateAllTracksTime(songInfo.currentTime);
  });

  tracksCurrentTime.hidden = false;
  playTracksButton.hidden = false;
  pauseTracksButton.hidden = false;
  document.getElementById('songName').innerText = songInfo.name;
}

function updateAllTracksTime(time = 0) {
  if (time > songInfo.duration || time < 0) return;

  tracksCurrentTimeLabel.innerText = songInfo.currentTime;
  tracksCurrentTime.value = songInfo.currentTime;

  for (const track of tracks) {
    track.audioElement.currentTime = songInfo.currentTime;
  }
}
