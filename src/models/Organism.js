import random from '../utils/random';

class Organism {
  constructor(settings, genetics) {
    this.size = genetics.size
    this.x = genetics.x || random.randInt(1, settings.world.width * settings.tile.size - this.size);
    this.y = genetics.y || random.randInt(1, settings.world.height * settings.tile.size - this.size);
  }

  keepInBounds(settings) {
    const limit = {
      top: 0,
      left: 0,
      right: settings.world.width * settings.tile.size - this.size,
      bottom: settings.world.height * settings.tile.size - this.size
    };

    if (this.y < limit.top) this.y = limit.top;
    if (this.x < limit.left) this.x = limit.left;
    if (this.x > limit.right) this.x = limit.right;
    if (this.y > limit.bottom) this.y = limit.bottom;
  }
}

export default Organism;
