import { TileModel, PlantModel, HerbivoreModel, CarnivoreModel } from '../models';
import { hasSpace } from '../utils';

let i;

const spawn = {

  plants: (count, plants, settings) => {
    for (i = 0; i < count; i++) {
      const newPlant = new PlantModel(settings);
      if (hasSpace(newPlant, plants)) {
        plants.push(newPlant)
      }
    }
    return plants;
  },

  tiles: (count, tiles, settings = {}) => {
    return spawn.models(TileModel, count, tiles, settings);
  },

  herbivores: (count, herbivores, settings) => {
    return spawn.models(HerbivoreModel, count, herbivores, settings);
  },

  carnivores: (count, carnivores, settings) => {
    return spawn.models(CarnivoreModel, count, carnivores, settings);
  },

  models: (Model, count, arr, settings) => {
    for (i = 0; i < count; i++) {
        arr.push(new Model(settings))
    }
    return arr;
  }
}

export default spawn;
