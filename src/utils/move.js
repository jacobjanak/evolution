import { random, keepInBounds, find } from '../utils';

function move(animals, tiles, settings) {
  animals.forEach((animal) => {
    const adjacentTiles = find.adjacentTiles(animal, tiles, settings);
    const direction = find.direction(animal, adjacentTiles);
    let distance = random.randInt(0, animal.speed);

    // change position
    if (direction === 'top') animal.y -= distance;
    else if (direction === 'left') animal.x -= distance;
    else if (direction === 'right') animal.x += distance;
    else if (direction === 'bottom') animal.y += distance;
    else if (direction === 'current') {

      // randomly choose top/left or right/bottom
      let randomBool = Math.random() >= 0.5;
      if (randomBool) distance = 0 - distance;

      // randomly choose top/bottom or left/right
      randomBool = Math.random() >= 0.5;
      randomBool ? animal.x += distance : animal.y += distance;
    }
    
    // make sure it's not overflowing
    animal = keepInBounds(animal, settings);
  })

  return animals
}

export default move;
