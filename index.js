const htmlTracksSection = document.getElementById('tracks');

function createTrackElement({ id, name, path }) {
  const htmlTrackElement = document.createElement('div');
  htmlTrackElement.setAttribute('id', id);
  htmlTrackElement.setAttribute('class', 'track');

  createHTMLTextElement(
    { parentHTMLElement: htmlTrackElement },
    { id: 1, text: 'Track 1', className: 'trackName' }
  );

  const { htmlMuteButton, htmlVolumeInput } = createTrackVolumeControls({
    parentHTMLElement: htmlTrackElement,
  });

  htmlMuteButton.addEventListener('click', () => {});

  htmlTracksSection.insertAdjacentElement('beforeend', htmlTrackElement);
}

function loadTracks() {
  createTrackElement({ id: 1, name: 'test', path: './test.mp3' });
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
