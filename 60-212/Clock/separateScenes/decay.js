/*
    reference: multiple particle systems in the Nature of Code
    https://p5js.org/examples/simulate-multiple-particle-systems.html
*/
function drawDecay(eggsSystem) {
    for (i = 0; i < eggsSystem.length; i++) {
        eggsSystem[i].update();
        eggsSystem[i].addEgg();
        if (eggsSystem[i].bDead()) {
            eggsSystem.splice(i, 1);
        }
    }
}

function addEggSystem(_system, _pos, _life) {
    this.system = _system;
    this.eggSystem = new Eggs(createVector(_pos.x, _pos.y), _life);
    this.system.push(this.eggSystem);
}

class Eggs {
    constructor(_pos, _life) {
        this.systemPos = _pos.copy();
        this.eggParticles = [];
        this.lifespan = _life;
    }

    addEgg() {
        let p = new Egg(this.systemPos);
        this.eggParticles.push(p);
    }

    update() {
        for (let i = this.eggParticles.length - 1; i >= 0; i--) {
            let p = this.eggParticles[i];
            p.display();
            p.update();
            if (p.bDead()) {
                this.eggParticles.splice(i, 1);
            }

        }
        this.lifespan -= 1;
    }

    bDead() {
        if (this.lifespan < 0) {
            return true;
        } else {
            return false;
        }
    }
}

class Egg {
    constructor(_pos) {
        this.position = _pos.copy();
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(0.02, 0.5));
        this.acceleration = p5.Vector.random2D();
        this.velocity.setMag(random(0, 0.05));
        this.maxSpeed = 1;
        this.lifespan = 100;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
        this.lifespan -= 3;
    }

    display() {
        push();
        strokeWeight(1);
        stroke(255, map(this.lifespan, 100, 0, 255, 0));
        fill(255, map(this.lifespan, 100, 0, 100, 0));
        ellipse(this.position.x, this.position.y, 10, 10);
        pop();
    }

    bDead() {
        if (this.lifespan < 0) {
            return true;
        } else {
            return false;
        }
    }
}