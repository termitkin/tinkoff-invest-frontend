const storage = window.localStorage;

function dragElement(elem, elemName) {
  const p = getPositionFromStorage(elemName) || {};

  if (p.hasOwnProperty('top') && p.hasOwnProperty('left')) {
    elem.style.position = 'absolute';

    elem.style.top = p.top;
    elem.style.left = p.left;
  }

  elem.addEventListener('mousedown', () => clickedOnWidget(elem));
  elem.addEventListener('mousedown', (e) => dragMouseDown(e, elem, elemName, p));
}

function clickedOnWidget(elem) {
  const widgets = document.querySelectorAll('main > article');

  widgets.forEach((widget) => (widget.style.zIndex = '1'));
  elem.style.zIndex = '9999';
}

function dragMouseDown(e, elem, elemName, p) {
  const clickedTag = e.target;

  p.pos3 = e.clientX;
  p.pos4 = e.clientY;

  document.onmousemove = (e) => elementDrag(e, elem, p, clickedTag);
  document.onmouseup = () => closeDragElement(elemName, elem);
}

function elementDrag(e, elem, p, clickedTag) {
  if (!clickedTag.closest('header') && clickedTag.tagName !== 'HEADER') {
    return;
  }

  p.pos1 = p.pos3 - e.clientX;
  p.pos2 = p.pos4 - e.clientY;
  p.pos3 = e.clientX;
  p.pos4 = e.clientY;

  if (window.getComputedStyle(elem).position === 'absolute') {
    const top = elem.offsetTop - p.pos2;
    const left = elem.offsetLeft - p.pos1;

    if (top < 40 || left < 10) {
      return;
    }

    elem.style.top = elem.offsetTop - p.pos2 + 'px';
    elem.style.left = elem.offsetLeft - p.pos1 + 'px';
  } else {
    elem.style.top = elem.offsetTop + 'px';
    elem.style.left = elem.offsetLeft + 'px';

    elem.style.position = 'absolute';
  }
}

function closeDragElement(elemName, elem) {
  document.onmouseup = null;
  document.onmousemove = null;

  writePositionToStorage(elemName, elem);
}

function writePositionToStorage(elemName, elem) {
  const top = window.getComputedStyle(elem).top;
  const left = window.getComputedStyle(elem).left;

  storage.setItem(elemName, JSON.stringify({ top, left }));
}

function getPositionFromStorage(elemName) {
  return JSON.parse(storage.getItem(elemName));
}

export default dragElement;
