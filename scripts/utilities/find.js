define([
  '../config',
  './random'
], function(config, random) {

  // global variables
  let k;

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

      // current
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
      // iterate over adjacent tiles and update the best tile
      let best;
      for (k in adjacentTiles) {

        // difference between this tile and organism's ideal tile
        const randomness = random.randInt(-10, 10) / 100;
        const difference = Math.abs(
          adjacentTiles[k].fertility - organism.preference + randomness
        );

        // check if this beats the best or if there's no best yet
        if (!best || difference <= best.difference) {
          best = {
            direction: k,
            difference: difference
          };
        }
      }

      return best.direction;
    }
  }

  return find;
})
