define([
  '../config',
  './Animal',
  '../utilities/random'
], function(config, Animal, random) {

  class Carnivore extends Animal {
    constructor(genetics = {}) {
      if (!genetics.size) genetics.size = config.size.carnivore;
      super(genetics)
      this.speed = this.size;
      this.reproductionCycle = random.randInt(1, config.reproductionRate.carnivore + 1);
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
