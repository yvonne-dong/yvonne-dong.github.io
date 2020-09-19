class Pond {
    constructor(_r, _pos) {
        this.position = _pos;
        this.r = _r;
        this.numPoints = 50;
    }

    display() {
        strokeWeight(1);
        stroke(255);
        fill(255);

        beginShape();
        vertex(0, 0);
        vertex(width, 0);
        vertex(width, height);
        vertex(0, height);
        beginContour();
        for (let i = TWO_PI; i > 0; i -= 0.1) {
            vertex(this.position.x + cos(i) * this.r / 1.8 - noise(frameCount * 0.02 + i) * 30,
                this.position.y + sin(i) * this.r / 1.8 - noise(frameCount * 0.02 + i) * 30);
        }
        endContour();
        endShape(CLOSE);

        stroke(0);
        strokeWeight(15);
        noFill();
        beginShape();
        for (let i = 0; i < TWO_PI; i += 0.1) {
            vertex(this.position.x + cos(i) * this.r / 1.7 - noise(frameCount * 0.01 + i) * 30,
                this.position.y + sin(i) * this.r / 1.7 - noise(frameCount * 0.01 + i) * 30);
        }
        endShape(CLOSE);

        stroke(255);
        strokeWeight(1);
        fill(255, 20);
        beginShape();
        for (let i = 0; i < TWO_PI; i += 0.1) {
            vertex(this.position.x + cos(i) * this.r / 2 + noise(frameCount * 0.021 + i) * 30,
                this.position.y + sin(i) * this.r / 2 + noise(frameCount * 0.016 + i) * 30);
        }
        endShape(CLOSE);
        beginShape();
        for (let i = 0; i < TWO_PI; i += 0.1) {
            vertex(this.position.x + cos(i) * this.r / 2 - noise(frameCount * 0.018 + i) * 30,
                this.position.y + sin(i) * this.r / 2 - noise(frameCount * 0.019 + i) * 30);
        }
        endShape(CLOSE);
        noFill();
        stroke(0);
        strokeWeight(1);
        rect(9, 9, width - 18, height - 18);
    }
}