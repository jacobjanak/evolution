require([
  'jquery',
  'config',
  'models/Tile',
  'models/Plant',
  'models/Herbivore',
  'utilities/collision',
  'utilities/find',
  'utilities/touching'
], function($, config, Tile, Plant, Herbivore, collision, find, touching) {

  // global variables
  let i, j, k;
  let tiles = [];
  let plants = [];
  let herbivores = [];
  let $world = $('#world');

  // initial page load
  start()

  function start() {
    spawnTiles()
    spawnPlants()
    updateDOM()
  }

  function spawnTiles() {
    // delete everything
    $world.empty()

    // generate new tile objects
    tiles = [];
    let tileCount = config.world.height * config.world.width;
    for (i = 0; i < tileCount; i++) {
      tiles.push(new Tile())
    }

    // DOM tile grid where i = rows, j = columns
    for (i = 0; i < config.world.height; i++) {
      let $row = $('<div class="row">');
      for (j = 0; j < config.world.width; j++) {
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
        if (plants[i] && plants[j]) {
          if (Math.abs(plants[i].x - plants[j].x) <= config.plantSize &&
            Math.abs(plants[i].y - plants[j].y) <= config.plantSize) {
            // plant dies
            plants.splice(i, 1);
            break;
          }
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

  // maintenence
  function updateWorld() {
    reproducePlants()
    feedPlants()
    moveHerbivores()
    feedHerbivores()
    reproduceHerbivores()
    // doubleCheck()
    updateDOM()
  }

  function reproducePlants() {
    plants.forEach((plant) => {
      if (plant.reproductionCycle === 0) {
        let newPlant = plant.reproduce();
        if (newPlant) {
          let hasSpace = true;
          plants.forEach((plant2, j) => {
            const isTouching = touching({
              x: newPlant.x,
              y: newPlant.y,
              size: config.plantSize
            }, {
              x: plant2.x,
              y: plant2.y,
              size: config.plantSize
            })
            if (isTouching) hasSpace = false;
          })
          if (hasSpace) {
            newPlant.spawn()
            plants.push(newPlant)
            plant.reproductionCycle = config.reproductionRate.plant;
          }
        }
      } else {
        plant.reproductionCycle--
      }
    })
  }

  function feedPlants() {
    plants.forEach((plant, i) => {
      const parentTile = tiles[find.tile(plant)];
      plant.grow(parentTile.fertility)

      // plant dies if its growth is 0
      if (plant.growth <= 0) {
        $('#' + plant.id).remove()
        plants.splice(i, 1);
      }
    })
  }

  function moveHerbivores() {
    herbivores.forEach((herbivore) => {
      // moving
      const adjacentTileIDs = find.adjacentTiles(herbivore);
      // convert ID's to Tile obejcts
      let adjacentTiles = new Object();
      for (k in adjacentTileIDs) {
        adjacentTiles[k] = tiles[adjacentTileIDs[k]];
      }

      const direction = find.direction(herbivore, adjacentTiles);
      herbivore.move(direction)
    })
  }

  function feedHerbivores() {
    herbivores.forEach((herbivore, i) => {
      // update hunger
      herbivore.hunger -= config.hungerLoss;

      // eat plants
      plants.forEach((plant, j) => {
        if (Math.abs(herbivore.x - plant.x) <= config.plantSize &&
          Math.abs(herbivore.y - plant.y) <= config.plantSize) {
          let amountToEat = Math.round(100 - herbivore.hunger);
          if (plant.growth <= amountToEat) {
            amountToEat = plant.growth;

            // plant dies
            $('#' + plant.id).remove()
            plants.splice(j, 1);
          } else {
            plant.growth -= amountToEat;
          }
          herbivore.hunger += amountToEat;
        }
      })

      // herbivore dies if hunger is 0 or less
      if (herbivore.hunger <= 0) {
        $('#' + herbivore.id).remove()
        herbivores.splice(i, 1);
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

  function updateDOM() {
    // update tile color
    $.each($('.tile'), function(i, tile) {
      const fertility = tiles[i].fertility;
      $(tile).css({
        backgroundColor: 'rgb(' + (200 - (100 * fertility)) + ', 200, 100)'
      })
    })

    // update text
    plants.forEach((plant) => {
      $('#' + plant.id).text(plant.growth)
    })
    herbivores.forEach((herbivore) => {
      $('#' + herbivore.id).text(herbivore.hunger)
    })
  }

  function doubleCheck() {
    // make sure no plants got left behind
    $.each($('.plant'), (i, $plant) => {
      let shouldExist = false;
      plants.forEach((plant) => {
        if (plant.id === $($plant).attr('id')) {
          shouldExist = true;
        }
      })
      if (!shouldExist) {
        $($plant).remove()
        console.log('Found a bug - tkaue')
      }
    })
  }

  // DEBUG //
  window.tiles = tiles;
  window.plants = plants;
  window.herbivores = herbivores;
  // DEBUG //

  $('#cycle').on('click', updateWorld)
  $('#spawn-herbivores').on('click', spawnHerbivores)
  $('.tile').on('click', function() {
    console.log(herbivores)
  })
  $(document).on('keyup', updateWorld)
})
