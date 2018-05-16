define(['../config', '../utilities/random'], function(config, random) {

  class Plant {
    constructor(genetics = {}) {
      this.id = random.randStr(8);
      this.size = config.size.plant;
      this.x = random.randInt(1, config.world.width * config.size.tile - this.size);
      this.y = random.randInt(1, config.world.height * config.size.tile - this.size);
      this.growth = 0;
      this.reproductionCycle = random.randInt(1, config.reproductionRate.plant + 1);
    }
    
    grow(fertility) {
      const maxGrowth = Math.round(fertility * 1000);

      // need to round because JS is bad at math
      if (this.growth < maxGrowth) {
        this.growth += Math.round(fertility * 5);
      }

      // limit the max number
      if (this.growth > maxGrowth) this.growth = maxGrowth;
    }

    reproduce() {
      const randomX = random.randInt(config.size.plant * -3, config.size.plant * 3);
      const randomY = random.randInt(config.size.plant * -3, config.size.plant * 3);

      let offspring = new Plant({
        x: this.x + randomX,
        y: this.y + randomY,
        reproductionCycle: config.reproductionRate.plant + 1
      });

      const limit = {
        top: 0,
        left: 0,
        right: config.world.width * config.size.tile - config.size.plant,
        bottom: config.world.height * config.size.tile - config.size.plant
      };

      if (offspring.y >= limit.top && offspring.x >= limit.left
       && offspring.x <= limit.right && offspring.y <= limit.bottom) {
        return offspring;
      }
      return false;
    }
  }

  return Plant;
})
