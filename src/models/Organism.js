import random from '../utils/random';

class Organism {
  constructor(settings, genetics = {}) {
    this.age = 0;
    this.offspring = 0;
    this.reproduction = genetics.reproduction;
    this.pregnancy = this.reproduction * 2;
    this.x = genetics.x || random(1, settings.world.width * settings.tile.size - genetics.size);
    this.y = genetics.y || random(1, settings.world.height * settings.tile.size - genetics.size);
  }
}

export default Organism;
