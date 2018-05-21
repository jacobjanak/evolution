import touching from './touching';
import spawn from './spawn';

const reproduce = {
  plants: (plants, settings) => {
    plants.forEach((plant) => {
      if (plant.reproduction === 0) {
        plant.reproduction = settings.plant.reproduction;
        const newPlant = plant.reproduce(settings);
        if (newPlant) {
          let hasSpace = true;
          plants.forEach((plant2, j) => {
            if (touching(newPlant, plant2)) hasSpace = false;
          })
          if (hasSpace) {
            spawn(newPlant, 'plant')
            plants.push(newPlant)
          }
        }
      } else {
        plant.reproduction--
      }
    })

    return plants;
  }
};

export default reproduce;
