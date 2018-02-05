//pong

var img;
var ball;
var p1;
var p2;

var playerNum;
var whichPlayer;

var p1Up = false;
var p1Down = false;
var p2Up = false;
var p2Down = false;
var p1Laser = false;
var p2Laser = false;

function preload() {
  img = loadImage('assets/finn.png');
}

function setup() {
  createCanvas(500, 500);
  imageMode(CENTER);
  //image(img, 0, 0);

  ball = new Ball();
  p1 = new Paddle(0);
  p2 = new Paddle(1);
}

function draw(){
  background(0);
  ball.paddleCollision1();
  ball.paddleCollision2();
  ball.update();
  ball.display();

  p1.update();
  p1.display();

  p2.update();
  p2.display();
}

//Ball
function Ball(){
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0, 0);
  var s = 60;
  var angle = random(TWO_PI);
  var speed = 4;
  this.vel.x = cos(angle) * speed;
  this.vel.y = sin(angle) * speed;

  this.update = function() {
  	if (this.pos.x < -20){
  	  this.pos.x = width/2;
  	  this.pos.y = height/2;
  	} else if (this.pos.x > width + 20) {
  	  this.pos.x = width/2;
  	  this.pos.y = height/2;
  	}

  	if (this.pos.y < 20 || this.pos.y > height - 20) {
        this.vel.y *= -1;
      }

     this.pos.add(this.vel);
  };

  this.display = function(){
  	noStroke();
    fill(255);
    push();
    applyMatrix(cos(angle), sin(angle), -sin(angle), cos(angle), this.pos.x, this.pos.y);
    image(img, 0, 0);
    pop();
    angle += 0.05;
  }

  this.paddleCollision1 = function (){
    if (this.pos.x+s/2 > p1.pos.x && this.pos.x-s/2 < p1.pos.x) {
      if (this.pos.y+s/2 > p1.pos.y && this.pos.y-s/2 < p1.pos.y) {
        this.vel.x *= -1;
      }
    }
  }

  this.paddleCollision2 = function (){
    if (this.pos.x+s/2 > p2.pos.x && this.pos.x-s/2 < p2.pos.x) {
      if (this.pos.y+s/2 > p2.pos.y && this.pos.y-s/2 < p2.pos.y) {
        this.vel.x *= -1;
      }
    }
  }
}

//Paddle
function Paddle(whichPlayer){
  playerNum = whichPlayer;
  var laserPos;
  var laserPosY;
  var w = 20;
  var h = 100;

  if (whichPlayer == 0){
    this.pos = createVector(width-15, height/2);
    laserPos = this.pos.x;
    laserPosY = this.pos.y;   
  } else if (whichPlayer == 1){
    this.pos = createVector(15, height/2);
    laserPos = this.pos.x;
    laserPosY = this.pos.y;
  }

  this.update = function(){
    if (whichPlayer == 0){
      if (p1Up && this.pos.y - h/2 > 0){
        this.pos.y -= 10;
      }
      if (p1Down && this.pos.y + h/2 < width){
        this.pos.y += 10;
      }
      if (p1Laser) {
        laserPosY = this.pos.y;
        stroke(0, 135, 255);
        strokeWeight(5);        
        line(laserPos+20, laserPosY-10, laserPos+10, laserPosY-10);
        line(laserPos+20, laserPosY+10, laserPos+10, laserPosY+10);

        line(laserPos, laserPosY, laserPos+10, laserPosY);        
        laserPos -= 5;
        noStroke();

        if (laserPos < -10){
          p1Laser = false;
          laserPos = this.pos.x;
          laserPosY = this.pos.y;
        }
      }
    }

    if (whichPlayer == 1){
      if (p2Up && this.pos.y - h/2 > 0){
        this.pos.y -= 10;
      }
      if (p2Down && this.pos.y + h/2 < width){
        this.pos.y += 10;
      }
      if (p2Laser) {
        laserPosY = this.pos.y;
        stroke(255, 199, 0);
        strokeWeight(5);        
        line(laserPos-10, laserPosY-10, laserPos, laserPosY-10);
        line(laserPos-10, laserPosY+10, laserPos, laserPosY+10);

        line(laserPos, laserPosY, laserPos+10, laserPosY);        
        laserPos += 5;
        noStroke();

        if (laserPos > width + 10){
          p2Laser = false;
          laserPos = this.pos.x;
          laserPosY = this.pos.y;
        }
      }
    }
  }

  this.display = function(){
    fill(255);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, w, h);
  }
}


//Keys
function keyPressed() {
  if (key === 'W') {
    p2Up = true;
  }
  if (key === 'S') {
    p2Down = true;
  }
  if (key === 'D'){
    p2Laser = true;
  }

  if (keyCode === UP_ARROW) {
    p1Up = true;
  }
  if (keyCode === DOWN_ARROW) {
    p1Down = true;
  }
  if (keyCode === LEFT_ARROW) {
    p1Laser = true;
  }
}

function keyReleased() {
  if (key === 'W') {
    p2Up = false;
  }
  if (key === 'S') {
    p2Down = false;
  }

  if (keyCode === UP_ARROW) {
    p1Up = false;
  }
  if (keyCode === DOWN_ARROW) {
    p1Down = false;
  }
}


