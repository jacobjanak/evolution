import random from '../utils/random';

class Tile {
  constructor() {
    this.fertility = random(1, 100);
  }
}

export default Tile;
