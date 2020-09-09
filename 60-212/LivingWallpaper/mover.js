/* 
reference
    Attractor & mover by Daniel Shiffman: https://natureofcode.com/book/chapter-2-forces/
*/

var Mover = function (mass, x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0.1, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;

    this.addForce = function (force) {
        var f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    this.update = function () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.display = function () {
        let details = parseInt(map(mass, 0.1, 5, 3, 10));
        push();
        translate(this.pos.x, this.pos.y);
        rotateX(frameCount * mass * 0.01);
        rotateY(frameCount * mass * 0.01);
        sphere(this.mass * 3 + sin(frameCount*0.01), details, details);
        pop();
    }
}
