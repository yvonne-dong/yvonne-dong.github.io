
var playerimg;
var player;
var otherh = [];
var hit = [];
var otherimg;
var hitimg;
var h;

var turnL = false;
var turnR = false;
var go = false;


function preload(){
	playerimg = loadImage('assets/hand.png');
	hitimg = loadImage('assets/hit.png');
	h = loadImage('assets/heart.png');
}

function setup() {
  createCanvas(800, 600);
  player = new Player();
  //otherh.push(new otherHand());
  imageMode(CENTER);
  //rectMode(CENTER);
  for (var i = 0; i < 10; i ++) {
  	otherh.push(new otherHand());
  }
}

function draw() {
  background(0);
  player.display();
  player.turn(turnL, turnR);
  player.checkMargin();
  player.update();

  for (var i = 0; i < otherh.length; i ++) {
  	otherh[i].display();
  	otherh[i].update();
  	otherh[i].checkMargin();
  }
  for (var i = hit.length-1; i >= 0; i --) {
  	hit[i].display();
  	hit[i].update();
  	for (var j = otherh.length - 1; j >= 0; j --) {
  		if (hit[i].collide(otherh[j])){
  			//image(h, otherh[j].pos.x,otherh[j].pos.y);
  			otherh[j].heart();
  			// otherh = otherh.concat(newOtherh);

  			otherh.splice(j,1);
  			hit.splice(i,1);
  			break;
  		}
  	}
  }
}

function Player(){
	this.pos = createVector(width/2, height/2);
	this.vel = createVector(0, 0);
	this.rotation = -PI/2;
	this.margin = createVector(2, 2);

	this.checkMargin = function(){
		if (this.pos.x < 0) {
        	this.pos.x = width - this.margin.x;
        } else if (this.pos.x> width) {
        	this.pos.x = this.margin.x;
        }

        if (this.pos.y < 0){
        	this.pos.y = height - this.margin.y;
      	} else if (this.pos.y > height) {
      		this.pos.y = this.margin.y;
      	}
	}

	this.update = function(){
        this.pos.add(this.vel);
        this.vel.mult(0.98);
      	this.boost();
	}

	this.display = function(){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.rotation + PI/2);
		scale(0.05);
		image(playerimg, 0, 0);
		pop();
	}

	this.turn = function(left, right){
		if (left) {
			this.rotation -= 0.1;
		}
		if (right) {
			this.rotation += 0.1;
		}		
	}

	this.boost = function (on){
		if (go) {
			var force = p5.Vector.fromAngle(this.rotation);
			force.mult(0.1);
			this.vel.add(force);
		}
	}
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    turnL = true;
  }
  if (keyCode === RIGHT_ARROW) {
    turnR = true;
  }
  if (keyCode === UP_ARROW) {
  	go = true;
  }
  if (key == ' ') {
  	hit.push(new Highfive(player.pos, player.rotation));
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    turnL = false;
  }
  if (keyCode === RIGHT_ARROW) {
    turnR = false;
  }
  if (keyCode === UP_ARROW) {
  	go = false;
  }
  // if (key == ' ') {
  // 	hit5 = false;
  // }
}