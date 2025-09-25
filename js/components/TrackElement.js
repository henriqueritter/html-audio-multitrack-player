function createTrackElement(track) {
  const { id, name, isMuted } = track;

  if (!track.audioBuffer) {
    console.warn('Audio Buffer may not be initialized.');
    return;
  }
  track.isMuted = false;
  track.startAt = 0;
  track.pausedAt = 0;
  track.isPlaying = false;
  track.duration = track.audioBuffer.duration.toFixed(2);

  track.mediaElement = new AudioBufferSourceNode(audioCtx, {
    buffer: track.audioBuffer,
  });

  track.volume = 1;
  track.gainNode = new GainNode(audioCtx);
  track.gainNode.gain.value = track.volume;

  track.pannerNode = new StereoPannerNode(audioCtx, { pan: 0 });

  const htmlTrackElement = document.createElement('div');
  htmlTrackElement.setAttribute('id', id);
  htmlTrackElement.setAttribute('class', 'track');

  htmlTrackElement.insertAdjacentElement(
    'beforeend',
    TextElement({ id, text: name, className: 'trackName' })
  );

  const { htmlTrackVolumeControlsElement, htmlMuteButton, htmlVolumeInput } =
    VolumeControls();

  htmlTrackElement.insertAdjacentElement(
    'beforeend',
    htmlTrackVolumeControlsElement
  );

  const { htmlTrackPannerElement, htmlTrackAudioModifiersControlsElement } =
    AudioModifiersControls();

  htmlTrackElement.insertAdjacentElement(
    'beforeend',
    htmlTrackAudioModifiersControlsElement
  );

  htmlMuteButton.addEventListener('click', () => {
    if (track.isMuted) {
      htmlMuteButton.setAttribute('class', 'muteButton');
      track.isMuted = false;
      track.gainNode.gain.value = track.volume;
      return;
    }
    htmlMuteButton.setAttribute('class', 'muteButton-active');
    track.isMuted = true;
    track.gainNode.gain.value = 0;
    return;
  });

  htmlVolumeInput.addEventListener('input', () => {
    track.volume = htmlVolumeInput.value;
    if (!track.isMuted) track.gainNode.gain.value = track.volume;
  });

  htmlTrackPannerElement.addEventListener('input', () => {
    track.pannerNode.pan.value = htmlTrackPannerElement.value;
  });

  //htmlTrackElement.insertAdjacentElement('beforeend', audioElement);
  htmlTracksSection.insertAdjacentElement('beforeend', htmlTrackElement);
}
