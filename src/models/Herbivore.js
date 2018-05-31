import Animal from './Animal';

class Herbivore extends Animal {
  constructor(settings, genetics = {}) {
    // properties needed by parent class(es)
    if (!genetics.size) genetics.size = settings.herbivore.size;
    genetics.reproduction = genetics.reproduction || settings.herbivore.reproduction;

    super(settings, genetics)

    this.color = genetics.color || settings.herbivore.color;
    this.speed = 10; //NOTE: change this
  }
}

export default Herbivore;
