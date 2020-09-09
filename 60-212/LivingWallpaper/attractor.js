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
        dist = constrain(dist, 2, 8); //change
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
        sphere(10 + this.mass * 2 * DoubleQuadraticSigmoid(sin(frameCount * 0.01)));
        pop();
    }
}

function DoubleQuadraticSigmoid(x) {
  //function: "Double-Quadratic Sigmoid"
  y = 0;
  if (x <= 0.5) {
    y = sq(2.0 * x) / 2.0;
  }
  else {
    y = 1.0 - sq(2.0 * (x - 1.0)) / 2.0;
  }
  return y;
}
