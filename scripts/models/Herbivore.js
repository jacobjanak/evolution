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

    move(tiles, tileID) {
      // group the 4 tiles next to this animal (some may be undefined)
      let adjacentTiles = {
        top: tiles[tileID - config.worldDimensions.width],
        right: tiles[tileID + 1],
        left: tiles[tileID - 1],
        bottom: tiles[tileID - config.worldDimensions.width]
      };

      // hold data about the most desirable tile
      let bestTile = {
        direction: false,
        difference: 100
      };

      // iterate over adjacent tiles and update the best tile as needed
      for (let k in adjacentTiles) {
        if (adjacentTiles[k]) {
          let randomness = random.randInt(-25, 25)
          let difference = (adjacentTiles[k].fertility - 100) + randomness;
          difference = Math.abs(difference)
          if (difference < bestTile.difference) {
            bestTile.direction = k;
            bestTile.difference = difference;
          }
        }
      }

      // now that we know the best direction, it's time to move
      switch (bestTile.direction) {
        case 'top':
          this.y -= random.randInt(this.speed, this.speed * 2);
          break;

        case 'left':
          this.x -= random.randInt(this.speed, this.speed * 2);
          break;

        case 'right':
          this.x += random.randInt(this.speed, this.speed * 2);
          break;

        case 'bottom':
          this.y += random.randInt(this.speed, this.speed * 2);
          break;
      }

      this.keepInBounds()

      // re-position the element now
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
