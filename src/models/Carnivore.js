import Animal from './Animal';
import random from '../utils/random';

class Carnivore extends Animal {
  constructor(settings, genetics = {}) {
    // size is needed by parent class(es)
    if (!genetics.size) genetics.size = settings.carnivore.size;

    super(settings, genetics)

    this.color = 'red';
    this.speed = this.size;
    this.reproduction = settings.carnivore.reproduction;
  }
}

export default Carnivore;
