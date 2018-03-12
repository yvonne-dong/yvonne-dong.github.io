
function otherHand(pos){
	if (pos) {
		this.pos = pos.copy();
	} 
	else {
		this.pos = createVector(random(width), random(height));
	}

	this.pos = createVector(random(width), random(height));
	this.vel = p5.Vector.random2D();
	var otherimg = loadImage("assets/cat"+floor(random(1,3))+".png");
	this.margin = createVector(2, 2);

	this.checkMargin = function(){
		if (this.pos.x < 0) {
        	this.pos.x = width - this.margin.x;
        } else if (this.pos.x > width) {
        	this.pos.x = this.margin.x;
        }

        if (this.pos.y < 0){
        	this.pos.y = height - this.margin.y;
      	} else if (this.pos.y > height) {
      		this.pos.y = this.margin.y;
      	}
	}

	this.display = function(){
		push();
		translate(this.pos.x, this.pos.y);
		scale(0.05);
		image(otherimg, 0, 0);
		pop();
	}

	this.update = function(){
		this.pos.add(this.vel);
	}

	this.heart = function(){
		image(h, this.pos.x, this.pos.y);
	}
	// this.breakup = function(){
	// 	//push();
	// 	// translate(this.pos.x, this.pos.y);
	// 	// scale(0.05);
	// 	// image(heart, this.pos.x, this.pos.y);
	// 	// pop();
	// 	var newH = [];
	// 	newH[0] = new otherHand(this.pos);
	// 	newH[1] = new otherHand(this.pos);
	// 	return newH;
	// }
}


