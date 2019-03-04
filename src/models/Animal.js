import Organism from './Organism';
import { mutate } from '../utils';

class Animal extends Organism {
  constructor(settings, genetics) {
    super(settings, genetics)

    this.health = 40;
    this.preference = genetics.preference ? mutate(genetics.preference, 10) : 50;
  }
}

export default Animal;
