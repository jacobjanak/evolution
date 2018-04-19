define(['../config', '../utilities/random'], function(config, random) {

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
  }

  return Herbivore;
})
