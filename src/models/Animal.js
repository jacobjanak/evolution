import Organism from './Organism';
import { mutate } from '../utils';

class Animal extends Organism {
  constructor(settings, genetics) {
    super(settings, genetics)

    this.health = genetics ? 40 : 100;
    this.preference = genetics.preference ? mutate(genetics.preference, 10) : 50;
    if (this.preference > 100) this.preference = 100;
    else if (this.preference < 0) this.preference = 0;
    this.size = genetics.size;
  }
}

export default Animal;
