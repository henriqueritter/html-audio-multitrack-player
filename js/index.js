const tracksCurrentTime = document.getElementById('tracksCurrentTime');
const loadTracksButton = document.getElementById('loadTracks');
const playTracksButton = document.getElementById('playTracks');
const pauseTracksButton = document.getElementById('pauseTracks');

const htmlTracksSection = document.getElementById('tracks');

let audioCtx;

const songInfo = {
  name: 'Música 1',
  duration: 0,
};

const tracks = [
  {
    id: 1,
    name: 'Click',
    filePath: 'assets/click.mp3',
  },
  {
    id: 2,
    name: 'Click2',
    filePath: 'assets/click.mp3',
  },
];

function playTracks() {
  if (!audioCtx) return;
  if (audioCtx.state != 'running') audioCtx.resume();
}

function pauseTracks() {
  if (!audioCtx) return;
  if (audioCtx.state != 'suspended') audioCtx.suspend();
}

function loadTracks() {
  loadTracksButton.disabled = true;

  if (!audioCtx) {
    audioCtx = new AudioContext();
    audioCtx.suspend();
  }

  for (const track of tracks) {
    createTrackElement(track);
    if (track.audioElement) {
      track.audioElement.addEventListener('loadeddata', () => {
        if (songInfo.duration < track.audioElement.duration)
          songInfo.duration = track.audioElement.duration;

        track.audioElement.play();
      });
    }
  }

  tracksCurrentTime.hidden = false;
  playTracksButton.hidden = false;
  pauseTracksButton.hidden = false;
}

function updateAllTracksTime(time = 0) {
  for (const track of tracks) {
    track.audioElement = time;
  }
}

function createAudioElement(track) {
  const { filePath } = track;
  const audioElement = document.createElement('audio');
  audioElement.setAttribute('src', filePath);
  audioElement.setAttribute('controls', '');
  track.audioElement = audioElement;
  track.mediaElement = new MediaElementAudioSourceNode(audioCtx, {
    mediaElement: audioElement,
  });

  track.volume = 1;
  track.gainNode = new GainNode(audioCtx);
  track.gainNode.gain.value = track.volume;

  track.pannerNode = new StereoPannerNode(audioCtx, { pan: 0 });

  track.mediaElement
    .connect(track.gainNode)
    .connect(track.pannerNode)
    .connect(audioCtx.destination);

  return audioElement;
}

function createTrackElement(track) {
  const { id, name } = track;

  const audioElement = createAudioElement(track);

  const htmlTrackElement = document.createElement('div');
  htmlTrackElement.setAttribute('id', id);
  htmlTrackElement.setAttribute('class', 'track');

  createHTMLTextElement(
    { parentHTMLElement: htmlTrackElement },
    { id, text: name, className: 'trackName' }
  );

  const { htmlMuteButton, htmlVolumeInput } = createTrackVolumeControls({
    parentHTMLElement: htmlTrackElement,
  });

  const { htmlTrackPannerElement } = createTrackAudioModifiersControls({
    parentHTMLElement: htmlTrackElement,
  });

  htmlMuteButton.addEventListener('click', () => {
    if (track.audioElement.muted) {
      track.audioElement.muted = false;
      track.gainNode.gain.value = track.volume;
      return;
    }
    track.audioElement.muted = true;
    track.gainNode.gain.value = 0;
    return;
  });

  htmlVolumeInput.addEventListener('input', () => {
    track.volume = htmlVolumeInput.value;
    if (!track.audioElement.muted) track.gainNode.gain.value = track.volume;
  });

  htmlTrackPannerElement.addEventListener('input', () => {
    track.pannerNode.pan.value = htmlTrackPannerElement.value;
  });

  htmlTrackElement.insertAdjacentElement('beforeend', audioElement);
  htmlTracksSection.insertAdjacentElement('beforeend', htmlTrackElement);
}
