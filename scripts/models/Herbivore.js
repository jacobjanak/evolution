define([
  '../config',
  '../utilities/random'
], function(config, random) {

  class Herbivore {
    constructor() {
      this.id = random.randStr(8);
      this.x = random.randInt(1, config.worldDimensions.width * config.tileSize - config.animalSize);
      this.y = random.randInt(1, config.worldDimensions.height * config.tileSize - config.animalSize);
      this.preference = Math.random().toFixed(2);
      this.hunger = 100;
      this.speed = config.animalSize;
    }

    spawn() {
      let $e = $('<div class="herbivore">');
      $e.attr('id', this.id)
      $e.css({
        top: this.y,
        left: this.x
      })
      $('#world').append($e)
    }

    move(direction) {
      const distance = random.randInt(this.speed, this.speed * 2);

      // change position
      if (direction === 'top') this.y -= distance;
      else if (direction === 'left') this.x -= distance;
      else if (direction === 'right') this.x += distance;
      else if (direction === 'bottom') this.y += distance;

      // make sure it's not overflowing (shouldn't be necessary)
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
        right: config.worldDimensions.width * config.tileSize - config.animalSize,
        bottom: config.worldDimensions.height * config.tileSize - config.animalSize
      };

      if (this.y < limit.top) this.y = limit.top;
      else if (this.x < limit.left) this.x = limit.left;
      else if (this.x > limit.right) this.x = limit.right;
      else if (this.y > limit.bottom) this.y = limit.bottom;
    }
  }

  return Herbivore;
})
