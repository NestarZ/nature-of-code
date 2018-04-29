p5.disableFriendlyErrors = true;

let t =0;
let w;
let trees_id;

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

function windowResized() {
    //resizeCanvas(windowWidth, windowHeight);
    //w.center();
}

function setup() {
  textFont('Courier New');
  renderer = createCanvas(windowWidth, windowHeight + windowHeight);//, SVG);
  walkers = Array.from(new Array(0),(val,index)=>new Walker());
  noise2Ds = Array.from(new Array(0),(val,index)=>new Noise2D());
  trees = {0: new Tree(0, width/3, height), 1: new Tree(1, width/2 + width/7, height), 2: new Tree(2, width/2 + width/4, height), 3: new Tree(3)}
  trees_id = 4;
  background(0);
}

function draw() {
  //noiseDetail(4, 0.5);
  if (frameCount % 10000 == 0 || frameCount == 1) {
    for (let n of noise2Ds) {
      n.display();
    }
  }

  for (let w of walkers) {
    w.step();
    w.display();
  }

  for (const [ tree_id, tree ] of Object.entries(trees)) {
    tree.step();
    tree.display();
  }
  console.log(Object.keys(trees).length);
}

let time = 0;

class Noise2D {
  constructor () {
    this.c = color(255);
    loadPixels();
  }

  display () {
    t+= 1;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let a = map(noise(x/width * 10 + noise(sin(t)),y/height * 10 + noise(cos(t)), random(t)),0,1,0,255);
        set(x, y, color(a + random(10), a + random(20), a + random(30)));
      }
    }
    updatePixels();
  }
}

class Tree {
  constructor (id, xpos = width/2, ypos = height, angle = 90, depth = 0) {
    this.alpha = noise(id)*255;
    this.c = 255 - max(0, 255 - depth*depth);
    this.r = max(1, 100 - depth*depth);
    this.r += noise(id) * this.r/3;
    this.xpos = xpos;
    this.ypos = ypos;
    this.xt = cos(radians(angle));
    this.yt = -sin(radians(angle));
    this.depth = depth;
    this.max_child = 6;
    this.child_n = 0;
    this.id = id;
  }

  display () {
    textSize(this.r/30);
    fill(color(255-this.c, this.alpha));
    stroke(color(this.c, this.alpha));
    text('|(' + "0".repeat(this.r/7) + ')|', this.xpos, this.ypos);
    //ellipse(this.xpos, this.ypos, this.r, this.r);
  }

  step () {
    if (this.ypos < 0 || this.xpos < 0) {
      fill(color(10,155,0, this.depth));
      stroke(color(0,150,0, this.depth));
      ellipse(this.xpos, this.ypos, 10, 10);
      delete trees[this.id];
    }
    else {
      time += 0.01;
      let dynamic_p = 0.03;
      this.xpos += dynamic_p * this.r * this.xt + map(noise(time), 0, 1, -1, 1);
      this.ypos += dynamic_p * this.r * this.yt + map(noise(time), 0, 1, -1, 1);
      if (random() > 0.989) {
        delete trees[this.id];
        this.split();
      }
    }
  }

  split () {
    if (this.depth < 10 && this.child_n < this.max_child) {
      for (let index = 0; index < int(random(1, 4)); index++) {
        trees[trees_id] = new Tree(trees_id, this.xpos, this.ypos, 180*noise(time), this.depth+1);
        trees_id++;
        this.child_n++;
      }
    }
    else {
      textSize(this.r*10);
      fill(color(10,200 * noise(this.id),20, this.depth*20));
      stroke(color(5,25 * noise(this.id),10, this.depth*20));
      text('X-°7ÌÏÈù*', this.xpos, this.ypos);
      //this.star(this.xpos, this.ypos, 200*noise(this.id), 20*noise(this.id), 100*noise(this.id)); 
    }
  }

  star (x, y, radius1, radius2, npoints) {
    var angle = TWO_PI / npoints;
    var halfAngle = angle/2.0;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
      var sx = x + cos(a) * radius2;
      var sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a+halfAngle) * radius1;
      sy = y + sin(a+halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

}

class Walker {
  constructor() {
    this.c = color(255);
    this.xpos = width/2;
    this.ypos = height/2;
    this.r = 10;
    this.tx = random(100000);
    this.ty = 100000 + random(100000);
    this.timestep = 0.001;
  }

  display() {
    stroke(0,0,0,9);
    fill(255, 255, 255, 0);//fill(this.c);
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
