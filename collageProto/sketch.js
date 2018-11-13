var Paint = [];
var shapePos = [];
var img = [];
var imageI;
var imgPos = [];
var imgPosX = 0;
var imgPosY = 0;

var bShape = false;
var bChoseImg = false;

var oldDist, distance;

function placeCanvas() {
  var x = 650;
  var y = 190;
  cnv.position(x, y);
  
}

function preload(){
	//imageI = loadImage('assets/' + int(random(20)) + '.png');
	for (var j = 1; j < 20; j ++) {
		var imageI = loadImage('assets/' + j + '.png');
		img.push(imageI);
	}
	
}

function setup(){
	cnv = createCanvas(800, 600);
  	//placeCanvas();
	rectMode(CENTER);
	// textAlign(CENTER);
}

function draw(){
	background(245);
	fill(0);
	stroke(0);
	textSize(15);
	text('mouse click + drag to draw', 100, 50);
	text('after drawing hit left arrow to display collage', width/2+60, 50);
	
	rect(width/2,height/2,2,height);

	for (var a = 0; a < Paint.length; a++) {
    		Paint[a].display();
  	}
 
  	if (bShape){
  		beginShape();
  		fill(10);
  		for (var i = 0; i < shapePos.length; i++) {
  			vertex(width-shapePos[i].x, shapePos[i].y);
  		}

  		//console.log('finish shape');
		endShape(CLOSE);

  		oldDist = 0;
  		for (var d = 0; d < shapePos.length; d++){
  			var pos1 = createVector(width-shapePos[0].x, shapePos[0].y);
  			var pos2 = createVector(width-shapePos[d].x, shapePos[d].y);
  			distance = int(dist(pos1.x, pos1.y, pos2.x, pos2.y));
  			if (distance > oldDist) {
  				oldDist = distance;
  			}
  		}
  	}

  	if (imgPos.length > 0) {
  		for (var k = 0; k < imgPos.length; k ++) {
  			image(img[k],imgPos[k].x, imgPos[k].y);
  		}
  	}
  	
  	
}

function paint(position, size){
	this.position = position;
	this.size = size;

	this.display = function(){
		push();
		translate(this.position.x, this.position.y);
		ellipse(0,0,this.size.x,this.size.y);
		pop();
	}
}

function mouseDragged(){
	Paint.push(new paint(createVector(mouseX,mouseY),createVector(15, 15)));
	shapePos.push(createVector(mouseX,mouseY));
	bShape = false;
	//console.log('drawing shape');
}

function mouseReleased(){
	bShape = true;
	//console.log('finish shape');
}

function keyReleased(){
	if (keyCode === LEFT_ARROW) {
		imgPos.push(createVector(width-shapePos[0].x, shapePos[0].y + oldDist/2));
		// imgPosX = width-shapePos[0].x;
		// imgPosY = shapePos[0].y + oldDist/2;
    	bShape = false;
  		shapePos.splice(0,shapePos.length);
  	}	
}

