/* for movement of text by mouse on canvas */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//variables
var $canvas = $("#canvas");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var scrollX = $canvas.scrollLeft();
var scrollY = $canvas.scrollTop();
var startX;
var startY;
var texts = [];
var selectedText = -1;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < texts.length; i++) {
    var text = texts[i];
    ctx.fillText(text.text, text.x, text.y);
  }
}

function textHittest(x, y, textIndex) {
  var text = texts[textIndex];
  return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
}

function handleMouseDown(e) {
  e.preventDefault();
  startX = parseInt(e.clientX - offsetX);
  startY = parseInt(e.clientY - offsetY);
  // Put your mousedown stuff here
  for (var i = 0; i < texts.length; i++) {
    if (textHittest(startX, startY, i)) {
      selectedText = i;
    }
  }
}
// done dragging
function handleMouseUp(e) {
  e.preventDefault();
  selectedText = -1;
}
// also done dragging
function handleMouseOut(e) {
  e.preventDefault();
  selectedText = -1;
}

function handleMouseMove(e) {
    if (selectedText < 0) {
        return;
    }
    e.preventDefault();
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here
    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;

    var text = texts[selectedText];
    text.x += dx;
    text.y += dy;
    draw();
}
// listen for mouse events
$("#canvas").mousedown(function (e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function (e) {
    handleMouseUp(e);
});
$("#canvas").mouseout(function (e) {
    handleMouseOut(e);
});

$('#drawText').click(function () {
  //will calculate the y coordinate for this text on the canvas
  var y = texts.length * 20 + 20;
  //get the text from input
  var text = {
    text: $('#field1').val(),
    x: 20,
    y: y
  };
  //calculate the size of text for hit-testing purposes
  ctx.font = '16px verdana';
  text.width = ctx.measureText(text.text).width;
  text.height = 16;
  //pushes new text into texts array
  texts.push(text);
  //redraws everything
  draw();
});

//for dragging square with text in it, hoping to implement jelly animations to box despite jelly being on canvas
dragElement(document.getElementById('textbox'));
function dragElement(element) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(element.id + 'header')) {
    document.getElementById(element.id + 'header').onmousedown = dragMouseDown;
  } else {
    element.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + 'px';
    element.style.left = (element.offsetLeft - pos1) + 'px';
  }
}
function closeDragElement() {
  // stop moving when mouse button is released:
  document.onmouseup = null;
  document.onmousemove = null;
}
