const songNameElement = document.getElementById('songName');
const tracksCurrentTime = document.getElementById('tracksCurrentTime');
const tracksCurrentTimeLabel = document.getElementById(
  'tracksCurrentTimeLabel'
);
const tracksTotalDurationLabel = document.getElementById('tracksTotalDuration');
const loadTracksButton = document.getElementById('loadTracks');
const playTracksButton = document.getElementById('playTracks');
const pauseTracksButton = document.getElementById('pauseTracks');
const stopTracksButton = document.getElementById('stopTracks');
const htmlTracksSection = document.getElementById('tracks');

const interval = 250;

let audioCtx;
let contextCurrentTime;

let songInfo = {
  name: 'Nome da Música',
  currentTime: 0,
  duration: 0,
  elapsedTime: 0,
};

let tracks = [];

window.onload = () => {
  getSongAndTracksData().then((data) => {
    songInfo = data.songInfo;
    tracks = data.tracks;
  });
};

function playTracks() {
  if (!audioCtx) return;
  if (audioCtx.state == 'running') return;

  audioCtx.resume();

  contextCurrentTime = trackAudioContextCurrentTime(
    songInfo,
    (songInfo) => {
      songInfo.elapsedTime = songInfo.elapsedTime + interval / 1000;

      if (songInfo.elapsedTime >= songInfo.duration) {
        songInfo.elapsedTime = parseFloat(songInfo.duration);
        audioCtx.suspend();
        clearInterval(contextCurrentTime);
      }

      tracksCurrentTimeLabel.innerText = songInfo.elapsedTime.toFixed(2);
      tracksCurrentTime.value = songInfo.elapsedTime.toFixed(2);
    },
    interval
  );

  if (songInfo.initialized) return;

  let offset = audioCtx.currentTime;

  for (const track of tracks) {
    if (!track.isPlaying) startTrack(audioCtx.currentTime - offset, track);
  }

  songInfo.initialized = true;
}

function pauseTracks() {
  if (!audioCtx) return;
  if (audioCtx.state != 'suspended') audioCtx.suspend();

  clearInterval(contextCurrentTime);
}

async function loadTracks() {
  loadTracksButton.disabled = true;
  loadTracksButton.innerText = 'Loading...';
  songNameElement.innerText = 'Loading...';

  if (!audioCtx) {
    audioCtx = new AudioContext();
    audioCtx.suspend();
  }

  const loadTracksBufferPromises = tracks.map((track) => loadAudioTrack(track));
  await Promise.all(loadTracksBufferPromises);

  songInfo.elapsedTime = 0;

  for (const track of tracks) {
    createTrackElement(track);

    if (track.audioBuffer) {
      if (songInfo.duration < track.audioBuffer.duration) {
        songInfo.duration = track.audioBuffer.duration.toFixed(2);

        tracksCurrentTime.setAttribute('max', songInfo.duration);
        tracksTotalDurationLabel.innerText = songInfo.duration;
      }
    }
  }

  tracksCurrentTime.addEventListener('input', (e) => updateAllTracksTime(e));

  tracksCurrentTime.hidden = false;
  playTracksButton.hidden = false;
  pauseTracksButton.hidden = false;
  stopTracksButton.hidden = false;
  loadTracksButton.hidden = true;
  songNameElement.innerText = songInfo.name;
}

function updateAllTracksTime(event) {
  const time = event.target.value;

  let offset = time;
  songInfo.elapsedTime = parseFloat(offset);

  for (const track of tracks) {
    track.mediaElement.stop();
    track.mediaElement.disconnect();

    track.mediaElement = new AudioBufferSourceNode(audioCtx, {
      buffer: track.audioBuffer,
    });

    startTrack(offset, track);
  }
}

function startTrack(offset, track) {
  track.mediaElement.start(0, offset);
  track.mediaElement
    .connect(track.gainNode)
    .connect(track.pannerNode)
    .connect(audioCtx.destination);
}
