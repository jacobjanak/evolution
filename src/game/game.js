import TileModel from '../../models/Tile'
import HerbivoreModel from '../../models/Herbivore'

let i;
let tiles = [];
let plants = [];
let herbivores = [];
let carnivores = [];

const game = {
  spawn: (Model, count, settings = {}) => {
    const spawned = [];
    for (i = 0; i < count; i++) {
      spawned.push(new Model(settings))
    }
    return spawned;
  };


};

export default game;
