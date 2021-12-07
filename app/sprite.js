// Adapted from Daniel Shiffman's code
// http://youtube.com/thecodingtrain
// https://thecodingtrain.com/CodingChallenges/111-animated-sprite.html

// Animated Sprite
// https://youtu.be/3noMeuufLZY


let pauseFrames = 120
let turnFrames = 0

class Sprite {
  constructor(stationary, walk, x, y) {
    this.x = x;
    this.y = y;
    this.stationary = stationary,
    this.walk = walk;
    this.w = this.stationary[0].width;
    this.len = this.stationary.length;
    this.speed = 0.0;
    this.index = random(this.len * 100);
    this.pauseFrames = 0
    this.turnFrames = 0
    this.isStationary = false
    this.direction = 1
  }

  show(height, width) {
    let index = floor(this.index) % this.len;
    push();
    translate(this.x, 0)
    if (this.speed < 0.0) {
      scale(-1,1);
      translate(-width, 0)
    }
    if ((this.speed == 0.0) || this.isStationary) {
      image(this.stationary[index], 0, this.y, width, height);
    } else {
      image(this.walk[index], 0, this.y, width, height);
    }
    pop();
  }

  animate() {
    this.index += 0.1

    // only allow turns once every 60 frames
    if (this.turnFrames > 0) {
      this.turnFrames -= 1;
    } else if (random(50) < 1) {
      this.turnFrames = 120;
      this.direction = this.direction * -1;
    }

    // pause intermittently for pauseFrames
    if (this.pauseFrames > 0) {
      this.pauseFrames -= 1;
    } else {
      // likelikehood of becoming stationary
      this.isStationary = (random(40) < 1);
      if (this.isStationary) {
        this.pauseFrames = pauseFrames;
      } else {
        this.speed = this.direction * noise(this.index);
        this.x += this.speed;
      }
    }
  }
}
