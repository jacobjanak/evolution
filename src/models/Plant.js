import Organism from './Organism';

class Plant extends Organism {
  constructor(settings, genetics = {}) {
    // properties needed by parent class(es)
    if (!genetics.size) genetics.size = settings.plant.size;
    genetics.reproduction = genetics.reproduction || settings.plant.reproduction;

    super(settings, genetics)

    this.health = 0;
    this.growth = genetics.growth || settings.plant.growth;
    this.color = genetics.color || settings.plant.color;
    this.size = genetics.size;
  }
}

export default Plant;
