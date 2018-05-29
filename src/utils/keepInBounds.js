function keepInBounds(organism, settings, returnOrganism = true) {
  const limit = {
    top: 0,
    left: 0,
    right: settings.world.width * settings.tile.size - organism.size,
    bottom: settings.world.height * settings.tile.size - organism.size
  };

  if (organism.y < limit.top) {
    if (returnOrganism) organism.y = limit.top;
    else return false;
  }
  if (organism.x < limit.left) {
    if (returnOrganism) organism.x = limit.left;
    else return false;
  }
  if (organism.x > limit.right) {
    if (returnOrganism) organism.x = limit.right;
    else return false;
  }
  if (organism.y > limit.bottom) {
    if (returnOrganism) organism.y = limit.bottom;
    else return false;
  }

  return true;
}

export default keepInBounds;
