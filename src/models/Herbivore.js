import Animal from './Animal';
import { mutate } from '../utils';

class Herbivore extends Animal {
  constructor(settings, genetics = {}) {
    // properties needed by parent class(es)
    if (!genetics.size) genetics.size = settings.herbivore.size;
    genetics.reproduction = genetics.reproduction || settings.herbivore.reproduction;

    super(settings, genetics)

    this.speed = genetics.speed || settings.herbivore.speed;
    this.color = genetics.color || settings.herbivore.color;
  }
}

export default Herbivore;
