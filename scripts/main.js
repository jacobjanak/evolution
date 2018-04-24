require([
  'jquery',
  'config',
  'models/Tile',
  'models/Plant',
  'models/Herbivore',
  'utilities/collision',
  'utilities/find'
], function($, config, Tile, Plant, Herbivore, collision, find) {

  // global variables
  let i, j, k;
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

    // make sure that two plants won't be touching
    i = plants.length;
    while (i--) {
      let j = i;
      while (j--) {
        if ( Math.abs(plants[i].x - plants[j].x) <= config.plantSize
          && Math.abs(plants[i].y - plants[j].y) <= config.plantSize ) {
          plants.splice(j, 1);
          j--
        }
      }
    }

    // add to DOM
    plants.forEach((plant) => {
      plant.spawn()
    })
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
    updateColors()
    growPlants()

    herbivores.forEach((herbivore, i) => {
      // moving
      const adjacentTileIDs = find.adjacentTiles(herbivore);
      // convert ID's to Tile obejcts
      let adjacentTiles = new Object();
      for (k in adjacentTileIDs) {
        adjacentTiles[k] = tiles[adjacentTileIDs[k]];
      }

      const direction = find.direction(herbivore, adjacentTiles);
      herbivore.move(direction)

      // update hunger
      herbivore.hunger -= 5;

      // eat plants
      plants.forEach((plant, j) => {
        if ( Math.abs(herbivore.x - plant.x) <= config.plantSize
          && Math.abs(herbivore.y - plant.y) <= config.plantSize ) {
          let amountToEat = Math.round((100 - herbivore.hunger) * 100);
          if (plant.growth < amountToEat) {
            amountToEat = plant.growth;

            // plant dies
            $('#' + plant.id).remove()
            plants.splice(j, 1);
          } else {
            plant.growth -= amountToEat;
          }
          herbivore.hunger += Math.round(amountToEat / 100);
        }
      })

      // herbivore dies
      if (herbivore.hunger <= 0) {
        $('#' + herbivore.id).remove()
        herbivores.splice(i, 1);
      }
    })

    reproducePlants()
    reproduceHerbivores()

    updateText()
  }

  function updateColors() {
    $.each($('.tile'), function(i, tile) {
      const fertility = tiles[i].fertility;
      $(tile).css({
        backgroundColor: 'rgb(' + (200 - (100 * fertility)) + ', 200, 100)'
      })
    })
  }

  function growPlants() {
    plants.forEach((plant, i) => {
      const parentTile = tiles[find.tile(plant)];
      plant.grow(parentTile.fertility)
    })
  }

  function reproducePlants() {
    plants.forEach((plant) => {
      if (plant.reproductionCycle === 0) {
        let newPlant = plant.reproduce();
        if (newPlant) {
          newPlant.spawn()
          plants.push(newPlant)
          plant.reproductionCycle = config.reproductionRate.plant;
        }
      } else {
        plant.reproductionCycle--
      }
    })
  }

  function reproduceHerbivores() {
    herbivores.forEach((herbivore) => {
      if (herbivore.reproductionCycle === 0) {
        let newHerbivore = herbivore.reproduce();
        if (newHerbivore) {
          newHerbivore.spawn()
          herbivores.push(newHerbivore)
          herbivore.reproductionCycle = config.reproductionRate.herbivore;
        }
      } else {
        herbivore.reproductionCycle--
      }
    })
  }

  function updateText() {
    plants.forEach((plant) => {
      $('#' + plant.id).text(Math.round(plant.growth / 10))
    })

    herbivores.forEach((herbivore) => {
      $('#' + herbivore.id).text(herbivore.hunger)
    })
  }

  // DEBUG //
  window.tiles = tiles;
  window.plants = plants;
  window.herbivores = herbivores;
  // DEBUG //

  $('#cycle').on('click', updateWorld)
  $(document).on('keyup', function(event) {
    if (event.key === 'n') {
      updateWorld()
    }
  })
})
