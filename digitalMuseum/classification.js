
var method = 'https://api.harvardartmuseums.org/classification?size=100';
//var techniqueNum = 7317;
var apiKey = '&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';

var buttonElement;

//store classification number and name
var classNumName = [];

var classCircleArray = [];
var positionArray = [];

var bgColor;
var mouseDist, displayAllClass, displayThisClass;

function placeCanvas() {
  var x = 90;
  var y = 100;
  cnv.position(x, y);
}

function setup(){
	cnv = createCanvas(1100, 500);
	placeCanvas();

	
	// buttonElement = createButton('classification');
	// buttonElement.mousePressed(buttonPressed);
	colorMode(HSB, 100);	

	for (var col = 50; col < height; col += 90) {
		for (var row = 60; row < width; row += 90) {
			var pos = createVector(row, col);
			positionArray.push(pos);
		}
	}
	bgColor = color(0, 13, 99);
	background(bgColor);
	displayAllClass = true;
	displayIndividualClass = false;

	buttonPressed();
	// console.log(positionArray);

	title = createElement('h2', 'Visualize the HAM Collection');
	titleStyle();
	title.style('left', '150px');
    title.style('top', '0px');
    title.style('width', '600px');

	homeButtonElement = createButton('<');
	homeButtonElement.mousePressed(returnToHome);	
	homeButtonStyle();
	homeButtonElement.style('left', '115px');
    homeButtonElement.style('top', '54px');

    mostActivetitle = createP("- Click on one classification to see the details");
	// mostActiveUrl = createP('http://p5js.org/');
	mostActivetitleStyle();
	mostActivetitle.style('left', '820px');
    mostActivetitle.style('top', '550px');
    mostActivetitle.style('width', '400px');
}

function returnToHome(){
    window.open('homepage.html','_self');
}

function draw(){
	
	background(bgColor);
	// for (var col = 50; col < height; col += 80) {
	// 	for (var row = 50; row < width; row += 100) {
	// 		var pos = createVector(row, col);
	// 		ellipse(row, col, 25, 25);
	// 		// positionArray.push(pos);
	// 	}
	// }

	// text(positionArray.length, width/2, height/2);

	if (displayAllClass == true) {
		bgColor = color(0, 13, 99);
		var distToCenter = int(dist(mouseX, mouseY, width/2, height/2));
		var distAdd = map(distToCenter, 0, 353, 500, 0);
		for (var i = 0; i < classCircleArray.length; i ++){
			// classCircleArray[i].updateCircle();
			mouseDist = int(dist(mouseX, mouseY, classCircleArray[i].pos.x, classCircleArray[i].pos.y));
			if (mouseDist < classCircleArray[i].r/2) {
				classCircleArray[i].circleColor = color(0,0,22);
			} else {
				classCircleArray[i].circleColor = classCircleArray[i].originalColor;
			}
			classCircleArray[i].displayCircle();
		}
		mostActivetitle.html("- Click on one classification to see the details");	
	} else if (displayAllClass == false) {
		// bgColor = color(classCircleArray[displayColor].circleColor, 100, 100);
		fill('#383838');
		rect(0,0, width/2, height);
		fill(bgColor);
		textAlign(CENTER);
		textSize(50);
		textFont('Helvetica');		
		text(classCircleArray[displayThisClass].className, width/4, height/2);
		fill('#383838');
		textSize(20);
		textAlign(LEFT);
		text('The HAM Collection Features '+classCircleArray[displayThisClass].classNum+' pieces of '+classCircleArray[displayThisClass].className, width/2+20, height/2-40, width/4, 100);
		textAlign(RIGHT);
		textSize(15);
		text('click anywhere to go back', width-15, height-15);
		mostActivetitle.html(' ');
	}	

}

function buttonPressed(){
	var url = method + apiKey;	
  	loadJSON(url, getClassfication);
}

function getClassfication(data){
	//draw classification
	for (var i = 0; i < data.info.totalrecords; i ++) {
		var classification = createVector(data.records[i].objectcount, data.records[i].name);
		classNumName.push(classification);
	}

	for (var j = 0; j < classNumName.length; j ++){
		var randomAngle = random(TWO_PI);
		var circle = new classCircle(classNumName[j].x, classNumName[j].y, positionArray[j].x, positionArray[j].y, randomAngle);
		classCircleArray.push(circle);
	}	
}

function classCircle(num, name, x, y, angle){	
	//set up circle
	this.className = name;
	this.classNum = num;

	this.r = int(map(num/2, 1, 41785, 50, 200));
	this.pos = createVector(x, y);
	this.circleColor = map(num/2, 1, 41785, 3, 240);
	this.originalColor = map(num/2, 1, 41785, 3, 240);

	// //update
	// this.speed = map(this.r, 1, 41785, 2, 6);
	// this.angle = angle;
	// this.vel = createVector(0, 1);

	// this.updateCircle = function(){
	// 	if (this.pos.y > height || this.pos.y < 0) {
	// 		this.vel.y *= -1;
	// 	}
	// 	this.pos.add(this.vel);
	// };

	this.displayCircle = function(){
		//83570 - 41785
		// var radius = map(this.r, 1, 41785, 1, width);
		// var radius = map(this.r, 1, 41785, 50, 200);
		// noStroke();
		fill(this.circleColor,100,100,50);
		strokeWeight(3);
		stroke(this.circleColor,100,100);
		ellipse(this.pos.x, this.pos.y, this.r, this.r);
		noStroke();
		textSize(12);
		textAlign(CENTER);
		textFont('Helvetica');
		fill(this.circleColor,100,100);
		text(this.className, this.pos.x-24, this.pos.y+30, 50, 50);
	};
}

function mousePressed() {
	// if (bgColor == '#bcbcbc') {
	// 	for (var change = 0; change < classCircleArray.length; change ++) {			
	// 			classCircleArray[change].mouseEvent();
	// 	}
	// } else {
	// 	bgColor = '#bcbcbc';
	// }
	if (displayAllClass == true) {
		for (var change = 0; change < classCircleArray.length; change ++) {
		mouseDist = int(dist(mouseX, mouseY, classCircleArray[change].pos.x, classCircleArray[change].pos.y));
			if (mouseDist < classCircleArray[change].r / 2) {
				displayAllClass = false;
				displayThisClass = change;
				bgColor = color(classCircleArray[change].originalColor, 100, 100);
				console.log(classCircleArray[displayThisClass].className);
			} 
		}
	} else if (displayAllClass == false) {
		displayAllClass = true;
	}
	
}

