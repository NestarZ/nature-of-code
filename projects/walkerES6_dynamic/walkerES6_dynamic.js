let w;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    w.center();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  w = new Walker();
}

function draw() {
  w.step();
  w.display();
}


class Walker {
  constructor() {
    this.c = color(0);
    this.xpos = width/2;
    this.ypos = height/2;
  }

  display() {
    stroke(this.c);
    point(this.xpos, this.ypos);
  }


  step() {
    let dynamic_p = 0;
    let step = 1;
    this.xpos = max(0, min(width, this.xpos + step * ((1 - dynamic_p) * random(-1, 1) + dynamic_p * (2 * (mouseX / width) - 1))));
    this.ypos = max(0, min(height, this.ypos + step * ((1 - dynamic_p) * random(-1, 1) + dynamic_p * (2 * (mouseY / height) - 1))));
  }

  center() {
    this.xpos = width/2;
    this.ypos = height/2;
  }
}
