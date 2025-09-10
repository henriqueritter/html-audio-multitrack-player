function TextElement({
  HTMLElementType = 'span',
  id = '',
  text,
  className = '',
}) {
  const htmlTextElement = document.createElement(HTMLElementType);

  if (id) htmlTextElement.setAttribute('id', id);
  if (className) htmlTextElement.setAttribute('class', className);
  if (text) htmlTextElement.innerText = text;

  return htmlTextElement;
}
