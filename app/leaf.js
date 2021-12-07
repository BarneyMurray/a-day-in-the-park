// adapted with minimal changes from https://p5js.org/examples/simulate-snowflakes.html
// contributed by Aatish Bhatia
class Leaf {
    // initialize coordinates
    constructor(leafImages) {
        this.leafImage = leafImages[Math.floor(Math.random() * leafImages.length)];
        this.posX = 0;
        this.posY = -50;
        this.initialangle = random(0, 2 * PI);
        this.size = random(5, 10);
        this.angle = 0.0
        // radius of spiral
        // chosen so the leaves are uniformly spread out in area
        this.radius = sqrt(random(pow(width / 2, 2)));
    }
  
    update(time) {
      // x position follows a circle
      let w = 0.3; // angular speed
      this.angle = w * time + this.initialangle;
      this.posX = width / 2 + this.radius * sin(this.angle);
      this.posY += 1.6
  
      // delete if past end of screen
      if (this.posY > height) {
        // note: this refers to `leaves` variable defined in sketch.js, should clean
        // this up
        let index = leaves.indexOf(this);
        leaves.splice(index, 1);
      }
    };
  
    display() {
      push()

      // rotate and translate in place
      translate(this.posX + this.leafImage.width / 2, this.posY + this.leafImage.width / 2);
      rotate(this.angle);
      image(this.leafImage, 0, 0)
      
      pop()
    };
  }