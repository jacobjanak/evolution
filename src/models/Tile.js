import random from '../utils/random';

class Tile {
  constructor() {
    this.fertility = random.randInt(0, 100);
  }
}

export default Tile;
