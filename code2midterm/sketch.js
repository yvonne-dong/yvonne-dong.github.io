//asteroid clone (core mechanics only)
//arrow keys to move + x to shoot
var sceneState = {
  INTRO: 0,
  LEVEL1: 1,
  LEVEL2: 2,
  LEVEL3: 3,
  LEVEL4: 4,
  END: 5
}

var asterdata;
var asteroiddata = [];
var introTimer = 0;
var gameTimer = 100;

//control asteroid display
var count = 0;
var keyOn = false;
//score counting
var score = 0;

var currentState = sceneState.INTRO;
var bullets;
var asteroids;

//player
var hand;
var handImage, bulletImage, particleImage;
var MARGIN = 40;

function preload(){
  asterdata = loadJSON('asteroiddata.json');
  bulletImage = loadImage("assets/asteroids_bullet.png");
  handImage = loadImage("assets/hand1.png");
  particleImage = loadImage("assets/asteroids_particle.png");
}

function setup() {
createCanvas(800,600);
hand = new Hand();
asteroids = new Group();
bullets = new Group();
}


function draw() {
  drawScene(currentState);
  checkTransition(currentState);
  keyOn = false; 
}


function drawScene(scene) {
  switch (currentState){
    case sceneState.INTRO:
      gameTimer = 100;
      if (introTimer > 100){
        background(0);
        fill(255, 186, 205);
        textSize(20);
        textFont('Verdana');
        textAlign(CENTER, CENTER);
        text("INSTRUCTIONS:", width/2, height/2-150);
        text("LEFT & RIGHT ARROW TO CHANGE DIRECTION", width/2, height/2-100);
        text("UP ARROW TO MOVE FORWARD", width/2, height/2-50);
        text("PRESS SPACE BAR TO HIT HIGHFIVE!", width/2, height/2);
        textSize(40);
        text("PRESS ENTER TO START", width/2, height/2+100);
      } else {
        background(0);
        fill(255, 186, 205);
        textSize(40);
        textFont('Verdana');
        textAlign(CENTER, CENTER);
        text("HIGHFIVE", width/2, height/2);
        introTimer ++;
      }
    break;

    case sceneState.LEVEL1:
      introTimer = 0;
      background(0);
      fill(255, 186, 205);
      textSize(20);
      textFont('Verdana');
      textAlign(CENTER, CENTER);
      text("SCORE: " + score, 80, 40);
      text(asterdata.asteroiddata[0].level, width-80, 40);
      text("TIMER: " + round(gameTimer), width/2, 40);
      if (count == 0){
        gameTimer = 100;
        for ( var i = 0; i < asterdata.asteroiddata[0].asternum; i ++){          
          var pos1 = createVector(asterdata.asteroiddata[0].asterpos[i].x, 
          asterdata.asteroiddata[0].asterpos[i].y);
          var rotation = asterdata.asteroiddata[0].rotate[int(random(5))];
          createAsteroid(2, pos1.x , pos1.y, rotation, asterdata.asteroiddata[0].paw);
          count = 1;
        }
      }

      hand.display();
      checkMargin();
      asteroids.overlap(bullets, asteroidHit);   
      hand.bounce(asteroids);
      if(keyDown(LEFT_ARROW)) {
        hand.rotation -= 4;
      }
      if(keyDown(RIGHT_ARROW)) {
        hand.rotation += 4;
      }
      if(keyDown(UP_ARROW)){
        hand.addSpeed(0.2, hand.rotation);
        hand.changeAnimation("thrust");
      } else {
        hand.changeAnimation("normal");
      }
      
      if(keyWentDown(' '))
      {
        var bullet = createSprite(hand.position.x, hand.position.y);
        bullet.scale = 1.5;
        push();
        bullet.rotation = hand.rotation;
        bullet.addImage(bulletImage);
        pop();
        bullet.setSpeed(10+hand.getSpeed(), hand.rotation);
        bullet.life = 30;
        bullets.add(bullet);
      }      
      drawSprites(); 
      gameTimer -= 0.05;
    break;

    case sceneState.LEVEL2:
      background(0);
      fill(255, 186, 205);
      textSize(20);
      textFont('Verdana');
      textAlign(CENTER, CENTER);
      text("SCORE: " + score, 80, 40);
      text(asterdata.asteroiddata[1].level, width-80, 40);
      text("TIMER: " + round(gameTimer), width/2, 40);
      //var rotation = asterdata.asteroiddata[1].rotate[int(random(5))];
      if (count == 1){
        gameTimer = 85;
        for ( var i = 0; i < asterdata.asteroiddata[1].asternum; i ++){
          var pos1 = createVector(asterdata.asteroiddata[1].asterpos[i].x, 
          asterdata.asteroiddata[1].asterpos[i].y);
          var rotation = asterdata.asteroiddata[1].rotate[int(random(5))];
          createAsteroid(3, pos1.x , pos1.y, rotation, asterdata.asteroiddata[1].paw);
          count = 0;
        }
      }
      hand.display();
      checkMargin();
      asteroids.overlap(bullets, asteroidHit);   
      hand.bounce(asteroids);
      if(keyDown(LEFT_ARROW)) {
        hand.rotation -= 4;
      }
      if(keyDown(RIGHT_ARROW)) {
        hand.rotation += 4;
      }
      if(keyDown(UP_ARROW)){
        hand.addSpeed(0.2, hand.rotation);
        hand.changeAnimation("thrust");
      } else {
        hand.changeAnimation("normal");
      }
      
      if(keyWentDown(' '))
      {
        var bullet = createSprite(hand.position.x, hand.position.y);
        bullet.scale = 1.5;
        push();
        bullet.rotation = hand.rotation;
        bullet.addImage(bulletImage);
        pop();
        bullet.setSpeed(10+hand.getSpeed(), hand.rotation);
        bullet.life = 30;
        bullets.add(bullet);
      }      
      drawSprites(); 
      gameTimer -= 0.05;
    break;

    case sceneState.LEVEL3:
      background(0);
      fill(255, 186, 205);
      textSize(20);
      textFont('Verdana');
      textAlign(CENTER, CENTER);
      text("SCORE: " + score, 80, 40);
      text(asterdata.asteroiddata[2].level, width-80, 40);
      text("TIMER: " + round(gameTimer), width/2, 40);
      if (count == 0){
        gameTimer = 65;
        for ( var i = 0; i < asterdata.asteroiddata[2].asternum; i ++){
          var pos1 = createVector(asterdata.asteroiddata[2].asterpos[i].x, 
          asterdata.asteroiddata[2].asterpos[i].y);
          var rotation = asterdata.asteroiddata[2].rotate[int(random(5))];
          createAsteroid(3, pos1.x , pos1.y, rotation, asterdata.asteroiddata[2].paw);
          count = 1;
        }
      }
      hand.display();
      checkMargin();
      asteroids.overlap(bullets, asteroidHit);   
      hand.bounce(asteroids);
      if(keyDown(LEFT_ARROW)) {
        hand.rotation -= 4;
      }
      if(keyDown(RIGHT_ARROW)) {
        hand.rotation += 4;
      }
      if(keyDown(UP_ARROW)){
        hand.addSpeed(0.2, hand.rotation);
        hand.changeAnimation("thrust");
      } else {
        hand.changeAnimation("normal");
      }
      
      if(keyWentDown(' '))
      {
        var bullet = createSprite(hand.position.x, hand.position.y);
        bullet.scale = 1.5;
        push();
        bullet.rotation = hand.rotation;
        bullet.addImage(bulletImage);
        pop();
        bullet.setSpeed(10+hand.getSpeed(), hand.rotation);
        bullet.life = 30;
        bullets.add(bullet);
      }      
      drawSprites(); 
      gameTimer -= 0.05;
    break;

    case sceneState.LEVEL4:
      background(0);
      fill(255, 186, 205);
      textSize(20);
      textFont('Verdana');
      textAlign(CENTER, CENTER);
      text("SCORE: " + score, 80, 40);
      text(asterdata.asteroiddata[3].level, width-80, 40);
      text("TIMER: " + round(gameTimer), width/2, 40);
      if (count == 1){
        gameTimer = 45;
        for ( var i = 0; i < asterdata.asteroiddata[3].asternum; i ++){
          var pos1 = createVector(asterdata.asteroiddata[3].asterpos[i].x, 
          asterdata.asteroiddata[3].asterpos[i].y);
          var rotation = asterdata.asteroiddata[3].rotate[int(random(5))];
          createAsteroid(6, pos1.x , pos1.y, rotation, asterdata.asteroiddata[3].paw);
          count = 0;
        }
      }
      hand.display();
      checkMargin();
      asteroids.overlap(bullets, asteroidHit);   
      hand.bounce(asteroids);
      if(keyDown(LEFT_ARROW)) {
        hand.rotation -= 4;
      }
      if(keyDown(RIGHT_ARROW)) {
        hand.rotation += 4;
      }
      if(keyDown(UP_ARROW)){
        hand.addSpeed(0.2, hand.rotation);
        hand.changeAnimation("thrust");
      } else {
        hand.changeAnimation("normal");
      }
      
      if(keyWentDown(' '))
      {
        var bullet = createSprite(hand.position.x, hand.position.y);
        bullet.scale = 1.5;
        push();
        bullet.rotation = hand.rotation;
        bullet.addImage(bulletImage);
        pop();
        bullet.setSpeed(10+hand.getSpeed(), hand.rotation);
        bullet.life = 30;
        bullets.add(bullet);
      }      
      drawSprites(); 
      gameTimer -= 0.05;
    break;

    case sceneState.END:
      background(0);
      gameTimer = 100;
      fill(255, 186, 205);
      textSize(30);
      textFont('Verdana');
      textAlign(CENTER, CENTER);
      text("END", width/2, height/2-150);
      textSize(40);
      text("SCORE: "+score, width/2, height/2-100);
      text("PRESS ENTER TO RESTART!", width/2, height/2);
    break;
    default:
    break;
  }
}

