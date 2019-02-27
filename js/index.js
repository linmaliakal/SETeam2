/* for movement of text by mouse on canvas */
var canvas = document.querySelector('canvas');
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

//moving text across the canvas screen
/* ----------------------------------------------------------
var context;
var text = "";
var textDirection ="";
 $(function() {
  context = document.getElementById('cvs').getContext('2d');
  setInterval('animate()', 30);
  textDirection ='right';
  textXpos = 5;
  text = "#tweet"//document.getElementById("field1");
});
function animate() {
// Clear screen
  context.clearRect(0, 0, 500, 500);
  context.globalAlpha = 1;
  context.fillStyle = '#fff';
  context.fillRect(0, 0, 500, 500);

  var metrics = context.measureText(text);
  var textWidth = metrics.width;

  if (textDirection == "right") {
    textXpos += 10;
    if (textXpos > 500 - textWidth) {
      textDirection = "left";
    }
  }
  else {
    textXpos -= 10;
    if (textXpos < 10) {
      textDirection = "right";
    }
  }
  context.font = '20px _sans';
  context.fillStyle = '#FF0000';
  context.textBaseline = 'top';
  context.fillText  ( text, textXpos, 180);
}
---------------------------------------------------------- */


/* the jelly blocks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var _ref;
var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;}
      ;}();
      function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          } return arr2;
        } else {return Array.from(arr);}
      } function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
var SPACING = 14;
var ITERATIONS = 14;
var MOUSE = SPACING * 5;
var GRAVITY = 0.05;
var SPEED = 1;

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 550;//window.innerHeight;

ctx.font = '30px Arial';
ctx.fillText('wassup', canvas.width/2, canvas.height/2);


var mouse = {
  x: 0,
  y: 0,
  px: 0,
  py: 0,
  points: [] };


var clamp = function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
};var

Vector = function () {
  function Vector() {var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;_classCallCheck(this, Vector);
    this.x = x;
    this.y = y;
  }_createClass(Vector, [{ key: 'add', value: function add(
    v) {
      var p = v instanceof Vector;
      this.x += p ? v.x : v;
      this.y += p ? v.y : v;
      return this;
    } }, { key: 'sub', value: function sub(

    v) {
      var p = v instanceof Vector;
      this.x -= p ? v.x : v;
      this.y -= p ? v.y : v;
      return this;
    } }, { key: 'mul', value: function mul(

    v) {
      var p = v instanceof Vector;
      this.x *= p ? v.x : v;
      this.y *= p ? v.y : v;
      return this;
    } }, { key: 'scale', value: function scale(

    x) {
      this.x *= x;
      this.y *= x;
      return this;
    } }, { key: 'normalize', value: function normalize()

    {
      var len = this.length;
      if (len > 0) {
        this.x /= len;
        this.y /= len;
      }

      return this;
    } }, { key: 'distance', value: function distance(

    v) {
      var x = this.x - v.x;
      var y = this.y - v.y;
      return Math.sqrt(x * x + y * y);
    } }, { key: 'length', get: function get() {return Math.sqrt(this.x * this.x + this.y * this.y);} }], [{ key: 'add', value: function add(

    v1, v2) {
      var v = v2 instanceof Vector;
      return new Vector(
      v1.x + (v ? v2.x : v2),
      v1.y + (v ? v2.y : v2));

    } }, { key: 'sub', value: function sub(

    v1, v2) {
      var v = v2 instanceof Vector;
      return new Vector(
      v1.x - (v ? v2.x : v2),
      v1.y - (v ? v2.y : v2));

    } }, { key: 'mul', value: function mul(

    v1, v2) {
      var v = v2 instanceof Vector;
      return new Vector(
      v1.x * (v ? v2.x : v2),
      v1.y * (v ? v2.y : v2));

    } }, { key: 'dot', value: function dot(

    v1, v2) {
      return v1.x * v2.x + v1.y * v2.y;
    } }]);return Vector;}();


var reactor = function reactor(a, b, p) {
  var refA = Vector.add(a.toWorld(p), a.pos);
  var refB = Vector.add(b.toWorld(Vector.mul(p, -1)), b.pos);

  var diff = Vector.sub(refB, refA);
  var mid = Vector.add(refA, Vector.mul(diff, 0.5));

  var t = clamp(b.p - a.p, -Math.PI, Math.PI);
  a.torque += t;
  b.torque -= t;

  var mfc = 0.04;
  var tfc = 0.02;
  var mf = Vector.mul(diff, mfc);
  var tf = Vector.mul(diff, tfc);
  var dm = Vector.sub(b.vat(mid), a.vat(mid));
  mf.add(Vector.mul(dm, mfc));
  tf.add(Vector.mul(dm, tfc));

  a.addForce(mf, mid);
  b.addForce(Vector.mul(mf, -1), mid);
  a.addTorque(tf, mid);
  b.addTorque(Vector.mul(tf, -1), mid);
};

var allContraints = [];var

Point = function () {
  function Point(pos, square) {_classCallCheck(this, Point);
    this.pos = pos;
    this.velocity = new Vector();
    this.force = new Vector();

    this.p = 0;
    this.w = 0;
    this.torque = 0;
    this.square = square;
  }_createClass(Point, [{ key: 'update', value: function update()

    {
      this.velocity.add(Vector.mul(this.force, SPEED));

      this.force = new Vector(0, GRAVITY / ITERATIONS);

      this.pos.add(Vector.mul(this.velocity, SPEED));

      var qPI = Math.PI / 4;
      this.w += this.torque / (Math.pow(SPACING / 2, 2) / 2);
      this.w = clamp(this.w * SPEED, -qPI, qPI);

      this.p += this.w;
      this.torque = 0;

      mouse.points.includes(this) &&
      this.moveTo(mouse, this.mouseDiff);
    } }, { key: 'toWorld', value: function toWorld(

    input) {
      return new Vector(
      -input.y * Math.sin(this.p) + input.x * Math.cos(this.p),
      input.y * Math.cos(this.p) + input.x * Math.sin(this.p));

    } }, { key: 'vat', value: function vat(

    R) {
      var dr = Vector.sub(R, this.pos);
      var vdr = this.w * dr.length;

      dr.normalize();

      return Vector.add(
      this.velocity,
      new Vector(vdr * -dr.y, vdr * dr.x));

    } }, { key: 'addForce', value: function addForce(

    F) {
      this.force.add(F);
    } }, { key: 'addTorque', value: function addTorque(

    F, R) {
      var arm = Vector.sub(R, this.pos);
      var torque = F.y * arm.x - F.x * arm.y;
      this.torque += torque;
    } }, { key: 'moveTo', value: function moveTo(

    v, offset) {
      var targetX = v.x + offset.x;
      var targetY = v.y + offset.y;
      var strength = 0.001;
      this.velocity.x += (targetX - this.pos.x) * strength * SPEED;
      this.velocity.y += (targetY - this.pos.y) * strength * SPEED;
      this.velocity.mul(0.99);
    } }]);return Point;}();var


Square = function () {
  function Square(width, height, spacing, hue, text) {var _this = this;_classCallCheck(this, Square);
    this.width = width;
    this.height = height;
    this.spacing = spacing;
    this.hue = hue;
    this.text = text;

    var yOff = 200 + Math.random() * (canvas.height - 300 - height * SPACING);
    var xOff = 10 + Math.random() * (canvas.width - 10 - width * SPACING);

    var w = -0.5 + Math.random();

    this.points = Array(width * height).fill(0).map(function (_, i) {
      var x = i % width;
      var y = ~~(i / width);

      var p = new Point(
      new Vector(
      xOff + x * spacing,
      canvas.height - yOff + y * spacing), _this);




      p.w = w;

      return p;
    });

    this.points.forEach(function (point, i) {
      var x = i % width;
      var y = ~~(i / width);

      if (x > 0) {
        allContraints.push([
        _this.points[i - 1],
        point,
        new Vector(SPACING / 2, 0)]);

      }

      if (y > 0) {
        allContraints.push([
        _this.points[i - width],
        point,
        new Vector(0, SPACING / 2)]);

      }
    });

    this.drawPoints = [];

    for (var i = 0; i < width; i++) {
      this.drawPoints.push(this.points[i].pos);
    }

    for (var _i = 0; _i < height; _i++) {
      this.drawPoints.push(this.points[width - 1 + width * _i].pos);
    }

    for (var _i2 = width - 1; _i2 > -1; _i2--) {
      this.drawPoints.push(this.points[(height - 1) * width + _i2].pos);
    }

    for (var _i3 = height - 1; _i3 > -1; _i3--) {
      this.drawPoints.push(this.points[width * _i3].pos);
    }
  }_createClass(Square, [{ key: 'draw', value: function draw(

    ctx) {var
      drawPoints = this.drawPoints,hue = this.hue;

      ctx.lineWidth = 2;
      ctx.fillStyle = 'hsla(' + hue + ', 90%, 80%, 0.8)';
      ctx.strokeStyle = 'hsla(' + hue + ', 90%, 70%, 0.8)';

      ctx.beginPath();
      ctx.moveTo(drawPoints[0].x, drawPoints[0].y);

      drawPoints.forEach(function (point, i) {
        i && ctx.lineTo(point.x, point.y);
      });

      ctx.lineTo(drawPoints[0].x, drawPoints[0].y);
      ctx.stroke();
      ctx.fill();
    } }]);return Square;}();


var hue = Math.random() * 360;
var squares = Array(4).fill(0).map(function (_, i) { //the more blocks added, the slower the site becomes, might need to restrict the tweet aspects shown to top ones or something
  var size = 8 + i * 2;
  return new Square(
  size,
  size,
  SPACING,
  hue + i * 20);

});

var allPoints = (_ref = []).concat.apply(_ref, _toConsumableArray(squares.map(function (_ref2) {var points = _ref2.points;return points;})));

var update = function update() {var
  width = canvas.width,height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  var i = ITERATIONS;
  while (i--) {
    allContraints.forEach(function (con, i) {
      reactor.apply(undefined, _toConsumableArray(con).concat([i]));
    });

    allPoints.forEach(function (point, i) {var
      square = point.square;

      var damping = 0.6;
      var spacing = (square ? square.spacing : SPACING) / 2;

      if (point.pos.x < spacing) {
        point.force.add(new Vector((spacing - point.pos.x) * 1, 0));
        point.velocity.y *= damping;
      } else if (point.pos.x > canvas.width - spacing) {
        point.force.add(new Vector((point.pos.x - canvas.width + spacing) * -1, 0));
        point.velocity.y *= damping;
      }

      if (point.pos.y < spacing) {
        point.force.add(new Vector(0, (spacing - point.pos.y) * 1));
        point.velocity.x *= damping;
      } else if (point.pos.y > canvas.height - spacing) {
        point.force.add(new Vector(0, (point.pos.y - canvas.height + spacing) * -1));
        point.velocity.x *= damping;
      }

      point.update();
    });
  }

  squares.forEach(function (s) {
    s.draw(ctx);
  });

  if (mouse.down) {
    ctx.fillStyle = 'rgba(0, 0, 100, 0.03)';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, MOUSE, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, SPACING, 0, Math.PI * 2);
    ctx.fill();
  }

  mouse.px = mouse.x;
  mouse.py = mouse.y;

  window.requestAnimationFrame(update);
};

update();


var setMouse = function setMouse(e) {
  e = e.touches ? e.touches[0] : e;
  var rect = canvas.getBoundingClientRect();
  mouse.px = mouse.x;
  mouse.py = mouse.y;
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
};

canvas.onmousedown = canvas.ontouchstart = function (e) {
  setMouse(e);
  mouse.down = true;var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

    for (var _iterator = allPoints[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var point = _step.value;
      if (point.pos.distance(mouse) < MOUSE && !mouse.points.includes(point)) {
        mouse.points.push(point);
        point.mouseDiff = Vector.sub(point.pos, new Vector(mouse.x, mouse.y));
        point.velocity.mul(0);
        point.force.mul(0);
      }
    }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
};

canvas.onmouseup = canvas.ontouchend = function () {
  mouse.points = [];
  mouse.down = false;
};

canvas.onmousemove = canvas.ontouchmove = setMouse;

*/
/* window.onkeydown = function (_ref3) {var keyCode = _ref3.keyCode;
  if (keyCode === 49) {
    SPEED = 0.2;
  } else if (keyCode === 50) {
    GRAVITY = 0;
  } else if (keyCode === 51) {
    GRAVITY = -0.05;
  }
};
window.onkeyup = function (_ref4) {var keyCode = _ref4.keyCode;
  if (keyCode === 49) {
    SPEED = 1;
  } else if (keyCode === 50) {
    GRAVITY = 0.05;
  } else if (keyCode === 51) {
    GRAVITY = 0.05;
  }
};
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
