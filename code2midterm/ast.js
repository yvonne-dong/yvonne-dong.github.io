function createAsteroid(type, x, y, rotate, paw) {
  var paw = paw;
  var a = createSprite(x, y);
  var img  = loadImage("assets/asteroid"+paw+".png");

  a.addImage(img);
  //a.addAnimation("normal", "assets/asteroid"+floor(random(0,3))+".png", "assets/asteroid"+floor(random(0,3))+".png", "assets/asteroid"+floor(random(0,3))+".png");

  a.rotationSpeed = rotate;
  //a.rotationSpeed = .5;
  a.type = type;
  
  if(type == 6)
    a.scale = 1.5;
  if(type == 3)
    a.scale = .8;
  if(type == 2)
    a.scale = .6;
  if(type == 1)
    a.scale = .5;
  
  a.mass = 2+a.scale;
  a.setCollider('circle', 0, 0, 50);
  asteroids.add(a);
  return a;
}

function asteroidHit(asteroid, bullet) {
var newType = asteroid.type-2;
var paw = paw;


if(newType>0) {
  createAsteroid(newType, asteroid.position.x, asteroid.position.y - random(50, 100), random(0.1, 1), round(random(0, 2)));
  createAsteroid(newType, asteroid.position.x, asteroid.position.y + random(50, 100), random(0.1, 1), round(random(0, 2)));
  }


for(var i=0; i<10; i++) {
  var p = createSprite(bullet.position.x, bullet.position.y);
  p.scale = 1;
  p.addImage(particleImage);
  p.setSpeed(random(3,5), random(360));
  p.friction = 0.95;
  p.life = 15;
    if (i == 9){
      score ++;
    }
  }

bullet.remove();
asteroid.remove();
}
