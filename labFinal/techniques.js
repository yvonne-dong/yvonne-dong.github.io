
var method = 'https://api.harvardartmuseums.org/technique/';
//var techniqueNum = 7317;
var apiKey = '?apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';

var buttonElement;

var classNum = [];
var className = [];

var acc = 0;

var imp;

function placeCanvas() {
  var x = 200;
  var y = 100;
  cnv.position(x, y);
}

function setup(){
	cnv = createCanvas(600, 600);
	placeCanvas();

	buttonElement = createButton('press');
	buttonElement.mousePressed(buttonPressed);
	colorMode(HSB, 100);	

	inp = createInput('');
  	// inp.input(returnToHome);
}

function draw(){
	background(200,0,93);
	var distToCenter = int(dist(mouseX, mouseY, width/2, height/2));
	var distAdd = map(distToCenter, 0, 353, 500, 0);
	// console.log(distToCenter);
	for (var i = 10; i < classNum.length; i ++){
		// drawTechCircle(classNum[i].x, classNum[i].y);
		var position = createVector(width/2,i*10);
		// if (position.y < height) {
		// 	position.y += acc;
		// } else {
		// 	position.y = 0;
		// 	position.y += acc;
		// }
		drawCircleGrid(classNum[i].x, classNum[i].y,position.x,position.y);
	}
	// acc+=5;		
}

function buttonPressed(){

	// var url = method + techniqueNum + apiKey;
	//var url = 'https://api.harvardartmuseums.org/object?q=totalpageviews:1&size=10&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
	// console.log(inp.value());

	//var artistUrl = 'https://api.harvardartmuseums.org/image/195408?apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
	var artistUrl = 'https://api.harvardartmuseums.org/object?person='+inp.value()+'&size=100&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
	//var url = 'https://api.harvardartmuseums.org/classification?size=60&sortorder=asc&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
  	loadJSON(artistUrl, getTechnique);
}

function getTechnique(data){
	console.log(data);
	//console.log(data.records[0].people[0].displayname);
	// var rankMost = 0;
	// for (var i = 0; i < data.info.totalrecordsperquery; i ++) {
	// 	// if (data.records[i].technique != null && data.records[i].dated != null){
	// 	// 	console.log(data.records[i].technique);
	// 	// 	console.log(data.records[i].dated);
	// 	// }
	// 	if (rankMost < data.records[i].rank){
	// 		rankMost = data.records[i].rank;
	// 	}
	// 	// console.log(data.records[i].rank);	
	// }
	// console.log(rankMost);	

	//draw classification
	// for (var i = 0; i < data.info.totalrecords; i ++) {
	// 	var classification = createVector(data.records[i].objectcount, data.records[i].name);
	// 	classNum.push(classification);
	// } 
}

function drawTechCircle(classNumber, className){	
	this.classificationName = className;
	this.r = classNumber/2;
	
	//83570 - 41785
	// var radius = map(this.r, 1, 41785, 1, width);
	var radius = map(this.r, 1, 41785, 1, 200);
	var c = map(this.r, 1, 41785, 0, 255);
	noStroke();
	fill(c,255,255,50);
	ellipse(width/2, height/2, radius, radius);
	// textSize(10);
	// fill(217, 0, 0);
	// text(this.classificationName, width/2-radius/2, height/2);
}

function drawCircleGrid(classNumber, className, posX, posY){	
	this.classificationName = className;
	this.r = classNumber/2;
	this.posX = posX;
	this.posY = posY;
	
	//83570 - 41785
	// var radius = map(this.r, 1, 41785, 1, width);
	var radius = map(this.r, 1, 41785, 1, 200);
	var c = map(this.r, 1, 41785, 0, 255);
	// noStroke();
	fill(c,255,255,50);
	stroke(c,255,255);
	ellipse(this.posX, this.posY, radius, radius);
	// line(this.posX, this.posY, this.posX+radius+10, this.posY);
}