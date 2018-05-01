define([
  '../config',
  './Animal',
  '../utilities/random'
], function(config, Animal, random) {

  class Carnivore extends Animal {
    constructor() {
      super()
      this.x = random.randInt(1, config.world.width * config.size.tile - config.size.carnivore);
      this.y = random.randInt(1, config.world.height * config.size.tile - config.size.carnivore);
      this.speed = config.size.carnivore;
      this.reproductionCycle = random.randInt(1, config.reproductionRate.carnivore + 1);
    }

    spawn() {
      let $e = $('<div class="carnivore">');
      $e.attr('id', this.id)
      $e.css({
        top: this.y,
        left: this.x
      })
      $('#world').append($e)
    }

    reproduce() {
      let offspring = new Carnivore();
      offspring.reproductionCycle = config.reproductionRate.carnivore * 2;
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

  return Carnivore;
})
