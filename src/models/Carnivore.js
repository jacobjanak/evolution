import Animal from './Animal';
import random from '../utils/random';

class Carnivore extends Animal {
  constructor(settings, genetics = {}) {
    // size is needed by parent class(es)
    if (!genetics.size) genetics.size = settings.carnivore.size;

    super(settings, genetics)

    this.color = 'red';
    this.speed = 10; //NOTE: change this
    this.reproduction = settings.carnivore.reproduction;
  }
}

export default Carnivore;
