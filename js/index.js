const tracksCurrentTime = document.getElementById('tracksCurrentTime');
const playTracksButton = document.getElementById('playTracks');
const pauseTracksButton = document.getElementById('pauseTracks');

const htmlTracksSection = document.getElementById('tracks');

let audioCtx;

const tracks = [
  {
    id: 1,
    name: 'Click',
    filePath: 'assets/click.mp3',
  },
];

function loadTracks() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  for (track of tracks) {
    createTrackElement(track);
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

  track.mediaElement.connect(track.gainNode).connect(audioCtx.destination);

  return audioElement;
}

function createTrackElement(track) {
  const { id, name, filePath } = track;

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

  htmlVolumeInput.addEventListener('input', () => {
    console.log(htmlVolumeInput.value);
  });

  const { htmlTrackPannerElement } = createTrackAudioModifiersControls({
    parentHTMLElement: htmlTrackElement,
  });

  htmlTrackElement.insertAdjacentElement('beforeend', audioElement);
  htmlTracksSection.insertAdjacentElement('beforeend', htmlTrackElement);
}
