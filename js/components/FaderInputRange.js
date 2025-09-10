function FaderInputRange({
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
