import random from '../utils/random';

class Organism {
  constructor(settings, genetics = {}) {
    this.size = genetics.size;
    this.reproduction = genetics.reproduction;
    this.pregnancy = this.reproduction * 2;
    this.x = genetics.x || random.randInt(1, settings.world.width * settings.tile.size - this.size);
    this.y = genetics.y || random.randInt(1, settings.world.height * settings.tile.size - this.size);
  }
}

export default Organism;
