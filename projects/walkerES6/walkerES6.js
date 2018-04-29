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
    this.xpos = this.xpos + random(-1, 1);
    this.ypos = this.ypos + random(-1, 1);
  }

  center() {
    this.xpos = width/2;
    this.ypos = height/2;
  }
}

