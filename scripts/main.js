require([
  'jquery',
  'config',
  'models/Tile',
  'models/Plant',
  'models/Herbivore',
  'utilities/collision'
], function($, config, Tile, Plant, Herbivore, collision) {

  // global variables
  let i, j;
  let tiles = [];
  let plants = [];
  let herbivores = [];
  let $world = $('#world');

  // script begins
  $world.empty()
  spawnTiles(config.worldDimensions)
  spawnPlants()
  spawnHerbivores()
  spawnCarnivores()
  updateWorld()
  // script ends

  function spawnTiles(worldDimensions) {
    // generate new tile objects
    tiles = [];
    let tileCount = worldDimensions.height * worldDimensions.width;
    for (i = 0; i < tileCount; i++) {
      tiles.push(new Tile())
    }

    // DOM tile grid where i = rows, j = columns
    for (i = 0; i < worldDimensions.height; i++) {
      let $row = $('<div class="row">');
      for (j = 0; j < worldDimensions.width; j++) {
        $row.append(Tile.createElement())
      }
      $world.append($row)
    }
  }

  function spawnPlants() {
    // generate new plant objects
    plants = [];
    for (i = 0; i < config.spawnCount.plants; i++) {
      plants.push(new Plant());
    }

    // add to DOM
    i = plants.length;
    while (i--) {
      let j = i;
      // make sure that two plants won't be touching
      while (j--) {
        if ( Math.abs(plants[i].x - plants[j].x) <= config.plantSize
          && Math.abs(plants[i].y - plants[j].y) <= config.plantSize ) {
          plants.splice(j, 1);
          j--
        }
      }
      plants[i].spawn()
    }
  }

  function spawnHerbivores() {
    // generate new herbivore objects
    herbivores = [];
    for (i = 0; i < config.spawnCount.herbivores; i++) {
      herbivores.push(new Herbivore());
    }

    // add to DOM
    herbivores.forEach((herbivore) => {
      herbivore.spawn()
    })
  }

  function spawnCarnivores() {

  }

  function updateWorld() {
    // update colors
    $.each($('.tile'), function(i, tile) {
      const fertility = tiles[i].fertility;
      $(tile).css({
        backgroundColor: 'rgb(' + (100 + (100 * fertility)) + ', 200, 100)'
      })
    })

    // grow plants
    plants.forEach((plant, i) => {
      const row = Math.floor(plant.y / config.tileSize);
      const column = Math.floor(plant.x / config.tileSize);
      const fertility = tiles[row * config.worldDimensions.height + column].fertility;
      plant.grow(fertility)
    })
  }

  $('#cycle').on('click', updateWorld)
})
