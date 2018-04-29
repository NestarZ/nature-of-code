let w;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    w.center();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  w = new Walker();
}

function draw() {
  w.step();
  w.display();
  x = randomGaussian(width/2, width/3);
  y = randomGaussian(height/2, height/3);
  r = randomGaussian(height/5, height/12);
  noStroke();
  fill(color(20, 0.5*x, 0.5*y, 5));
  ellipse(x, y, r, r);
}

function montecarlo() {
  while (true) {
    r1 = random();
    p = r1;
    r2 = random();
    if (r2 < p*p*p) {
      return r1
    }
  }
}

class Walker {
  constructor() {
    this.c = color(255);
    this.xpos = width/2;
    this.ypos = height/2;
    this.r = 1;
  }

  display() {
    stroke(this.c);
    fill(this.c);
    ellipse(this.xpos, this.ypos, this.r, this.r);
  }


  step(foo = 0) {
    let dynamic_p = 0;
    let step = 10 * (1-montecarlo());
    this.xpos = max(0, min(width, this.xpos + step * ((1 - dynamic_p) * random(-1, 1) + dynamic_p * (2 * (mouseX / width) - 1))));
    this.ypos = max(0, min(height, this.ypos + step * ((1 - dynamic_p) * random(-1, 1) + dynamic_p * (2 * (mouseY / height) - 1))));
  }

  center() {
    this.xpos = width/2;
    this.ypos = height/2;
  }
}
