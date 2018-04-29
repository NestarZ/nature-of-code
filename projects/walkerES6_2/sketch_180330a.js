let w;
p5.disableFriendlyErrors = true;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(255);
    pg = createGraphics(windowWidth, windowHeight);
    for (let w of walkers) {
        w.center();
      }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(windowWidth, windowHeight);
  pg.background(0);
  RANDOM_MAX_H = random(2, 10); 
  walkers = Array.from(new Array(500),(val,index)=>new Walker());
}

function draw() {
  for (let w of walkers) {
    w.step();
    w.display();
  }
  image(pg, 0, 0);
  //pg.translate(0, height*sin(frameCount/2))
}

class Walker {
  constructor() {
    this.cStroke = color(255 * int(random(0, 2)));
    this.cFill = color(255 * int(random(0, 2)));
    this.xpos = width/2;
    this.ypos = height/2;
    this.max_height = random(2, RANDOM_MAX_H);
    this.max_width = this.max_width;
    this.height = random(this.max_height);
    this.width = this.height;
    this.xbool = int(random(0, 50));
    this.ybool = int(random(0, 50));
    if ((this.xbool === 0) || (this.ybool === 0)) {
        this.cFill = color(255, 0, 0);
    }
    this.theta = 0;
  }

  display() {
    pg.stroke(this.cStroke);
    pg.fill(this.cFill);
    let h = this.height;
    let w = h;
    //pg.ellipse(this.xpos, this.ypos, h, w);
    pg.rect(this.xpos, this.ypos, h, h);
  }

  step() {
    this.xpos = this.xpos + this.xbool * this.width * random(-1, 1);
    this.ypos = this.ypos + this.ybool * this.height * random(-1, 1);
  }

  center() {
    this.xpos = width/2;
    this.ypos = height/2;
  }
}

