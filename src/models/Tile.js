import random from '../utils/random';

class Tile {
  constructor() {
    this.fertility = random.randDecimal(2);
  }
}

export default Tile;
