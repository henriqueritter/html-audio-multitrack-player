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

function createAudioElement(track) {
  const { filePath } = track;
  const audioElement = document.createElement('audio');
  audioElement.setAttribute('src', filePath);
  //audioElement.setAttribute('controls', '');
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

function createTrackAudioModifiersControls({
  parentHTMLElement,
  position = 'beforeend',
}) {
  const htmlTrackAudioModifiersControlsElement = document.createElement('div');
  htmlTrackAudioModifiersControlsElement.setAttribute(
    'class',
    'audioModifiers'
  );

  createHTMLTextElement(
    {
      parentHTMLElement: htmlTrackAudioModifiersControlsElement,
      HTMLElementType: 'label',
    },
    {
      text: 'L',
    }
  );
  const htmlTrackPannerElement = document.createElement('input');
  htmlTrackPannerElement.setAttribute('id', 'panner');
  htmlTrackPannerElement.setAttribute('name', 'panner');
  htmlTrackPannerElement.setAttribute('class', 'trackPanner');
  htmlTrackPannerElement.setAttribute('type', 'range');
  htmlTrackPannerElement.setAttribute('step', '0.01');
  htmlTrackPannerElement.setAttribute('min', '-1');
  htmlTrackPannerElement.setAttribute('max', '1');
  htmlTrackPannerElement.setAttribute('value', '0');

  htmlTrackAudioModifiersControlsElement.insertAdjacentElement(
    'beforeend',
    htmlTrackPannerElement
  );

  createHTMLTextElement(
    {
      parentHTMLElement: htmlTrackAudioModifiersControlsElement,
      HTMLElementType: 'label',
    },
    {
      text: 'R',
    }
  );

  parentHTMLElement.insertAdjacentElement(
    position,
    htmlTrackAudioModifiersControlsElement
  );

  return { htmlTrackPannerElement };
}

function createTrackVolumeControls({
  parentHTMLElement,
  position = 'beforeend',
}) {
  const htmlTrackVolumeControlsElement = document.createElement('div');
  htmlTrackVolumeControlsElement.setAttribute('class', 'volumeControls');

  const htmlMuteButton = document.createElement('button');
  htmlMuteButton.setAttribute('id', 'mute');
  htmlMuteButton.setAttribute('class', 'muteButton');
  htmlMuteButton.innerText = 'Mute';

  htmlTrackVolumeControlsElement.insertAdjacentElement(
    'beforeend',
    htmlMuteButton
  );

  const htmlVolumeInput = document.createElement('input');
  htmlVolumeInput.setAttribute('id', 'volume');
  htmlVolumeInput.setAttribute('name', 'volume');
  htmlVolumeInput.setAttribute('class', 'trackVolume');
  htmlVolumeInput.setAttribute('type', 'range');
  htmlVolumeInput.setAttribute('step', '0.01');
  htmlVolumeInput.setAttribute('min', '0');
  htmlVolumeInput.setAttribute('max', '1.5');
  htmlVolumeInput.setAttribute('value', '1');

  htmlTrackVolumeControlsElement.insertAdjacentElement(
    'beforeend',
    htmlVolumeInput
  );

  parentHTMLElement.insertAdjacentElement(
    position,
    htmlTrackVolumeControlsElement
  );

  return { htmlMuteButton, htmlVolumeInput };
}

function createHTMLTextElement(
  { HTMLElementType = 'span', parentHTMLElement, position = 'beforeend' },
  { id = '', text, className = '' }
) {
  const spanElement = document.createElement(HTMLElementType);

  if (id) spanElement.setAttribute('id', id);
  if (className) spanElement.setAttribute('class', className);
  if (text) spanElement.innerText = text;

  parentHTMLElement.insertAdjacentElement(position, spanElement);
}
