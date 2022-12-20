var rect=null;
var cir=null;
var line=null;
var triangle=null;
var isNowDrawing = false;
let stage = new Konva.Stage({
  container: 'content',
  width: 1100,
  height: window.innerHeight,
});
let layer = new Konva.Layer();
stage.add(layer);
function circleDown(){
    cir = new Konva.Circle({
      x: stage.getPointerPosition().x,
      y: stage.getPointerPosition().y,
      radius: 10,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
    });
    layer.add(cir).batchDraw()
}
function circleMove(){
  const rise=Math.pow(stage.getPointerPosition().y-cir.y(),2);
  const run=Math.pow(stage.getPointerPosition().x-cir.x(),2);
  const newRadius=Math.sqrt(rise+run);
  cir.radius(newRadius); 
}
function rectdown(){
  rect = new Konva.Rect({
    x: stage.getPointerPosition().x,
    y: stage.getPointerPosition().y,
    width:0,
    height:0,
    fill: "red",
    stroke: "black"
  });
  layer.add(rect).batchDraw()
}
function rectMove(){
  const newWidth=stage.getPointerPosition().x-rect.x();
  const newHeight=stage.getPointerPosition().y-rect.y();
  rect.width(newWidth).height(newHeight);
}
function triangleDown(){
triangle = new Konva.RegularPolygon({
    x: stage.getPointerPosition().x,
    y: stage.getPointerPosition().y,
    sides: 3,
    radius: 20,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 2,
  });
  layer.add(triangle).batchDraw()
}
function triangleMove(){
  const newWidth=stage.getPointerPosition().x-triangle.x();
  const newHeight=stage.getPointerPosition().y-triangle.y();
  triangle.width(newWidth).height(newHeight);
}
function lineDown(){
  line = new Konva.Line({
    stroke: 'black',
    // remove line from hit graph, so we can check intersections
    listening: false,
    points: [ stage.getPointerPosition().x, stage.getPointerPosition().y]
  });
  layer.add(line).batchDraw()
}
function lineMove(){
  const pos = stage.getPointerPosition();
  const points = line.points().slice();
  points[2] = pos.x;
  points[3] = pos.y;
  line.points(points);
}

stage.on('mousedown ', mousedownHandler);
stage.on('mousemove ', mousemoveHandler);
stage.on('mouseup ', mouseupHandler);
function mousedownHandler(){
  isNowDrawing=true ;
  lineDown();
}
function mousemoveHandler(){
  if(!isNowDrawing) return false;
  // layer.batchDraw();
  lineMove();
}
function mouseupHandler(){
  isNowDrawing = false;
}