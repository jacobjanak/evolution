import Animal from './Animal';

class Carnivore extends Animal {
  constructor(settings, genetics = {}) {
    // properties needed by parent class(es)
    if (!genetics.size) genetics.size = settings.carnivore.size;
    genetics.reproduction = genetics.reproduction || settings.carnivore.reproduction;

    super(settings, genetics)

    this.color = genetics.color || settings.carnivore.color;
    this.speed = 10; //NOTE: change this
  }
}

export default Carnivore;
