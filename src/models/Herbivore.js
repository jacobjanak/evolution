import random from '../utils/random';

class Herbivore {
  constructor(settings, genetics = {}) {
    this.size = genetics.size || settings.herbivore.size;
    this.speed = 10; //NOTE: change this
    this.reproduction = settings.herbivore.reproduction;
  }
}

export default Herbivore;
