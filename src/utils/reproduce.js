import touching from './touching';
import spawn from './spawn';

const reproduce = {
  plants: (plants, settings) => {
    plants.forEach((plant) => {
      if (plant.pregnancy === 0) {
        plant.pregnancy = plant.reproduction;
        const newPlant = plant.reproduce(settings);

        // make sure it's not on top of another plant
        if (newPlant) {
          let hasSpace = true;
          plants.forEach((plant2, j) => {
            if (touching(newPlant, plant2)) {
              hasSpace = false
            };
          })
          if (hasSpace) {
            spawn(newPlant, 'plant')
            plants.push(newPlant)
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
