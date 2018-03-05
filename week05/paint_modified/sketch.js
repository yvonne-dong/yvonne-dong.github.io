// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 5
// saving/loading paint data
// based on example by Jon Beilin

var paintmarks = [];
var paintDataFile = 'paintData.json';

function preload(){
  
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  for (var i = 0; i < paintmarks.length; i++) {
    paintmarks[i].display();
  }

  fill(255);
  textSize(24);
  text("drag the mouse across the canvas to draw.", 50, 570);
  text("press 'S' to save a json file with the current paint data.", 50, 600);
  text("press 'L' to load a json file from your computer.", 50, 630);
}

function PaintMark(position, size, side, blue) {
  //in JSON
  this.position = position;
  this.size = size;
  this.side = side;
  this.blue = blue;
  
  var scaleStar = 1;

  //not in JSON
  var point = this.side;

  this.star = function(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  this.display = function() {
    strokeWeight(1);
    stroke(255, 0, blue);
    fill(255, 0, blue, 50);
    push();
    translate(this.position.x, this.position.y);
    rotate(frameCount / 50.0);
    //scale(scaleStar);
    this.star(0, 0, this.size.x, this.size.y, point); 
    pop();
  }

}


function mouseDragged() {
  paintmarks.push(new PaintMark(createVector(mouseX, mouseY), createVector(int(mouseX/10), int(mouseY/10)), round(map(mouseX, 0, 800, 3, 10)), round(map(mouseY, 0, 800, 5, 255) + sin(frameCount * 0.05) * 10)));
}

function keyPressed() {
  if (key === 'S') {
    savePaintData();
  }
  if (key === 'L') {
    loadPaintData();
  }
}

function savePaintData() {
  positionsToSave = [];
  for (var i = 0; i < paintmarks.length; i++) {
    positionsToSave.push(
      { 
        x: paintmarks[i].position.x, 
        y: paintmarks[i].position.y,
        w: paintmarks[i].size.x,
        h: paintmarks[i].size.y,
        side: paintmarks[i].side,
        blue: paintmarks[i].blue
      }
    );
  }
  saveJSON(positionsToSave, 'paintData.json');
}

function loadPaintData() {
  loadJSON(paintDataFile, parsePaintData);
}

function parsePaintData(data) {
  paintmarks = [];

  for (var i = 0; i < data.length; i++) {
    paintmarks.push(new PaintMark(createVector(data[i].x, data[i].y), createVector(data[i].w, data[i].h), data[i].side, data[i].blue));
  }
}