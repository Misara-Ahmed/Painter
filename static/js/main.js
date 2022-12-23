let rect_flag = 0;
let cir_flag = 0;
let line_flag = 0;
let triangle_flag = 0;
let isNowDrawing = false;
let btnId;
let lineArray = [];
let cirArray = [];
let rectArray = [];
let triangleArray = [];
let stage = new Konva.Stage({
  container: "content",
  width: 1500,
  height: window.innerHeight,
});
let layer = new Konva.Layer();

function circleDown() {
  cir = new Konva.Circle({
    x: stage.getPointerPosition().x,
    y: stage.getPointerPosition().y,
    radius: 0,
    fill: "#030d5d",
    stroke: "#758fce",
    strokeWidth: 4,
  });
  layer.add(cir);
  layer.draw();
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
    width: 0,
    height: 0,
    fill: "red",
    stroke: "#14d4ed",
    strokeWidth: 4,
  });
  // layer.add(rect).batchDraw()
  layer.add(rect);
  layer.draw();
}

function rectMove() {
  const newWidth = stage.getPointerPosition().x - rect.x();
  const newHeight = stage.getPointerPosition().y - rect.y();
  rect.width(newWidth);
  rect.height(newHeight);
}

function triangleDown() {
  triangle = new Konva.RegularPolygon({
    x: stage.getPointerPosition().x,
    y: stage.getPointerPosition().y,
    sides: 3,
    radius: 0,
    fill: "green",
    stroke: "#a37ee6",
    strokeWidth: 4,
  });
  layer.add(triangle).batchDraw();
}

function triangleMove() {
  const newWidth = stage.getPointerPosition().x - triangle.x();
  const newHeight = stage.getPointerPosition().y - triangle.y();
  triangle.width(newWidth);
  triangle.height(newHeight);
}

function lineDown() {
  line = new Konva.Line({
    stroke: "#3646bd",
    strokeWidth: 5,
    // remove line from hit graph, so we can check intersections
    listening: false,
    points: [stage.getPointerPosition().x, stage.getPointerPosition().y],
  });
  layer.add(line).batchDraw();
}

function lineMove() {
  const pos = stage.getPointerPosition();
  const points = line.points().slice();
  points[2] = pos.x;
  points[3] = pos.y;
  line.points(points);
}

function drawTriangle(x) {
  triangle_flag = 1;
  rect_flag = 0;
  cir_flag = 0;
  line_flag = 0;
  console.log("triangle");
  stage.on("mousedown", mousedownHandler);
  stage.on("mousemove", mousemoveHandler);
  stage.on("mouseup", mouseupHandler);
  function mousedownHandler() {
    if (triangle_flag === 1) {
      console.log("triangle");
      isNowDrawing = true;
      triangleDown();
    }
  }
  function mousemoveHandler() {
    if (triangle_flag === 1) {
      if (!isNowDrawing) return false;
      triangleMove();
    }
    //  layer.batchDraw();
  }
  function mouseupHandler() {
    if (triangle_flag === 1) {
      isNowDrawing = false;
      triangleArray.push(triangle);
    }
  }
  stage.add(layer);
}

function drawCircle() {
  cir_flag = 1;
  rect_flag = 0;
  line_flag = 0;
  triangle_flag = 0;
  console.log("circle");
  stage.on("mousedown circle", mousedownHandler);
  stage.on("mousemove circle", mousemoveHandler);
  stage.on("mouseup circle", mouseupHandler);
  function mousedownHandler() {
    if (cir_flag === 1) {
      isNowDrawing = true;
      circleDown();
    }
  }
  function mousemoveHandler() {
    if (cir_flag === 1) {
      if (!isNowDrawing) return false;
      circleMove();
    }
    //layer.batchDraw();
  }
  function mouseupHandler() {
    if (cir_flag === 1) {
      isNowDrawing = false;
      cirArray.push(cir);
    }
  }
  stage.add(layer);
}

function drawRect() {
  console.log("rect");
  rect_flag = 1;
  cir_flag = 0;
  line_flag = 0;
  triangle_flag = 0;
  stage.on("mousedown rect", mousedownHandler);
  stage.on("mousemove rect", mousemoveHandler);
  stage.on("mouseup rect", mouseupHandler);
  function mousedownHandler() {
    if (rect_flag === 1) {
      console.log("rect");
      isNowDrawing = true;
      rectdown();
    }
  }
  function mousemoveHandler() {
    if (rect_flag === 1) {
      if (!isNowDrawing) return false;
      rectMove();
    }
    //layer.batchDraw();
  }
  function mouseupHandler() {
    if (rect_flag === 1) {
      console.log("rect");
      isNowDrawing = false;
      rectArray.push(rect);
    }
  }
  stage.add(layer);
}

function drawLine() {
  console.log("line");
  line_flag = 1;
  rect_flag = 0;
  cir_flag = 0;
  triangle_flag = 0;
  stage.on("mousedown ", mousedownHandler);
  stage.on("mousemove ", mousemoveHandler);
  stage.on("mouseup ", mouseupHandler);

  function mousedownHandler() {
    if (line_flag === 1) {
      console.log("line");
      isNowDrawing = true;
      lineDown();
    }
  }
  function mousemoveHandler() {
    if (line_flag === 1) {
      if (!isNowDrawing) return false;
      lineMove();
    }
  }
  function mouseupHandler() {
    if (line_flag === 1) {
      console.log("line");
      isNowDrawing = false;
      lineArray.push(line);
    }
  }
  stage.add(layer);
}
function transform() {
  line_flag = 0;
  rect_flag = 0;
  cir_flag = 0;
  triangle_flag = 0;
  let group = new Konva.Group({
    draggable: true,
  });
  layer.add(group);
  for (i = 0; i < cirArray.length; i++) {
    group.add(cirArray[i]);
  }
  for (j = 0; j < rectArray.length; j++) {
    group.add(rectArray[j]);
  }
  for (k = 0; k < lineArray.length; k++) {
    group.add(lineArray[k]);
  }
  for (l = 0; l < triangleArray.length; l++) {
    group.add(triangleArray[l]);
  }
  const tr = new Konva.Transformer({
    node: group,
  });
  layer.add(tr);
  layer.draw();
}

// const buttons = document.querySelectorAll('.button');
//
// buttons.forEach(button => {
//   button.addEventListener('click', () => {
//     buttons.forEach(button => button.classList.remove('active'));
//     button.classList.add('active');
//     btnId = button.id;
//     // console.log(btnId)
//     if( btnId === 'rect') {
//       drawRect();
//     }
//     if (btnId === 'circle'){
//       drawCircle();
//     }
//     if(btnId === 'traingle'){
//       drawTriangle(1);
//     }
//     if (btnId === 'line'){
//       drawLine();
//     }
//     });
// });
