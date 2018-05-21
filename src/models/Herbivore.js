import Animal from './Animal';
import random from '../utils/random';

class Herbivore extends Animal {
  constructor(settings, genetics = {}) {
    // size is needed by parent class(es)
    if (!genetics.size) genetics.size = settings.herbivore.size;

    super(settings, genetics)

    this.color = 'blue';
    this.speed = 10; //NOTE: change this
    this.reproduction = settings.herbivore.reproduction;
  }
}

export default Herbivore;
