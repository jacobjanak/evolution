define([
  '../config',
  '../utilities/random'
], function(config, random) {

  class Animal {
    constructor() {
      this.id = random.randStr(8);
      this.x = random.randInt(1, config.world.width * config.tileSize - config.animalSize);
      this.y = random.randInt(1, config.world.height * config.tileSize - config.animalSize);
      this.preference = Number(Math.random().toFixed(2));
      this.speed = config.animalSize;
      this.hunger = 99;
      this.reproductionCycle = random.randInt(1, config.reproductionRate.herbivore + 1);
    }

    move(direction) {
      let distance = random.randInt(0, this.speed);

      // change position
      if (direction === 'top') this.y -= distance;
      else if (direction === 'left') this.x -= distance;
      else if (direction === 'right') this.x += distance;
      else if (direction === 'bottom') this.y += distance;
      else if (direction === 'current') {
        // randomly choose top/left or right/bottom
        let randomBool = Math.random() >= 0.5;
        if (randomBool) distance = 0 - distance;

        // randomly choose top/bottom or left/right
        randomBool = Math.random() >= 0.5;
        if (randomBool) {
          this.x += distance;
        } else {
          this.y += distance;
        }
      }

      // make sure it's not overflowing
      this.keepInBounds()

      // reposition the element
      $('#' + this.id).css({
        top: this.y,
        left: this.x
      })
    }

    keepInBounds() {
      const limit = {
        top: 0,
        left: 0,
        right: config.world.width * config.tileSize - config.animalSize,
        bottom: config.world.height * config.tileSize - config.animalSize
      };

      if (this.y < limit.top) this.y = limit.top;
      else if (this.x < limit.left) this.x = limit.left;
      else if (this.x > limit.right) this.x = limit.right;
      else if (this.y > limit.bottom) this.y = limit.bottom;
    }
  }

  return Animal;
})
