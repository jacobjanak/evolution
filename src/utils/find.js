import random from './random';

// global variables
let k;

const find = {
  coords: (organism, settings) => {
    const coords = {
      row: Math.floor(organism.y / settings.tile.size),
      column: Math.floor(organism.x / settings.tile.size)
    };

    return coords;
  },

  tile: (organism, settings) => {
    const coords = find.coords(organism, settings);
    const tileID = (coords.row * settings.world.width) + coords.column;

    return tileID;
  },

  adjacentTiles: (organism, settings) => {
    const coords = find.coords(organism, settings);
    const tileID = find.tile(organism, settings);

    // current
    let adjacentTileIDs = { current: tileID };

    // top
    if (coords.row !== 0) {
      adjacentTileIDs.top = tileID - settings.world.width;
    }
    // left
    if (coords.column !== 0) {
      adjacentTileIDs.left = tileID - 1;
    }
    // right
    if (coords.column !== settings.world.width - 1) {
      adjacentTileIDs.right = tileID + 1;
    }
    // bottom
    if (coords.row !== settings.world.height - 1) {
      adjacentTileIDs.bottom = tileID + settings.world.width;
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

export default find;
