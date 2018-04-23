define(['../config'], function(config) {

  function findTile(organism) {
    const row = Math.floor(organism.y / config.tileSize);
    const column = Math.floor(organism.x / config.tileSize);
    const tileID = (row * config.worldDimensions.width) + column;

    return tileID;
  }

  return findTile;
})
