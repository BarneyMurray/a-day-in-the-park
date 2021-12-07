// Daniel Shiffman
// http://youtube.com/thecodingtrain
// https://thecodingtrain.com/CodingChallenges/111-animated-sprite.html

// Animated Sprite
// https://youtu.be/3noMeuufLZY

// license for sprites can be found in animals folder

// leaf trajectory code adapted with minimal changes from https://p5js.org/examples/simulate-snowflakes.html
// contributed by Aatish Bhatia

let sprites;

let leafImages = []
let leaves = []
let rats = []
let pigeons = []; // storing sprite instances

let walk = 'Walk'
let idle = 'Idle'

let rat_folder = 'rat_resized'
let pigeon_folder = 'pigeon_resized'


function preload() {

  for (let i = 1; i < 3; i++) {
    leafImages.push(loadImage(`./leaf${i}.png`))
  }

  sprites = {
    'rat': {
      'walk': load_data(rat_folder, walk),
      'idle': load_data(rat_folder, idle),
    },
    'pigeon': {
      'walk': load_data(pigeon_folder, idle),
      'idle': load_data(pigeon_folder, idle),
    }
  };
}

function load_data(folder, animation) {
  spritedata = loadJSON(`animals/${folder}/${animation}.json`);
  spritesheet = loadImage(`animals/${folder}/${animation}.png`);
  return [spritedata, spritesheet];
}

function load_animations(animal, action) {

  let spritedata = sprites[animal][action][0];
  let spritesheet = sprites[animal][action][1];
  let animation = [];
  let frames = spritedata.frames;

  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].position;
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    animation.push(img);
  }
  return animation;
}

function setup() {
  bg = loadImage('./background.png')
  createCanvas(640, 480);

  // load sequences of animation frames
  var animations = {
    'pigeon': {
      'walk': load_animations('pigeon', 'walk'),
      'idle': load_animations('pigeon', 'idle')
    },
    'rat': {
      'walk': load_animations('rat', 'walk'),
      'idle': load_animations('rat', 'idle')
    }
  };

  // build sprites
  for (let i = 0; i < 3; i++) {
    x_pos = random(50, 640-150)
    pigeons[i] = new Sprite(animations.pigeon.idle, animations.pigeon.idle, x_pos, 322);
  }

  for (let i = 0; i < 1; i++) {
    x_pos = random(150, 640-150)
    rats[i] = new Sprite(animations.rat.idle, animations.rat.walk, x_pos, 360);
  }

};

function draw() {
  background(bg);
  scale(1.1);
  let t = frameCount / 60

  // generate leaf occasionally
  if (Math.round(random(120)) == 1) {
    leaves.push(new Leaf(leafImages)); 
  }

  for (let p of pigeons) {
    p.show(96, 96);
    p.animate();
  }

  for (let r of rats) {
    r.show(64, 64);
    r.animate();
  }

  for (let leaf of leaves) {
    leaf.update(t);
    leaf.display();
  }
}
