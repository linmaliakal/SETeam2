function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}
//return an array of values that match on a certain key
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}
//return an array of keys that match on a certain value
function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
}
//temporary json file for testing, will be json file obtained from backend server
var json = '{"name":"Linette", "age":31, "city":"Chicago"}'; //'{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","ID":"44","str":"SGML","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';
var js = JSON.parse(json);
document.getElementById("tweetElement").innerHTML = js.city;

console.log(getObjects(js,'ID',''));
//returns 2 objects since keys with name ID are found in 2 objects

//grabbing keys through searching values in JSON
console.log(getKeys(js,'SGML'));
//returns array ["ID", "SortAs", "Acronym", "str"]

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
    text: $('#tweetElement').val(), //tweetElement is obtained parsed json file
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

//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
