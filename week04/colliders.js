
function Star1() {
  this.pos = createVector(width/2, height/2);
  this.speed = 3;
  this.angle = random(TWO_PI);
  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.size1 = 8;
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

  this.update = function() {
    if (this.pos.y < margin + 20 || 
        this.pos.y > height - margin - 20) {
      this.vel.y *= -1;
      point ++;
      scaleStar += 0.2;

      if (scaleStar > 4){
        scaleStar = 1;
      }
    }
    this.pos.add(this.vel);

    if (point >= 18) {
      point = 3;
    }

    if (this.pos.x + 20 > p1.pos.x && this.pos.x + 20 < p1.pos.x + p1.width ||
      this.pos.x - 20 > p1.pos.x && this.pos.x - 20 < p1.pos.x + p1.width){
      if (this.pos.y > p1.pos.y && this.pos.y < p1.pos.y + p1.height) {
          this.vel.x *= -1;
          point ++;
          scaleStar += 0.2;
          g1 -= 20;
          p1Score ++;
          hitColliderSFX.play();
      }
    }
    //r1 = 255;

    if (this.pos.x + 20 > p2.pos.x && this.pos.x + 20 < p2.pos.x + p2.width ||
      this.pos.x - 20 > p2.pos.x && this.pos.x - 20 < p2.pos.x + p2.width){
      if (this.pos.y > p2.pos.y && this.pos.y < p2.pos.y + p2.height) {
          this.vel.x *= -1;
          point ++;
          scaleStar += 0.2;
          g2 -= 20;
          p2Score ++;
          hitColliderSFX.play();
      }
    }
  }

  this.display = function() {
    // draw something here
    strokeWeight(1);
    stroke(255, 0, 215 - sin(frameCount * 0.1) * 60);
    fill(255, 0, 215 - sin(frameCount * 0.1) * 60, 200);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(frameCount / 50.0);
    scale(scaleStar);
    this.star(0, 0, this.size1, this.size2, point); 
    pop();
  }
}

 function Star2() {
  this.pos = createVector(0, 0);
  this.speed = 3;
  this.angle = random(TWO_PI);
  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.width = 100;
  this.height = 100;
  this.side = 3;
  var point = this.side;
  var scaleStar = 1;
  this.time = 0;


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

  this.update = function() {
    this.time += .005;
    this.pos.x = (150*sin(this.time * 2)) + (width/2);
    this.pos.y = (150*cos(this.time * 2)) + (height/2);
  }

  

  this.collided = function(other) {
    if (point < 15){
      point ++;
    } else {
      point = 3;
    }
    
    other.angle = random(TWO_PI);
    other.vel.x = cos(other.angle) * other.speed;
    other.vel.y = sin(other.angle) * other.speed;

    if (this.height > 0) {
      this.height -= 2;      
    } else {
      this.height = 100;
    }
  }

  this.display = function() {
    // draw something here
    //rect(this.pos.x, this.pos.y, this.width, this.height);
    strokeWeight(1);
    stroke(255, 215 - sin(frameCount * 0.1) * 60, 0);
    fill(255, 215 - sin(frameCount * 0.1) * 60, 0, 200);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(frameCount / 50.0);
    scale(scaleStar);
    this.star(0, 0, this.width, this.height, point); 
    pop();
  }
 }
