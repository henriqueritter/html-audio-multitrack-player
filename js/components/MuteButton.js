function MuteButton() {
  const htmlMuteButton = document.createElement('button');
  htmlMuteButton.setAttribute('id', 'mute');
  htmlMuteButton.setAttribute('class', 'muteButton');
  htmlMuteButton.innerText = 'Mute';

  return htmlMuteButton;
}
