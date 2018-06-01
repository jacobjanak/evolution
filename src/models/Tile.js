import random from '../utils/random';

class Tile {
  constructor() {
    this.fertility = random(0, 100);
  }
}

export default Tile;
