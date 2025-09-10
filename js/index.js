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

let audioCtx;
let contextCurrentTime;

let songInfo = {
  name: 'Nome da Música',
  currentTime: 0,
  duration: 0,
};

let tracks = [
  {
    id: 1,
    name: 'Click',
    filePath: 'assets/click.mp3',
    audioBuffer: {},
    mediaElement: {},
    volume: 1,
    gainNode: {},
    pannerNode: {},
    isMuted: false,
    startAt: 0,
    pausedAt: 0,
    isPlaying: false,
    duration: '467.45',
  },
];

window.onload = () => {
  getSongAndTracksData().then((data) => {
    songInfo = data.songInfo;
    tracks = data.tracks;
  });
};

function playTracks() {
  if (!audioCtx) return;
  if (audioCtx.state != 'running') audioCtx.resume();

  let offset = audioCtx.currentTime;

  for (const track of tracks) {
    if (!track.isPlaying)
      track.mediaElement.start(0, audioCtx.currentTime - offset);
  }

  contextCurrentTime = trackAudioContextCurrentTime(
    audioCtx,
    (currentTime) => {
      songInfo.currentTime = currentTime.toFixed(2);

      tracksCurrentTimeLabel.innerText = songInfo.currentTime;
      tracksCurrentTime.value = songInfo.currentTime;
    },
    200
  );
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

  tracksCurrentTime.addEventListener('input', () => {
    //get time from input range
    songInfo.currentTime = tracksCurrentTime.value;
    //stop and clean all tracks element
    //calculate target time using audioCtx current time and offset
    //start all tracks element with the calculated time
    //updateAllTracksTime(songInfo.currentTime);
  });

  tracksCurrentTime.hidden = false;
  playTracksButton.hidden = false;
  pauseTracksButton.hidden = false;
  stopTracksButton.hidden = false;
  loadTracksButton.hidden = true;
  songNameElement.innerText = songInfo.name;
}

function updateAllTracksTime(time = 0) {
  if (time > songInfo.duration || time < 0) return;

  tracksCurrentTimeLabel.innerText = songInfo.currentTime;
  tracksCurrentTime.value = songInfo.currentTime;

  for (const track of tracks) {
    track.audioElement.currentTime = songInfo.currentTime;
  }
}
