/*
    reference: Flocking by Coding Train 
    https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
*/

class Mayfly {
    constructor(_pos, _scene) {
        this.position = _pos;
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(3, 5));
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 8;
    }

    bDead() {
        if (this.lifespan < 0) {
            return true;
        } else {
            return false;
        }
    }

    // call when transitioning from stage 1 to 2 (emerge to swarm)
    resetValues() {
        this.velocity.setMag(random(0.5, 5));
        this.maxSpeed = 8;
    }

    edges(centerX, centerY, bound) {
        if (this.position.x > centerX + bound / 2) {
            this.position.x = centerX - bound / 2;
        } else if (this.position.x < centerX - bound / 2) {
            this.position.x = centerX + bound / 2;
        }
        if (this.position.y > centerY + bound / 2) {
            this.position.y = centerY - bound / 2;
        } else if (this.position.y < centerY - bound / 2) {
            this.position.y = centerY + bound / 2;
        }

    }

    // align moving direction of mayfly with other
    align(mayflies) {
        let checkRadius = 15;
        let steering = createVector();
        let total = 0;
        for (let other of mayflies) {
            let d = dist(this.position.x, this.position.y,
                other.position.x, other.position.y);
            if (other != this && d < checkRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    // if the mayflies are too close, separate them
    separation(mayflies) {
        let checkRadius = 14;
        let steering = createVector();
        let total = 0;
        for (let other of mayflies) {
            let d = dist(this.position.x, this.position.y,
                other.position.x, other.position.y);
            if (other != this && d < checkRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d * d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    // align position of mayfly with other
    cohesion(mayflies) {
        let perceptionRadius = 25;
        let steering = createVector();
        let total = 0;
        for (let other of mayflies) {
            let d = dist(this.position.x, this.position.y,
                other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    swarm(mayflies, ali, sep, coh) {
        let alignment = this.align(mayflies);
        let cohesion = this.cohesion(mayflies);
        let separation = this.separation(mayflies);

        alignment.mult(ali);
        cohesion.mult(sep);
        separation.mult(coh);

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }


    display() {
        // draw mayfly

        // rect(this.position.x, this.position.y, 20, 20);
        let angle = this.velocity.heading() + radians(90);
        push();
        fill(255, 80);
        stroke(255);
        translate(this.position.x, this.position.y);
        rotate(angle);
        beginShape();
        vertex(0, 0);
        let movement = sin(frameCount * this.velocity.mag() * 0.05) * this.velocity.mag();
        vertex(10, 10 + movement);
        // vertex(0, 8);
        // vertex(4, 20);
        // vertex(0, 0);
        // vertex(-4, 20);
        vertex(0, 8);
        vertex(-10, 10 + movement);
        endShape(CLOSE);
        pop();
    }

    decay() {

    }
}