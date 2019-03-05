import { find, touching, hasSpace } from '../utils';

const feed = {

  plants: (plants, tiles, settings) => {
    plants.forEach((plant, i) => {
      const fertility = tiles[find.tileID(plant, settings)].fertility;
      const maxHealth = Math.round(fertility * 10);

      if (plant.health < maxHealth) {
        // need to round because of floating point inaccuracies
        const growth = Math.round(fertility * (plant.growth / 100));
        plant.health += growth;

        if (plant.health > maxHealth) plant.health = maxHealth;
      }

      // plant dies if its health is 0
      if (plant.health <= 0) plants.splice(i, 1);
      else plant.age++;
    })

    return plants;
  },

  herbivores: (herbivores, plants, settings) => {
    herbivores.forEach((herbivore, i) => {
      herbivore.health -= settings.herbivore.healthLoss;
      herbivore.age++

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
      carnivore.age++
      if (carnivore.health <= 60) {

        // eat herbivores
        herbivores.forEach((herbivore, j) => {
          if (touching(carnivore, herbivore)) {
            carnivore.health = 99;
            carnivore.kills++

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
