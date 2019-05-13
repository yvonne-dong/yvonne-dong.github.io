/*
try to use callback:
https://stackoverflow.com/questions/51984930/correct-way-to-use-loadimage-in-p5-js
*/

var count = 0;

function setup(){
	createCanvas(1280, 640);
	// createCanvas(500, 500);
	rectMode(CENTER);
	imageMode(CENTER);

	
}

function draw(){
	background(255);
	// noFill();
	stroke(0,255,255);
	// strokeWeight(10);
	// rect(width/2, height/2,width,height);

	strokeWeight(1);
	for (var x = 0; x < width; x += 40){
		line(x, 0, x, height);
	}
	for (var y = 0; y < height; y += 40){			
		line(0, y, width, y);
	}

	// loadImage('assets/garlic=richair.jpg', img => {
 //    	image(img, width/2, height/2, img.width/2, img.height/2);
 //  	});


	

	// for (var x = 200; x < width; x += 200){
	// 	for (var y = 200; y < height; y += 200){
	// 		if (dist(mouseX, mouseY, x, y) < 100) {
	// 			fill(50);
				
	// 		} else {
	// 			fill(255);
	// 		}
			
	// 		strokeWeight(5);
	// 		rect(x, y, 200, 200);
	// 	}
	// }
}