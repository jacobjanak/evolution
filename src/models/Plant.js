import Organism from './Organism';
import { random } from '../utils';

class Plant extends Organism {
  constructor(settings, genetics = {}) {
    // properties needed by parent class(es)
    if (!genetics.size) genetics.size = settings.plant.size;
    genetics.reproduction = genetics.reproduction || settings.plant.reproduction;

    super(settings, genetics)

    this.growth = genetics.growth || settings.plant.growth;
    this.color = genetics.color || settings.plant.color;
    this.health = 0;
  }
}

export default Plant;
