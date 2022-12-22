var rect = null;
var cir = null;
var line = null;
var triangle = null;
var isNowDrawing = false;
let selectedbtn;

let stage = new Konva.Stage({
  container: "content",
  width: 1100,
  height: window.innerHeight,
});
let layer1 = new Konva.Layer();
let layer2 = new Konva.Layer();
let layer3 = new Konva.Layer();
let layer4 = new Konva.Layer();
stage.add(layer1);
stage.add(layer2);
stage.add(layer3);
stage.add(layer4);

function circleDown() {
  cir = new Konva.Circle({
    x: stage.getPointerPosition().x,
    y: stage.getPointerPosition().y,
    radius: 10,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });
  layer1.add(cir).batchDraw();
}

function circleMove() {
  const rise = Math.pow(stage.getPointerPosition().y - cir.y(), 2);
  const run = Math.pow(stage.getPointerPosition().x - cir.x(), 2);
  const newRadius = Math.sqrt(rise + run);
  cir.radius(newRadius);
}

function rectdown() {
  rect = new Konva.Rect({
    x: stage.getPointerPosition().x,
    y: stage.getPointerPosition().y,
    width: 10,
    height: 10,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });
  layer2.add(rect).batchDraw();
}

function rectMove() {
  const newWidth = stage.getPointerPosition().x - rect.x();
  const newHeight = stage.getPointerPosition().y - rect.y();
  rect.width(newWidth).height(newHeight);
}

function triangleDown() {
  triangle = new Konva.RegularPolygon({
    x: stage.getPointerPosition().x,
    y: stage.getPointerPosition().y,
    sides: 3,
    radius: 20,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });
  layer3.add(triangle).batchDraw();
}

function triangleMove() {
  const newWidth = stage.getPointerPosition().x - triangle.x();
  const newHeight = stage.getPointerPosition().y - triangle.y();
  triangle.width(newWidth).height(newHeight);
}

function lineDown() {
  line = new Konva.Line({
    stroke: "black",
    // remove line from hit graph, so we can check intersections
    listening: false,
    points: [stage.getPointerPosition().x, stage.getPointerPosition().y],
  });
  layer4.add(line).batchDraw();
}

function lineMove() {
  const pos = stage.getPointerPosition();
  const points = line.points().slice();
  points[2] = pos.x;
  points[3] = pos.y;
  line.points(points);
}

function drawTriangle() {
  stage.on("mousedown ", mousedownHandler);
  stage.on("mousemove ", mousemoveHandler);
  stage.on("mouseup ", mouseupHandler);
  function mousedownHandler() {
    isNowDrawing = true;
    triangleDown();
  }
  function mousemoveHandler() {
    if (!isNowDrawing) return false;
    triangleMove();
    //  layer.batchDraw();
  }
  function mouseupHandler() {
    isNowDrawing = false;
  }
}

function drawCircle() {
  stage.on("mousedown ", mousedownHandler);
  stage.on("mousemove ", mousemoveHandler);
  stage.on("mouseup ", mouseupHandler);
  function mousedownHandler() {
    isNowDrawing = true;
    circleDown();
  }
  function mousemoveHandler() {
    if (!isNowDrawing) return false;
    circleMove();
    //layer.batchDraw();
  }
  function mouseupHandler() {
    isNowDrawing = false;
  }
}

function drawRect() {
  stage.on("mousedown ", mousedownHandler);
  stage.on("mousemove ", mousemoveHandler);
  stage.on("mouseup ", mouseupHandler);
  function mousedownHandler() {
    isNowDrawing = true;
    rectdown();
  }
  function mousemoveHandler() {
    if (!isNowDrawing) return false;
    rectMove();
    //layer.batchDraw();
  }
  function mouseupHandler() {
    isNowDrawing = false;
  }
}

function drawLine() {
  stage.on("mousedown ", mousedownHandler);
  stage.on("mousemove ", mousemoveHandler);
  stage.on("mouseup ", mouseupHandler);

  function mousedownHandler() {
    isNowDrawing = true;
    lineDown();
  }
  function mousemoveHandler() {
    if (!isNowDrawing) return false;
    lineMove();
  }
  function mouseupHandler() {
    isNowDrawing = false;
  }
}

// if (selectedTool === "line") {
//   console.log(selectedTool);
//   drawLine();
// } else if (selectedTool === "rectangle") {
//   console.log(selectedTool);
//   drawRect();
// } else if (selectedTool === "circle") {
//   console.log(selectedTool);
//   drawCircle();
// } else if (selectedTool === "triangle") {
//   console.log(selectedTool);
//   drawTriangle();
// }
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((button) => button.classList.remove("active"));
    button.classList.add("active");
    selectedbtn = button.id;
    console.log(btnId);
    if (btnId === "rectangle") {
      drawRect();
    } else if (btnId === "circle") {
      drawCircle();
    } else if (btnId === "traingle") {
      drawTriangle();
    } else if (btnId === "line") {
      drawLine();
    }
  });
});
