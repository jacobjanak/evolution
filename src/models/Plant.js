import Organism from './Organism';
import random from '../utils/random';

class Plant extends Organism {
  constructor(settings, genetics = {}) {
    // properties needed by parent class(es)
    if (!genetics.size) genetics.size = settings.plant.size;
    genetics.reproduction = genetics.reproduction || settings.plant.reproduction;

    super(settings, genetics)

    this.color = genetics.color || settings.plant.color;
    this.health = 0;
  }

  grow(fertility) {
    const maxHealth = Math.round(fertility * 1000);

    if (this.health < maxHealth) {
      // need to round because JS is bad at math
      if (this.health < maxHealth) {
        this.health += Math.round(fertility * 5);
      }

      // limit the max number
      if (this.health > maxHealth) this.health = maxHealth;
    }
  }
}

export default Plant;
