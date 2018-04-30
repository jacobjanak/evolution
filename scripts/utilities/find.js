define([
  '../config',
  './random'
], function(config, random) {

  const find = {
    coords: (organism) => {
      const coords = {
        row: Math.floor(organism.y / config.size.tile),
        column: Math.floor(organism.x / config.size.tile)
      };

      return coords;
    },

    tile: (organism) => {
      const coords = find.coords(organism);
      const tileID = (coords.row * config.world.width) + coords.column;

      return tileID;
    },

    adjacentTiles: (organism) => {
      const coords = find.coords(organism);
      const tileID = find.tile(organism);

      let adjacentTileIDs = { current: tileID };

      // top
      if (coords.row !== 0) {
        adjacentTileIDs.top = tileID - config.world.width;
      }
      // left
      if (coords.column !== 0) {
        adjacentTileIDs.left = tileID - 1;
      }
      // right
      if (coords.column !== config.world.width - 1) {
        adjacentTileIDs.right = tileID + 1;
      }
      // bottom
      if (coords.row !== config.world.height - 1) {
        adjacentTileIDs.bottom = tileID + config.world.width;
      }

      return adjacentTileIDs;
    },

    direction: (organism, adjacentTiles) => {
      // this object will store data on the current best tile
      let best = {
        direction: false,
        difference: false
      }

      // iterate over adjacent tiles and update the best tile
      for (let k in adjacentTiles) {
        // adding randomness to the algorithm
        const randomness = random.randInt(-25, 25) / 100;
        const difference = Math.abs(adjacentTiles[k].fertility - organism.preference);
        if (isNaN(difference)) {
          console.log('OMG WHAT IS HAPPENING')
        }
        // check if this beats the best
        if (!best.direction || difference <= best.difference) {
          best.direction = k;
          best.difference = difference;
        }
      }

      return best.direction;
    }
  }

  return find;
})
