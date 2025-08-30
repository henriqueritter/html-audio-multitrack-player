const tracksCurrentTime = document.getElementById('tracksCurrentTime');
const playTracksButton = document.getElementById('playTracks');
const pauseTracksButton = document.getElementById('pauseTracks');

const htmlTracksSection = document.getElementById('tracks');

function loadTracks() {
  createTrackElement({ id: 1, name: 'test', path: './test.mp3' });
}

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

  htmlMuteButton.addEventListener('click', () => {
    console.log('aa');
  });

  const { a } = createTrackAudioModifiersControls({
    parentHTMLElement: htmlTrackElement,
  });

  htmlTracksSection.insertAdjacentElement('beforeend', htmlTrackElement);
}
