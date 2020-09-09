/* 
reference
    Attractor & mover by Daniel Shiffman: https://natureofcode.com/book/chapter-2-forces/
*/

var Attractor = function () {
    this.pos = createVector(0, 0);
    this.mass = 20;
    this.gravity = 1;

    this.attraction = function (move) {
        var force = p5.Vector.sub(this.pos, move.pos);
        var dist = force.mag();
        dist = constrain(dist, 5, 25); //change
        force.normalize();
        var strength = (this.gravity * this.mass * move.mass) / (dist * dist);
        force.mult(strength);
        return force;
    }

    this.display = function () {
        push();
        translate(this.pos.x, this.pos.y);
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);
        sphere(this.mass * 2);
        pop();
    }

    this.update = function(){

    }
}