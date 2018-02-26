// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 4
// pong with all colliders

var sceneState = {
  INTRO: 0,
  GAME: 1,
  COLLIDER: 2,
  END: 3
};

var currentState = sceneState.INTRO;
var colliderTimer = 0;
var colliderTimer2 = 0;

var keyOn = false;


var ball;
var p1, p2;
var p1Score = 0;
var p2Score = 0;
var p1Up = false;
var p1Down = false;
var p2Up = false;
var p2Down = false;
var margin = 20;
var cnv;
var paddleBounceSFX, hitColliderSFX;
var colliders = [];

var r1 = 255;
var g1 = 255;
var r2 = 255;
var g2 = 255;
var b = 255;

function preload() {

}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function setup() {
  paddleBounceSFX = loadSound('assets/ballCollide.mp3', function() { console.log("loaded"); });
  hitColliderSFX = loadSound('assets/hitCollider.mp3', function() { console.log("loaded"); });
  cnv = createCanvas(900, 500);
  centerCanvas();
  ball = new Ball();
  p1 = new Paddle(0);
  p2 = new Paddle(1);
}

function draw() {
  drawScene(currentState);
  checkTransition(currentState);
  keyOn = false; 

}

  function drawScene(whichScene) {
    switch (currentState) {
      case sceneState.INTRO:       
      p1Score = 0;
      p2Score = 0;
      var g1 = 255;
      var g2 = 255;
      if(millis() > 1000){
        background(250, 150 - sin(frameCount * 0.02) * 60, 0);
        fill(255);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Instructions:", width/2, height/2-150);
        text("P1: W & S for up & down", width/2, height/2-100);
        text("P2: Up & Down arrow for up & down", width/2, height/2-50);
        text("Hit the colliders to get extra point", width/2, height/2);
        textSize(50);
        text("Press Enter to start the game", width/2, height/2+100);
      } else{
        background(250, 150 - sin(frameCount * 0.02) * 60, 0);
        fill(255);
        textSize(60);
        textAlign(CENTER, CENTER);
        text("Pong Game", width/2, height/2);
      }
      break;

      case sceneState.GAME:
        background(0);
        drawField();
        p1.move(p1Up, p1Down);
        p2.move(p2Up, p2Down);

        ball.update();
        p1.update();
        p2.update();
        
        p1.display();
        p2.display();

        
        ball.display(); 

        checkCollisionWithBall(ball, p1);
        checkCollisionWithBall(ball, p2);

        for (var i = 0; i < colliders.length; i++) {
           colliders[i].update();
         }

         for (var i = 0; i < colliders.length; i++) {
            colliders[i].display();
         }

        if (p1Score == p2Score && p1Score > 0 && p2Score > 0){
         if (colliderTimer < p1Score){
            colliders.push(new Star1());        
         }
         colliderTimer = p1Score;            
        } 

      break;

      case sceneState.COLLIDER:
        var textS = 20 + sin(frameCount * 0.01)*10;
        var timeLeft = 80 - int(millis()/1000);
        background(0);
        drawField();
        textSize(textS);
        fill(250, 150 - sin(frameCount * 0.02) * 60, 0, 200);
        textAlign(CENTER, CENTER);
        text(timeLeft + " secs left", width/2, height/2);

        p1.move(p1Up, p1Down);
        p2.move(p2Up, p2Down);

        ball.update();
        p1.update();
        p2.update();
        
        p1.display();
        p2.display();

        
        ball.display(); 

        checkCollisionWithBall(ball, p1);
        checkCollisionWithBall(ball, p2);
        for (var i = 0; i < colliders.length; i++) {
           colliders[i].update();
        }

        for (var i = 0; i < colliders.length; i++) {
            colliders[i].display();
        }

        for (var i = 0; i < colliders.length; i++) {
           checkCollisionWithBall(ball, colliders[i]);
        } 

        if (p1Score == p2Score && p1Score > 0 && p2Score > 0){
         if (colliderTimer < p1Score){
            colliders.push(new Star1());        
         }
         colliderTimer = p1Score;            
        } 

        if (colliderTimer2 % 4 == 0){
          colliders.push(new Star2());    
        }
        colliderTimer2 += 0.4;
      break;

      case sceneState.END:
      background(250, 150 - sin(frameCount * 0.02) * 60, 0);
      fill(255);
      textSize(30);
      textAlign(CENTER, CENTER);
      text("The end", width/2, height/2-150);
      text("P1 score: " + p1Score, width/2, height/2-100);
      text("P2 score: " + p2Score, width/2, height/2-50);
      if (p1Score > p2Score){
        text("P1 won!", width/2, height/2);
      } else if (p1Score < p2Score){
        text("P2 won!", width/2, height/2);
      } else if (p1Score == p2Score){
        text("It's a tie!", width/2, height/2);
      }
      textSize(50);
      text("Press Enter to restart the game", width/2, height/2+100);
      break;
      default:
      break;
    }
  }

  function checkTransition(whichScene){
    switch (whichScene) {
    case sceneState.INTRO:
      if (keyOn) {
        currentState++;
        setUpScene(currentState);
      }
      break;

    case sceneState.GAME:
      if (p1Score >= 5 || p2Score >= 5) {
        currentState = sceneState.COLLIDER;
        setUpScene(currentState);
      }
      break;

    case sceneState.COLLIDER:
      var gameTimer = millis();
      if (int(millis()/1000) > 80){
        currentState = sceneState.END;
        setUpScene(currentState);
      }
      break;
 
    case sceneState.END:
    colliders.shift();
      if (keyOn) {
        currentState++;
        setUpScene(currentState);
      }
      if (currentState > 3){
        currentState = 0;
        p1Score = 0;
        p2Score = 0;
      }
      break;
    default:
      break;
    }
  }

  function setUpScene(whichScene) {
  switch (whichScene) {
    case sceneState.INTRO:
      break;
    case sceneState.GAME:
      gameTimer = millis();
      break;
    case sceneState.COLLIDER:
      break;
    case sceneState.END:
      break;
    default:
      break;
  }
}

