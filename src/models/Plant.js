import Organism from './Organism';

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

  grow(fertility) {
    const maxHealth = Math.round(fertility * 1000);

    if (this.health < maxHealth) {
      // need to round because JS is bad at math
      if (this.health < maxHealth) {
        this.health += Math.round(fertility * this.growth);
      }

      // limit the max number
      if (this.health > maxHealth) this.health = maxHealth;
    }
  }
}

export default Plant;
