import Organism from './Organism';
import { random, mutate } from '../utils';

class Animal extends Organism {
  constructor(settings, genetics) {
    super(settings, genetics)

    this.health = 99;
    //NOTE: change this
    this.speed = this.size;

    if (genetics.preference) {
      this.preference = mutate(genetics.preference);
    } else {
      this.preference = random(0, 100);
    }
  }
}

export default Animal;
