const htmlTracksSection = document.getElementById('tracks');

function createTrackElement({ id, name, path }) {
  const htmlTrackElement = document.createElement('div');
  htmlTrackElement.setAttribute('id', id);
  htmlTrackElement.setAttribute('class', 'track');

  createHTMLTextElement(
    { parentHTMLElement: htmlTrackElement },
    { id: 1, text: 'Track 1', className: 'trackName' }
  );

  htmlTracksSection.insertAdjacentElement('beforeend', htmlTrackElement);
}

function loadTracks() {
  createTrackElement({ id: 1, name: 'test', path: './test.mp3' });
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
