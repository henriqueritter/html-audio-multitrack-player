function createTrackElement(track) {
  const { id, name } = track;

  track.isMuted = false;

  const audioElement = createAudioElement(track);

  const htmlTrackElement = document.createElement('div');
  htmlTrackElement.setAttribute('id', id);
  htmlTrackElement.setAttribute('class', 'track');

  htmlTrackElement.insertAdjacentElement(
    'beforeend',
    createHTMLTextElement({ id, text: name, className: 'trackName' })
  );

  const { htmlTrackVolumeControlsElement, htmlMuteButton, htmlVolumeInput } =
    createTrackVolumeControls();

  htmlTrackElement.insertAdjacentElement(
    'beforeend',
    htmlTrackVolumeControlsElement
  );

  const { htmlTrackPannerElement, htmlTrackAudioModifiersControlsElement } =
    createTrackAudioModifiersControls();

  htmlTrackElement.insertAdjacentElement(
    'beforeend',
    htmlTrackAudioModifiersControlsElement
  );

  htmlMuteButton.addEventListener('click', () => {
    if (track.audioElement.isMuted) {
      htmlMuteButton.setAttribute('class', 'muteButton');
      track.audioElement.isMuted = false;
      track.gainNode.gain.value = track.volume;
      return;
    }
    htmlMuteButton.setAttribute('class', 'muteButton-active');
    track.audioElement.isMuted = true;
    track.gainNode.gain.value = 0;
    return;
  });

  htmlVolumeInput.addEventListener('input', () => {
    track.volume = htmlVolumeInput.value;
    if (!track.audioElement.isMuted) track.gainNode.gain.value = track.volume;
  });

  htmlTrackPannerElement.addEventListener('input', () => {
    track.pannerNode.pan.value = htmlTrackPannerElement.value;
  });

  htmlTrackElement.insertAdjacentElement('beforeend', audioElement);
  htmlTracksSection.insertAdjacentElement('beforeend', htmlTrackElement);
}

function createAudioElement(track) {
  const { filePath } = track;
  const audioElement = document.createElement('audio');
  //audioElement.setAttribute('src', filePath);
  //audioElement.setAttribute('controls', '');
  track.audioElement = audioElement;

  track.mediaElement = new AudioBufferSourceNode(audioCtx, {
    buffer: track.audioBuffer,
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

function createTrackAudioModifiersControls() {
  const htmlTrackAudioModifiersControlsElement = document.createElement('div');
  htmlTrackAudioModifiersControlsElement.setAttribute(
    'class',
    'audioModifiers'
  );

  htmlTrackAudioModifiersControlsElement.insertAdjacentElement(
    'beforeend',
    createHTMLTextElement({
      HTMLElementType: 'label',
      text: 'L',
    })
  );

  const htmlTrackPannerElement = createTrackFaderInputRange({
    className: 'trackPanner',
    step: '0.01',
    min: '-1',
    max: '1',
    initialValue: '0',
  });

  htmlTrackAudioModifiersControlsElement.insertAdjacentElement(
    'beforeend',
    htmlTrackPannerElement
  );

  htmlTrackAudioModifiersControlsElement.insertAdjacentElement(
    'beforeend',
    createHTMLTextElement({
      HTMLElementType: 'label',
      text: 'R',
    })
  );

  return { htmlTrackPannerElement, htmlTrackAudioModifiersControlsElement };
}

function createTrackVolumeControls() {
  const htmlTrackVolumeControlsElement = document.createElement('div');
  htmlTrackVolumeControlsElement.setAttribute('class', 'volumeControls');

  const htmlMuteButton = createTrackMuteButton();

  htmlTrackVolumeControlsElement.insertAdjacentElement(
    'beforeend',
    htmlMuteButton
  );

  const htmlVolumeInput = createTrackFaderInputRange({
    className: 'trackVolume',
    step: '0.01',
    min: '0',
    max: '1.5',
    initialValue: '1',
  });

  htmlTrackVolumeControlsElement.insertAdjacentElement(
    'beforeend',
    htmlVolumeInput
  );

  return { htmlTrackVolumeControlsElement, htmlMuteButton, htmlVolumeInput };
}

function createHTMLTextElement({
  HTMLElementType = 'span',
  id = '',
  text,
  className = '',
}) {
  const htmlTextElement = document.createElement(HTMLElementType);

  if (id) htmlTextElement.setAttribute('id', id);
  if (className) htmlTextElement.setAttribute('class', className);
  if (text) htmlTextElement.innerText = text;

  return htmlTextElement;
}

function createTrackFaderInputRange({
  className = 'trackVolume',
  step = '0.01',
  min = '0',
  max = '1.5',
  initialValue = '1',
}) {
  const htmlTrackFader = document.createElement('input');
  htmlTrackFader.setAttribute('class', className);
  htmlTrackFader.setAttribute('type', 'range');
  htmlTrackFader.setAttribute('step', step);
  htmlTrackFader.setAttribute('min', min);
  htmlTrackFader.setAttribute('max', max);
  htmlTrackFader.setAttribute('value', initialValue);

  return htmlTrackFader;
}

function createTrackMuteButton() {
  const htmlMuteButton = document.createElement('button');
  htmlMuteButton.setAttribute('id', 'mute');
  htmlMuteButton.setAttribute('class', 'muteButton');
  htmlMuteButton.innerText = 'Mute';

  return htmlMuteButton;
}
