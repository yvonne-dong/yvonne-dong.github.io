//setup repo
//work together
//drawing api  -- visual 
//w1003
import ddf.minim.*;
Minim minim;
AudioSample shoot;
AudioSample hurt;
AudioSample bounce;
AudioSample ending;

PImage Finn;
int p1Score;
int p2Score;

boolean p1Up = false;
boolean p1Down =false;
boolean p2Up = false;
boolean p2Down =false;
boolean p1Laser = false;
boolean p2Laser =false;


Ball b;
Paddle p1;
Paddle p2;

void setup() {
  minim = new Minim(this);
  shoot = minim.loadSample("Laser_Shoot.wav", 512);
  hurt = minim.loadSample("hurt.wav", 512);
  bounce = minim.loadSample("bounce.wav", 512);

  Finn = loadImage("finn.png");
  imageMode(CENTER);
  size(500, 500);
  background(0);
  b = new Ball();
  p1 = new Paddle(0);
  p2 = new Paddle(1);
}

void draw() {
  background(0);
  int m = millis();
  if (m < 6000) {
    drawIntro();
  } else {
    noStroke();    
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

    for (int i = 0; i < 501; i = i+20) {
      fill(255);
      rect(width/2, i, 12, 12);
    }

    textSize(36);
    fill(255);
    textAlign(CENTER, CENTER);

    text(p1Score, width/2 - 100, 50);
    text(p2Score, width/2 + 100, 50);



    rectMode(CENTER);
    p1.ballCollision();
    p2.ballCollision();
    b.paddleCollision(p1);
    b.paddleCollision(p2);

    b.update();
    b.display();

    p1.laserCollision();
    p1.update();
    p1.display(); 

    p2.laserCollision();
    p2.update();
    p2.display();
  }
}

void  drawIntro() {
  textSize(20);
  fill(255);
  textAlign(LEFT);

  text("Laser Pong", 30, 100);
  text("Player 1 : [W]/[S] to move,[D] to fire", 30, 130);
  text("Player 2 : [UP]/[DOWN] to move,[LEFT] to fire", 30, 160);
  text("Avoid missing ball for high score", 30, 190);
  text("Don't shoot the ball", 30, 220);
}


//ball
class Ball {
  PVector pos;
  PVector vel;
  float angle;
  float speed = 4;
  float s = 40;

  Ball() {
    pos = new PVector(width/2, height/2);
    vel = new PVector(0, 0);
    angle = random(TWO_PI);
    vel.x = cos(angle) * speed;
    vel.y = sin(angle) * speed;
  }

  void update() {
    if (p2Score >=11) {
      text("Win!", width/2 + 100, 100);
    } else if ( p1Score >=11) {
      text("Win!", width/2 - 100, 100);
    } else if (p2Score <11) {
      if (pos.x<s/2) {
        hurt.trigger();
        p2Score++;
        pos = new PVector(width/2, height/2);
      } else if (pos.x>width-s/2) {
        hurt.trigger();
        p1Score++;
        pos = new PVector(width/2, height/2);
      }

      if (pos.y < s/2 || pos.y > height - s/2) {
        bounce.trigger();
        vel.y *= -1;
      }
      pos.add(vel);
    }
  }

  void display() {
    noStroke();
    fill(255);
    rectMode(CENTER);
    pushMatrix();
    translate(pos.x, pos.y);
    rotate(radians(angle));
    image(Finn, 0, 0);    
    popMatrix();
    angle += 5;
    //rect(pos.x, pos.y, s, s);
  } 

  void paddleCollision(Paddle p) {
    if (pos.x+s/2> p.pos.x-p.w/2 && pos.x-s/2<p.pos.x+p.w/2) {
      if (pos.y+s/2> p.pos.y-p.h/2 && pos.y-s/2<p.pos.y+p.h/2) {
        bounce.trigger();
        vel.x *= -1;
      }
    }
  }
}



//paddle
class Paddle {
  PVector pos;
  float laserPos;
  float laserPosY;
  float w;
  float h;
  int playerNum;


