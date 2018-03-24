function checkMargin(){
  for(var i=0; i<allSprites.length; i++) {
    var s = allSprites[i];
    if(s.position.x<-MARGIN) {
      s.position.x = width+MARGIN;
    }
    if(s.position.x>width+MARGIN) {
      s.position.x = -MARGIN;
    }
    if(s.position.y<-MARGIN) {
      s.position.y = height+MARGIN;
    }
    if(s.position.y>height+MARGIN) {
      s.position.y = -MARGIN;
    }
  }
}

function Hand(){
  this.display = function(){
    hand = createSprite(width/2, height/2 + 200);
    hand.maxSpeed = 6;
    hand.friction = .02;
    hand.setCollider("circle", 0, 0, 20);

    hand.addImage("normal", handImage);
    hand.addAnimation("thrust", "assets/hand2.png", "assets/hand4.png");
  }
}