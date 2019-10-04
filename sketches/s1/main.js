
var cards = [];
var ogPos = [];
var gridPos = [];
var moveId;
var dragging = false;

function preload(){

}

function setup(){
	createCanvas(585, 600);
	rectMode(CENTER);
	colorMode(HSB);

	movePos = createVector(0, 0);

	for (var x = 50; x < width - 25; x += 60){
		for (var y = 50; y < 200; y += 60){
			oP = createVector(x, y + 350);
			ogPos.push(oP);
			card = new Card(createVector(x, y+350), 50, 
				color(random(360), 90, 90), cards.length);
			// color(random(100, 255), random(5, 25), random(100))
			cards.push(card);
		}				
	}

	for (var x = 50; x < width - 25; x += 60){
		for (var y = 50; y < height/2 + 25; y += 60){
			gP = createVector(x, y);
			gridPos.push(gP);
		}
	}

	strokeWeight(5);
}

function draw(){
	background(0);

	for (var j = 0; j < gridPos.length; j ++){
		noFill();
		stroke(255);
		ellipse(gridPos[j].x, gridPos[j].y, 50, 50);
	}

	for (var i = 0; i < cards.length; i ++){
		cards[i].update();
		cards[i].display();
	}
	
}

// cards class
function Card(_pos, _d, _c, _idx){
	this.pos = _pos;
	this.d = _d;
	this.c = _c;
	this.sC = color(255);
	this.idx = _idx;

	this.display = function(){
		fill(this.c);
		stroke(this.sC);
		console.log(mode % 2);
		rect(this.pos.x, this.pos.y, this.d, this.d);		
	}

	this.update = function(){
		// hover change color
		if (dragging == false){
			if (dist(mouseX, mouseY, this.pos.x, this.pos.y) < this.d/2){
				this.c = color(0);
				this.sC = _c;
				moveId = this.idx;
			} else {
				this.c = _c;
				this.sC = color(255);
			}
		}
	} 
}


function mouseDragged(){
	if (mouseX > 0 && mouseX < width
	 && mouseY > 0 && mouseY < height){
		cards[moveId].pos.x = mouseX;
		cards[moveId].pos.y = mouseY;
		dragging = true;	
	}
}

function mouseReleased(){
	for (var i = 0; i < cards.length; i ++){
		for (var k = 0; k < gridPos.length; k ++){
			if (gridPos[k].dist(cards[i].pos) < cards[i].d/2){
				cards[i].pos.x = gridPos[k].x;
				cards[i].pos.y = gridPos[k].y;
				// cards.pop(cards[i]);
			}
		}
	}
	dragging = false;	
}

function keyPressed(){
	if (key == 'f' || key == 'F'){
		for (var i = 0; i < cards.length; i ++){
			cards[i].pos.x = ogPos[i].x;
			cards[i].pos.y = ogPos[i].y;
		}
	}
}