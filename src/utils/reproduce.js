import { PlantModel } from '../models';
import { random, touching, spawn, keepInBounds, hasSpace } from '../utils';


const reproduce = {
  plants: (plants, settings) => {
    plants.forEach((plant) => {
      if (plant.pregnancy === 0) {

        // reset the cycle
        plant.pregnancy = plant.reproduction;

        // making a new plant
        const newPlant = new PlantModel(settings, {
          x: plant.x + random.randInt(plant.size * -3, plant.size * 3),
          y: plant.y + random.randInt(plant.size * -3, plant.size * 3),
          reproduction: plant.reproduction
        });

        // make sure it's in the map
        if (keepInBounds(newPlant, settings, false)) {

          // make sure it's not touching other plants
          if (hasSpace(newPlant, plants)) {
            plants.push(newPlant);
          }
        }
      } else {
        plant.pregnancy--
      }
    })

    return plants;
  }
};

export default reproduce;
