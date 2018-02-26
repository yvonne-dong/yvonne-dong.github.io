//pong

var img;
var ball;
var p1;
var p2;
var p1Score = 0;
var p2Score = 0;

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
  var m = millis();
  if (m < 1000){
  	drawIntro();
  } else {

  	
    for (var i = 0; i < 501; i = i+20) {
      fill(255);
      rect(width/2, i, 12, 12);
    }

    drawScore();

  	ball.paddleCollision1();
  	ball.paddleCollision2();
  	ball.update();
  	ball.display();

  	p1.update();
  	p1.display();
  	p1.laserCollision();
  	p2.update();
  	p2.display();
  	p2.laserCollision(); 	
  }
}

//Intro
function drawIntro(){
	textSize(20);
  	fill(255);
  	textAlign(LEFT);

  	text('Laser Pong', 30, 100);
  	text('Player 1 : [W]/[S] to move,[D] to fire', 30, 130);
  	text('Player 2 : [UP]/[DOWN] to move,[LEFT] to fire', 30, 160);
  	text('Avoid missing ball for high score', 30, 190);
  	text('Do not shoot the ball', 30, 220);
}

//Score
function drawScore(){
	if (p1Score > p2Score) {      
      rectMode(CORNER);
      if (p1Score >= 11) {
        fill(156, 207, random(150, 252), 300);
      } else {
        fill(156, 207, 252, 300);
      }
      rect(0, 0, width/2, height);
    } else if (p2Score > p1Score) {
      rectMode(CORNER);
      if (p2Score >= 11) {
        fill(255, random(150, 225), 122, 300);
      } else {
        fill(255, 225, 122, 300);
      }
      rect(width/2, 0, width, height);
    }

	textSize(36);
    fill(255);
    textAlign(CENTER, CENTER);
    text(p1Score, width/2 - 100, 50);
    text(p2Score, width/2 + 100, 50);    
}

//Ball
function Ball(){
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0, 0);
  var s = 50;
  var angle = random(TWO_PI);
  var speed = 4;
  this.vel.x = cos(angle) * speed;
  this.vel.y = sin(angle) * speed;

  this.update = function() {
  	if (p2Score >= 11){
  		text("Win!", width/2 + 100, 100);
  	} else if (p1Score >= 11){
  		text("Win!", width/2 - 100, 100);
  	} else if (p1Score < 11 || p2Score < 11) {
  	if (this.pos.x < -20){
  		p2Score++;
  		this.pos.x = width/2;
  		this.pos.y = height/2;
  	} else if (this.pos.x > width + 20) {
  		p1Score++;
  		this.pos.x = width/2;
  		this.pos.y = height/2;
  	}

  	if (this.pos.y < 20 || this.pos.y > height - 20) {
        this.vel.y *= -1;
      }

     this.pos.add(this.vel);
 	}
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
      if (this.pos.y+s > p1.pos.y && this.pos.y-s < p1.pos.y) {
        this.vel.x *= -1;
      }
    }
  }

  this.paddleCollision2 = function (){
    if (this.pos.x+s/2 > p2.pos.x && this.pos.x-s/2 < p2.pos.x) {
      if (this.pos.y+s > p2.pos.y && this.pos.y-s < p2.pos.y) {
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

  this.laserCollision = function(){
  	if (p1.laserPos == p2.pos.x && p1.laserPosY > p2.pos.y - p2.h/2 
      && p1.laserPosY < p2.pos.y + p2.h/2) {
      p2Score ++;
    }
    if (p2.laserPos == p1.pos.x && p2.laserPosY > p1.pos.y - p1.h/2 
      && p2.laserPosY < p1.pos.y + p1.h/2) {
      p1Score ++;
    }
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