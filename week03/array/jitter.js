var system;

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width/2, 50));
}

function draw() {
  background(51);
  system.addParticle();
  system.run();
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = createVector(mouseX, mouseY);
  this.lifespan = 200.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  // stroke(200, this.lifespan);
  // strokeWeight(2);
  // fill(127, this.lifespan);
  //ellipse(this.position.x, this.position.y, 12, 12);
  this.speed = 3;
  this.angle = random(TWO_PI);
  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.size1 = 10;
  this.size2 = 20;
  this.side = 3;
  var point = this.side;
  var scaleStar = 1;

  this.star = function(x, y, radius1, radius2, npoints) {
    var angle = TWO_PI / npoints;
    var halfAngle = angle/2.0;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
      var sx = x + cos(a) * radius2;
      var sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a+halfAngle) * radius1;
      sy = y + sin(a+halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  noStroke();
  fill(255, 215 - random(100), 0, this.lifespan);

  if (point <= 18) {
      point ++;
    } else {
      point = 3;
    }
  push();
  translate(this.position.x, this.position.y);
  rotate(frameCount / 50.0);
  this.star(0, 0, this.size1, this.size2, point); 
  pop();


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
      this.particles.splice(i, 1);
    }
  }
};

