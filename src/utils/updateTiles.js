import { spawn } from '../utils';

function updateTiles(tiles, settings) {
  const needed = settings.world.height * settings.world.width;

  if (needed !== tiles.length) {
    const difference = needed - tiles.length;

    if (difference > 0) tiles = spawn.tiles(difference, tiles);
    else if (difference < 0) tiles.length = needed;

    return tiles;
  }

  return false;
}

export default updateTiles;
