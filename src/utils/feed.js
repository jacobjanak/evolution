import { find, touching } from '../utils';

const feed = {

  plants: (plants, tiles, settings) => {
    plants.forEach((plant, i) => {
      const fertility = tiles[find.tileID(plant, settings)].fertility;
      const maxHealth = Math.round(fertility * 1000);

      if (plant.health < maxHealth) {
        // need to round because JS is bad at math
        plant.health += Math.round(fertility * plant.growth);
        if (plant.health > maxHealth) plant.health = maxHealth;
      }

      // plant dies if its health is 0
      if (plant.health <= 0) {
        plants.splice(i, 1)
        i--; //NOTE: is this necessary?
      }
    })

    return plants;
  },

  herbivores: (herbivores, plants, settings) => {
    herbivores.forEach((herbivore, i) => {
      herbivore.health -= settings.herbivore.healthLoss;

      // eat plants
      plants.forEach((plant, j) => {
        if (touching(herbivore, plant)) {
          let amountToEat = 99 - herbivore.health;
          if (plant.health <= amountToEat) {
            // plant dies
            amountToEat = plant.health;
            plants.splice(j, 1);
          } else {
            plant.health -= amountToEat;
          }
          herbivore.health += amountToEat;
        }
      })

      // herbivore dies if health is 0 or less
      if (herbivore.health <= 0) {
        herbivores.splice(i, 1);
      }
    })

    return { herbivores, plants };
  },

  carnivores: (carnivores, herbivores, settings) => {
    carnivores.forEach((carnivore, i) => {
      carnivore.health -= settings.carnivore.healthLoss;

      if (carnivore.health <= 90) {

        // eat herbivores
        herbivores.forEach((herbivore, j) => {
          if (touching(carnivore, herbivore)) {
            carnivore.health = 99;

            // herbivore dies
            herbivores.splice(j, 1);
          }
        })

        // herbivore dies if health is 0 or less
        if (carnivore.health <= 0) {
          carnivores.splice(i, 1);
        }
      }
    })

    return { carnivores, herbivores };
  }
};

export default feed;
