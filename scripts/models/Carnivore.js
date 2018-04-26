define([
  '../config',
  './Animal',
  '../utilities/random'
], function(config, Animal, random) {

  class Carnivore extends Animal {
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
