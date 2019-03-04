import Animal from './Animal';
import { mutate } from '../utils';

class Carnivore extends Animal {
  constructor(settings, genetics = {}) {
    // properties needed by parent class(es)
    if (!genetics.size) genetics.size = settings.carnivore.size;
    genetics.reproduction = genetics.reproduction || settings.carnivore.reproduction;

    super(settings, genetics)

    this.speed = genetics.speed ? mutate(genetics.speed, 2) : settings.carnivore.speed;
    this.color = genetics.color || settings.carnivore.color;
  }
}

export default Carnivore;
