function AudioModifiersControls() {
  const htmlTrackAudioModifiersControlsElement = document.createElement('div');
  htmlTrackAudioModifiersControlsElement.setAttribute(
    'class',
    'audioModifiers'
  );

  htmlTrackAudioModifiersControlsElement.insertAdjacentElement(
    'beforeend',
    TextElement({
      HTMLElementType: 'label',
      text: 'L',
    })
  );

  const htmlTrackPannerElement = FaderInputRange({
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
    TextElement({
      HTMLElementType: 'label',
      text: 'R',
    })
  );

  return { htmlTrackPannerElement, htmlTrackAudioModifiersControlsElement };
}