function drawField() {
  stroke(255);
  noFill();
  line(0, margin, width, margin);
  line(0, height - margin, width, height - margin);
  for (var i = margin; i < height - margin - 15; i += 35) {
    var start = i;
    var finish = start + 15;
    line(width/2, start, width/2, finish);
  }

  //fill(255);
  noStroke();
  textSize(64);
  textAlign(CENTER, CENTER);
  fill(r1, g1, b);
  text(p1Score, width/2-50, 70);
  fill(r2, g2, b);
  text(p2Score, width/2+50, 70);
}

function checkCollisionWithBall(ball, other) {
  if (ball.pos.x + ball.width/2 > other.pos.x && 
      ball.pos.x + ball.width/2 < other.pos.x + other.width && 
      ball.pos.y + ball.height/2 > other.pos.y &&
      ball.pos.y + ball.height/2 < other.pos.y + other.height) {
    ball.collided(other);
    other.collided(ball);
  }
}

function Ball() {
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0, 0);
  this.angle = random(TWO_PI);
  this.speed = 5;
  this.vel.x = cos(this.angle) * this.speed;
  this.vel.y = sin(this.angle) * this.speed;
  this.width = 15;
  this.height = 15;

  this.update = function() {
    if (this.pos.x < -this.width) {
      p2Score++;
      this.resetAfterPoint(0);
    } else if (this.pos.x > width) {
      p1Score++;
      this.resetAfterPoint(1);
    }

    if (this.pos.y < margin || 
        this.pos.y > height - margin - this.height) {
      this.vel.y *= -1;
    }

    this.pos.add(this.vel);
  };

  this.display = function() {
    noStroke();
    fill(255);
    rectMode(CORNER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.resetAfterPoint = function(whichPlayer) {
    this.pos = createVector(width/2, height/2);
    this.vel = createVector(0, 0);
    this.speed = 7;
    if (whichPlayer === 1) {
      this.getStartingAngle(4 * PI/6, 8 * PI/6);
    } else if (whichPlayer === 0) {
      this.getStartingAngle(-PI/3, PI/3);
    }
  }

  this.getStartingAngle = function(angleLow, angleHigh) {  
    var angle = random(angleLow, angleHigh);
    this.vel.x = cos(angle) * this.speed;
    this.vel.y = sin(angle) * this.speed;
  }

  this.collided = function(other) {
    
  }
};

function Paddle(num) {
  this.num = num;
  this.width = 15;
  this.height = 80;
  if (num == 0) {
    this.pos = createVector(margin, height/2);
  } else {
    this.pos = createVector(width-this.width-margin, height/2);
  }
  this.vel = createVector(0, 0);

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.display = function() {
    noStroke();
    fill(255);
    rectMode(CORNER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.move = function(up, down) {
    this.vel.y = 0;
    if (up) {
      if (this.pos.y > margin) {
        this.vel.y = -5;
      } else {
        this.pos.y = margin;
      } 
    }
    if (down) {
      if (this.pos.y + this.height < height - margin) {
        this.vel.y = 5;
      } else {
        this.pos.y = height - this.height - margin;
      }
    } 
  }

  this.collided = function(other) {
    var diff = (other.pos.y + other.height/2) - this.pos.y;
    if (this.num === 0) {
      angle = map(diff, 0, this.height, -PI/3, PI/3);
    }
    if (this.num === 1) {
      angle = map(diff, this.height, 0, 4*PI/6, 8*PI/6);
    }
    other.speed += 1;
    other.vel.x = cos(angle) * other.speed;
    other.vel.y = sin(angle) * other.speed;
    paddleBounceSFX.play();
  }
}


function keyPressed() {
  if (keyCode === ENTER) {
    keyOn = true;
  }
  if (key === 'W') {
    p1Up = true;
  }
  if (key === 'S') {
    p1Down = true;
  }

  if (keyCode === UP_ARROW) {
    p2Up = true;
  }
  if (keyCode === DOWN_ARROW) {
    p2Down = true;
  }
}

function keyReleased() {
  if (key === 'W') {
    p1Up = false;
  }
  if (key === 'S') {
    p1Down = false;
  }

  if (keyCode === UP_ARROW) {
    p2Up = false;
  }
  if (keyCode === DOWN_ARROW) {
    p2Down = false;
  }
}