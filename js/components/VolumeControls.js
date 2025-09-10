function VolumeControls() {
  const htmlTrackVolumeControlsElement = document.createElement('div');
  htmlTrackVolumeControlsElement.setAttribute('class', 'volumeControls');

  const htmlMuteButton = MuteButton();

  htmlTrackVolumeControlsElement.insertAdjacentElement(
    'beforeend',
    htmlMuteButton
  );

  const htmlVolumeInput = FaderInputRange({
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
