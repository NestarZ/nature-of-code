let randomCounts;
let index;
let x = 0;
let x1 = 0;
let y1 = 0;
const n_boxes = 100;
let t = 0;
p5.disableFriendlyErrors = true;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(255);
    pg = createGraphics(windowWidth, windowHeight);
    for (let r of randomCounts) {
      r.resize();
    }
}

function setup() {
  frameRate(1000);
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(windowWidth/2, windowHeight);
  pg.background(0);
  pg2 = createGraphics(windowWidth/2, windowHeight);
  pg2.background(0);
  randomCounts = Array.from(new Array(n_boxes),(val,index)=>new Box(index));
}

function montecarlo() {
  while (true) {
    r1 = random();
    p = r1;
    r2 = random();
    if (r2 < p*p) {
      return r1
    }
  }
}

function draw() {
  t += 0.01;
  p = noise(t);
  //p = montecarlo();

  // Right Screen
  y2 = pg2.height - int(p * pg2.height);
  console.log(x1, pg2.width, y1, pg2.height);
  if (int(x1) == int(pg2.width)) {
    x2 = 0;
    x1 = 0;
    pg2.background(0);
  } else {
    x2 = x1 + 1;
  }
  pg2.fill(255);
  pg2.stroke(255);
  pg2.line(x1,y1,x2,y2);
  y1 = y2;
  x1 = x2;

  // Left Screen
  index = int(randomCounts.length * p);
  randomCounts[index].addCount(); 
  for (let r of randomCounts) {
    r.display();
  }
  image(pg, 0, 0);
  image(pg2, windowWidth/2, 0);
  //pg.translate(0, height*sin(frameCount/2))
}

class Box {
  constructor(index) {
    this.cStroke = color(255);
    this.cFill = color(255);
    this.height = 0;
    this.width = pg.width/n_boxes;
    this.count = 0;
    this.xpos = index * this.width;
    this.ypos = this.height - this.count;
  }

  display() {
    pg.stroke(this.cStroke);
    pg.fill(this.cFill);
    pg.rect(this.xpos, this.ypos, this.width - 1, this.height);
  }

  addCount() {
    this.count += 1;
    this.height = this.count; 
    this.ypos = pg.height - this.height;
  }

  resize() {
    this.width = pg.width/randomCounts.length;
    this.xpos = index * this.width;
  }
}
