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
