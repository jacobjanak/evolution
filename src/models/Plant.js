import random from '../utils/random';

class Plant {
  constructor(settings, genetics = {}) {
    this.id = random.randStr(8);
    this.color = 'brown';
    this.size = settings.plant.size;
    this.x = random.randInt(1, settings.world.width * settings.tile.size - this.size);
    this.y = random.randInt(1, settings.world.height * settings.tile.size - this.size);
    this.health = 0;
    this.reproduction = random.randInt(1, settings.plant.reproduction + 1);
  }

  grow(fertility) {
    const maxHealth = Math.round(fertility * 1000);

    if (this.health < maxHealth) {
      // need to round because JS is bad at math
      if (this.health < maxHealth) {
        this.health += Math.round(fertility * 5);
      }

      // limit the max number
      if (this.health > maxHealth) this.health = maxHealth;
    }
  }

  reproduce(settings) {
    const randomX = random.randInt(this.size * -3, this.size * 3);
    const randomY = random.randInt(this.size * -3, this.size * 3);

    const offspring = new Plant(settings, {
      x: this.x + randomX,
      y: this.y + randomY,
      reproduction: this.reproduction + 1
    });

    const limit = {
      top: 0,
      left: 0,
      right: settings.world.width * settings.tile.size - settings.plant.size,
      bottom: settings.world.height * settings.tile.size - settings.plant.size
    };

    if (offspring.y >= limit.top && offspring.x >= limit.left
     && offspring.x <= limit.right && offspring.y <= limit.bottom) {
      return offspring;
    }
    return false;
  }
}

export default Plant;
