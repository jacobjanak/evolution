define([
  '../config',
  './random'
], function(config, random) {

  const find = {
    coords: (organism) => {
      const coords = {
        row: Math.floor(organism.y / config.tileSize),
        column: Math.floor(organism.x / config.tileSize)
      };

      return coords;
    },

    tile: (organism) => {
      const coords = find.coords(organism);
      const tileID = (coords.row * config.worldDimensions.width) + coords.column;

      return tileID;
    },

    adjacentTiles: (organism) => {
      const coords = find.coords(organism);
      const tileID = find.tile(organism);

      let adjacentTileIDs = new Object();

      // top
      if (coords.row !== 0) {
        adjacentTileIDs.top = tileID - config.worldDimensions.width;
      }
      // left
      if (coords.column !== 0) {
        adjacentTileIDs.left = tileID - 1;
      }
      // right
      if (coords.column !== config.worldDimensions.width - 1) {
        adjacentTileIDs.right = tileID + 1;
      }
      // bottom
      if (coords.row !== config.worldDimensions.height - 1) {
        adjacentTileIDs.bottom = tileID + config.worldDimensions.width;
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
        const randomness = random.randInt(-15, 15) // adding randomness to the algorithm
        const difference = Math.abs((adjacentTiles[k].fertility - 100) + randomness);
        // check if this beats the best
        if (!best.direction || difference < best.difference) {
          best.direction = k;
          best.difference = difference;
        }
      }

      return best.direction;
    }
  }

  return find;
})