function checkTransition(scene){
  switch(scene){
    case sceneState.INTRO:
    if (keyOn) {
      currentState++;
      setUpScene(currentState);
    }
    break;

    case sceneState.LEVEL1:
    //if (keyOn) {
    if (score >= 5) {
      currentState++;
      setUpScene(currentState);
    }
    if (gameTimer <= 0) {
      currentState = sceneState.END;
      setUpScene(currentState);
    }
    break;

    case sceneState.LEVEL2:
    //if (keyOn) {
    if (score >= 29) {
      currentState++;
      setUpScene(currentState);
    }
    if (gameTimer <= 0) {
      currentState = sceneState.END;
      setUpScene(currentState);
    }
    break;

    case sceneState.LEVEL3:
    //if (keyOn) {
    if (score >= 59) {
      currentState++;
      setUpScene(currentState);
    }
    if (gameTimer <= 0) {
      currentState = sceneState.END;
      setUpScene(currentState);
    }
    break;

    case sceneState.LEVEL4:
    //if (keyOn) {
    if (score >= 80) {
      currentState++;
      setUpScene(currentState);
    }
    if (gameTimer <= 0) {
      currentState = sceneState.END;
      setUpScene(currentState);
    }
    break;

    case sceneState.END:
    if (keyOn) {
      currentState++;
      setUpScene(currentState);
    }
    if (currentState > 5){
      currentState = 0;
      gameTimer = 100;
    }
    break;

    default:
    break;
  }
}

function setUpScene(scene){
  switch (scene) {
    case sceneState.INTRO:
      break;
    case sceneState.LEVEL1:
      break;
    case sceneState.LEVEL2:
      break;
    case sceneState.LEVEL3:
      break;
    case sceneState.LEVEL4:
      break;
    case sceneState.END:
      break;
    default:
    break;
  }
}

function keyPressed(){
  if (keyCode === ENTER) {
    keyOn = true;
  }
}