  Paddle(int whichPlayer) {
    playerNum = whichPlayer;
    if (whichPlayer == 0) {
      pos = new PVector(width-15, height/2); 
      laserPos = pos.x;
      laserPosY = pos.y;
      w = 20;
      h =100;
    } else if (whichPlayer == 1) {
      pos = new PVector(15, height/2);
      laserPos = pos.x;
      laserPosY = pos.y;
      w = 20;
      h = 100;
    }
  }

  void update() {
    if (playerNum == 0) {
      if (p1Up) {
        if (pos.y-h/2 > 0) {
          pos.y -= 10;
        }
      }
      if (p1Down) {
        if (pos.y+h/2 < width) {
          pos.y += 10;
        }
      }
      if (p1Laser) {        
        laserPosY = pos.y;
        stroke(0, 135, 255);
        strokeWeight(5);        
        line(laserPos+20, laserPosY-10, laserPos+10, laserPosY-10);
        line(laserPos+20, laserPosY+10, laserPos+10, laserPosY+10);

        line(laserPos, laserPosY, laserPos+10, laserPosY);        
        laserPos -= 5;
        noStroke();

        if (laserPos < -10) {
          p1Laser = false;
          laserPos = pos.x;
          laserPosY = pos.y;
        }
      }
    }

    if (playerNum ==1) {
      if (p2Up) {
        if (pos.y-h/2>0) {
          pos.y -= 7;
        }
      }
      if (p2Down) {
        if (pos.y+h/2< width) {
          pos.y += 7;
        }
      }
      if (p2Laser) {
        laserPosY = pos.y;
        stroke(255, 199, 0);
        strokeWeight(5);        
        line(laserPos-10, laserPosY-10, laserPos, laserPosY-10);
        line(laserPos-10, laserPosY+10, laserPos, laserPosY+10);

        line(laserPos, laserPosY, laserPos+10, laserPosY);
        laserPos += 5;
        noStroke();

        if (laserPos > width + 10) {
          p2Laser = false;
          laserPos = pos.x;
          laserPosY = pos.y;
        }
      }
    }
  }

  void display() {
    fill(255);
    rectMode(CENTER);
    rect(pos.x, pos.y, w, h);
  }

  void laserCollision() {
    if (p1.laserPos == p2.pos.x && p1.laserPosY > p2.pos.y - p2.h/2 
      && p1.laserPosY < p2.pos.y + p2.h/2) {
      hurt.trigger();
      p2Score ++;
      b.display();
      //p1Laser = false;
    }
    if (p2.laserPos == p1.pos.x && p2.laserPosY > p1.pos.y - p1.h/2 
      && p2.laserPosY < p1.pos.y + p1.h/2) {
      hurt.trigger();
      p1Score++;
      b.display();
      //p2Laser = false;
    }
  }

  void ballCollision() {
    if (p1.laserPos > b.pos.x - b.s/2 && p1.laserPos < b.pos.x + b.s/2 
      && p1.laserPosY > b.pos.y - b.s/2 && p1.laserPosY < b.pos.y + b.s/2) {
      hurt.trigger();
      p1Score ++;
    } else if (p2.laserPos + 10 > b.pos.x - b.s/2 && p2.laserPos + 10 < b.pos.x + b.s/2 
      && p2.laserPosY > b.pos.y - b.s/2 && p2.laserPosY < b.pos.y + b.s/2) {
      hurt.trigger();
      p2Score ++;
    }
  }
}

void keyPressed() {
  if (key == CODED) {
    if (keyCode == UP) {
      p1Up = true;
    }
    if (keyCode == DOWN) {
      p1Down = true;
    }
    if (keyCode == LEFT) {
      shoot.trigger();
      p1Laser = true;
    }
  }

  if (key == 'w') {
    p2Up = true;
  }

  if (key == 's') {
    p2Down = true;
  }
  if (key == 'd') {
    shoot.trigger();
    p2Laser = true;
  }
}

void keyReleased() {
  if (key == CODED) {
    if (keyCode == UP) {
      p1Up = false;
    }
    if (keyCode == DOWN) {
      p1Down = false;
    }
  }

  if (key == 'w') {
    p2Up = false;
  }

  if (key == 's') {
    p2Down = false;
  }
}