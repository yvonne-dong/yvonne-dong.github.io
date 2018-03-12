
function Highfive(ppos, pangle){
	this.pos = createVector(ppos.x, ppos.y);
	this.vel = p5.Vector.fromAngle(pangle + PI/2);
	this.vel.mult(5);

	this.update = function(){
		this.pos.add(this.vel);
	}
	this.display = function(){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(pangle + PI/1.5);
		scale(0.1);
		image(hitimg, 0, 0);
		pop();
	}

	this.collide = function(other) {
    	if (this.pos.x + 20 > other.pos.x && 
      		this.pos.x + 20 < other.pos.x + 30 && 
      		this.pos.y + 20 > other.pos.y &&
      		this.pos.y + 20 < other.pos.y + 50) {
    		return true;
 		 } else {
 		 	return false;
 		 }
  	}
}