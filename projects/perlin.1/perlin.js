let w;

function windowResized() {
    //resizeCanvas(windowWidth, windowHeight);
    //w.center();
}

function setup() {
  renderer = createCanvas(windowWidth, windowHeight);//, SVG);
  //background(0);
  walkers = Array.from(new Array(10),(val,index)=>new Walker());
  noise2Ds = Array.from(new Array(1),(val,index)=>new Noise2D());
  background(255);
  loadPixels();
  noiseDetail(75, 0.75);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      set(x, y, map(noise(x/width * 10 + random(1),y/height * 10 + random(1)),0,1,0,255));
    }
  }
  updatePixels();
  noiseDetail(4, 0.5);
}

function draw() {
  for (let w of walkers) {
    w.step();
    w.display();
  }
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

class Noise2D {
  constructor () {
    this.c = color(255);
  }

  display () {
    loadPixels();
    let bright = 0;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        bright = random(255);
        pixels[x+y*width] = color(bright);
      }
    }
    console.log(bright);
    updatePixels();
  }
}

class Walker {
  constructor() {
    this.c = color(255);
    this.xpos = width/2;
    this.ypos = height/2;
    this.r = 100;
    this.tx = random(-2, 2);
    this.ty = random(-1, 1);
    this.timestep = 0.001;
  }

  display() {
    stroke(0,0,0,9);
    fill(255, 255, 255, 5);//fill(this.c);
    ellipse(this.xpos, this.ypos, this.r, this.r);
  }


  step() {
    this.xt = noise(this.tx + this.timestep) - noise(this.tx);
    this.yt = noise(this.ty + this.timestep) - noise(this.ty);

    this.tx += this.timestep;
    this.ty += this.timestep;
    
    let dynamic_p = 1;
    this.xpos = max(0, min(width, (this.xpos + dynamic_p * width * this.xt + (1 - dynamic_p) * 10 * (2 * (mouseX / width) - 1))));
    this.ypos = max(0, min(height, (this.ypos + dynamic_p * height * this.yt + (1 - dynamic_p) * 10 * (2 * (mouseY / height) - 1))));
  }

  center() {
    this.xpos = width/2;
    this.ypos = height/2;
  }
}
