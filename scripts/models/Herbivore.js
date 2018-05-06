define([
  '../config',
  './Animal',
  '../utilities/random'
], function(config, Animal, random) {

  class Herbivore extends Animal {
    constructor(genetics = {}) {
      if (!genetics.size) genetics.size = config.size.herbivore;
      super(genetics)
      this.speed = this.size; //NOTE: change this
      this.reproductionCycle = random.randInt(1, config.reproductionRate.herbivore + 1);
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
