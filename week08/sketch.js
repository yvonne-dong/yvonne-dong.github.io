
var lineX = 0;
var url = 'http://api.open-notify.org/iss-now.json';

var issX = 0;
var issY = 0;


function setup(){
	createCanvas(600, 400);
	// loadJSON(url, gotData, 'jsonp');
	rectMode(CENTER);
	setInterval(askISS, 1000);
}

function askISS(){
	loadJSON(url, gotData, 'jsonp');
}

function gotData(data){
	var lat = data.iss_position.latitude;
	var long = data.iss_position.longitude;
	issX = map(lat, -10, -25, 0, width);
	issY = map(long, -130, -145, 0, height);
}

function draw(){
	background(51);
	noStroke();

	rect(issX, issY, 30, 30);

	stroke(255);
	line(lineX, 0, lineX, height);
	lineX += 2;
	if (lineX > width){
		lineX = 0;
	}
}