import Organism from './Organism';
import random from '../utils/random';

class Animal extends Organism {
  constructor(settings, genetics) {
    super(settings, genetics)

    this.health = 99;
    //NOTE: change this
    this.speed = this.size;
    this.preference = genetics.preference || random.randDecimal(2);
  }
}

export default Animal;
