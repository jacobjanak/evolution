define([
  '../config',
  './Animal',
  '../utilities/random'
], function(config, Animal, random) {

  class Herbivore extends Animal {
    constructor() {
      super()
      this.x = random.randInt(1, config.world.width * config.size.tile - config.size.herbivore);
      this.y = random.randInt(1, config.world.height * config.size.tile - config.size.herbivore);
      this.speed = config.size.herbivore;
      this.reproductionCycle = random.randInt(1, config.reproductionRate.herbivore + 1);
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

    reproduce() {
      let offspring = new Herbivore();
      offspring.reproductionCycle = config.reproductionRate.herbivore * 2;
      offspring.x = this.x;
      offspring.y = this.y;

      // preference gets inherited with some randomness
      let randomness = random.randInt(-20, 20) / 100;
      offspring.preference = Number((this.preference + randomness).toFixed(2));
      if (offspring.preference > 0.99) offspring.preference = 0.99;
      else if (offspring.preference < 0) offspring.preference = 0;

      return offspring;
    }
  }

  return Herbivore;
})
