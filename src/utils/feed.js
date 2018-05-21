import find from './find'

const feed = {
  plants: (plants, tiles, settings) => {
    plants.forEach((plant, i) => {
      const parentTile = tiles[find.tile(plant, settings)];
      plant.grow(parentTile.fertility)

      // plant dies if its health is 0
      if (plant.health <= 0) plants.splice(i, 1);
    })

    return plants;
  }
};

export default feed;
