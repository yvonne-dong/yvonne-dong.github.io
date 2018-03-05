// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 5
// choose your own adventure data

// scene data model: 

// {
//   sceneText: '', //the scene text
//   options: [], // the text options to choose
//   nextScenes: []  // the target scene based on the previous options
// }

var sceneData;
var pg;
var part;

var currentScene = 0;
var scenes = [];

function preload() {
  sceneData = loadJSON('scenes.json');
}

function setup() {
  createCanvas(800, 800, WEBGL);
  pg = createGraphics(400,400);
  CreateScenesFromData(sceneData.scenes);
}

function draw() {
  //background(231, 190, 150);
  scenes[currentScene].display();
  scenes[currentScene].update();
}

function CreateScenesFromData(data) {
  for (var i = 0; i < data.length; i++) {
    scenes.push(new Scene(data[i].sceneText, data[i].options, data[i].nextScenes, 
      data[i].side, data[i].blue[int(random(5))], createVector(data[i].x, data[i].y)))
  }
}

var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(-20, 20);
  this.position = createVector(0, 0);
  this.lifespan = 50.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 5;
};

Particle.prototype.display = function() {
  stroke(255, 0, blue + sin(frameCount * 0.05) * 80);
  fill(255, 0, blue + sin(frameCount * 0.05) * 80, 50);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  strokeWeight(1);
  sphere(50, this.side, this.side - 2);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 10);
    }
  }  
};

function Scene(sceneText, options, nextScenes, side, blue, x, y) {
  this.sceneText = sceneText;
  this.options = options;
  this.nextScenes = nextScenes;
  this.side = side;
  this.blue = blue;
  this.x = x;
  this.y = y;

  this.update = function(){
    part.addParticle();
    part.run();
  }

  this.display = function() {
    background(0);
    pg.background(0);
    pg.fill(255);
    pg.textSize(10);
    pg.text("press the option number to advance to the indicated scene", 20, 10);
    pg.text(this.sceneText, 20, 30);
    pg.text("1", width/4-2, height/4-55);
    pg.text("2", width/4-60, height/4+3);
    pg.text("3", width/4+55, height/4+3);
    pg.text("4", width/4-2, height/4+59);

    for (var i = 0; i < options.length; i++) {
      pg.textSize(10);
      pg.fill(255);
      pg.text((i + 1) + ': ' + this.options[i], 20, 50 + i * 20);
    }
    push();
    translate(0, 0, -60);
    texture(pg);
    plane(800);
    stroke(255, 0, blue + sin(frameCount * 0.05) * 80);
    fill(255, 0, blue + sin(frameCount * 0.05) * 80, 50);
    triangle(-20, -100, 0, -140, 20, -100);
    triangle(-100, -20, -140, 0, -100, 20);
    triangle(100, -20, 140, 0, 100, 20);
    triangle(-20, 100, 0, 140, 20, 100);
    pop();
    push();
    translate(this.x, this.y, 0);
    part = new ParticleSystem(createVector(0,0));
    pop();
  }
}

function keyPressed() {
  var numberPressed = parseInt(key);
  var newScene = scenes[currentScene].nextScenes[numberPressed - 1];
  if (newScene !== undefined) {
    currentScene = newScene;
  }
}