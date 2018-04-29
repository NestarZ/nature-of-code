let randomCounts;
let index;
const n_boxes = 200;
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
  pg = createGraphics(windowWidth, windowHeight);
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
  pg.background(0);
  index = int(randomCounts.length * montecarlo());
  randomCounts[index].addCount(); 
  for (let r of randomCounts) {
    r.display();
  }
  image(pg, 0, 0);
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
    this.count += 10;
    this.height = this.count; 
    this.ypos = pg.height - this.height;
  }

  resize() {
    this.width = pg.width/randomCounts.length;
    this.xpos = index * this.width;
  }
}
