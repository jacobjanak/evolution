require([
  'jquery',
  'config',
  'models/Tile',
  'models/Plant',
  'models/Herbivore',
  'models/Carnivore',
  'utilities/find',
  'utilities/touching'
], function($, config, Tile, Plant, Herbivore, Carnivore, find, touching) {

  // global variables
  let i, j, k;
  let tiles = [];
  let plants = [];
  let herbivores = [];
  let carnivores = [];
  let $world = $('#world');

  // initial page load
  start()

  function start() {
    tiles = [];
    plants = [];
    herbivores = [];
    carnivores = [];
    spawnTiles()
    updateDOM()
    updateStyleTag()
  }

  function spawnTiles() {
    // delete everything
    $world.empty()

    // generate new tile objects
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
    for (i = 0; i < config.spawnCount.plants; i++) {
      let newPlant = new Plant();

      // check if it has space to spawn
      let hasSpace = true;
      plants.forEach((plant) => {
        let isTouching = touching({
          x: newPlant.x,
          y: newPlant.y,
          size: config.size.plant
        }, {
          x: plant.x,
          y: plant.y,
          size: config.size.plant
        })
        if (isTouching) hasSpace = false;
      })
      if (hasSpace) {
        newPlant.spawn()
        plants.push(newPlant)
      }
    }
  }

  function spawnHerbivores() {
    // generate new herbivore objects
    for (i = 0; i < config.spawnCount.herbivores; i++) {
      const newHerbivore = new Herbivore();
      newHerbivore.spawn()
      herbivores.push(newHerbivore);
    }
  }

  function spawnCarnivores() {
    // generate new herbivore objects
    for (i = 0; i < config.spawnCount.carnivores; i++) {
      const newCarnivore = new Carnivore();
      newCarnivore.spawn()
      carnivores.push(newCarnivore);
    }
  }

  // maintenence
  setInterval(function() {
    updateWorld()
  }, 100)

  function updateWorld() {
    reproducePlants()
    feedPlants()
    moveHerbivores()
    feedHerbivores()
    reproduceHerbivores()
    moveCarnivores()
    feedCarnivores()
    reproduceCarnivores()
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
              size: config.size.plant
            }, {
              x: plant2.x,
              y: plant2.y,
              size: config.size.plant
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
        const isTouching = touching({
          x: herbivore.x,
          y: herbivore.y,
          size: config.size.animal
        }, {
          x: plant.x,
          y: plant.y,
          size: config.size.plant
        })
        if (isTouching) {
          let amountToEat = Math.round(99 - herbivore.hunger);
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

  function moveCarnivores() {
    carnivores.forEach((carnivore) => {
      // moving
      const adjacentTileIDs = find.adjacentTiles(carnivore);
      // convert ID's to Tile obejcts
      let adjacentTiles = new Object();
      for (k in adjacentTileIDs) {
        adjacentTiles[k] = tiles[adjacentTileIDs[k]];
      }

      const direction = find.direction(carnivore, adjacentTiles);
      carnivore.move(direction)
    })
  }

  function feedCarnivores() {
    carnivores.forEach((carnivore, i) => {
      // update hunger
      carnivore.hunger -= 2;

      // eat herbivores
      if (carnivore.hunger <= 90) {
        herbivores.forEach((herbivore, j) => {
          const isTouching = touching({
            x: carnivore.x,
            y: carnivore.y,
            size: config.size.animal
          }, {
            x: herbivore.x,
            y: herbivore.y,
            size: config.size.animal
          })
          if (isTouching) {
            carnivore.hunger = 99;

            // herbivore dies
            $('#' + herbivore.id).remove()
            herbivores.splice(j, 1);
          }
        })

        // herbivore dies if hunger is 0 or less
        if (carnivore.hunger <= 0) {
          $('#' + carnivore.id).remove()
          carnivores.splice(i, 1);
        }
      }
    })
  }

  function reproduceCarnivores() {
    carnivores.forEach((carnivore) => {
      if (carnivore.reproductionCycle === 0) {
        let newCarnivore = carnivore.reproduce();
        if (newCarnivore) {
          newCarnivore.spawn()
          carnivores.push(newCarnivore)
          carnivore.reproductionCycle = config.reproductionRate.carnivore;
        }
      } else {
        carnivore.reproductionCycle--
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
    carnivores.forEach((carnivore) => {
      $('#' + carnivore.id).text(carnivore.hunger)
    })
  }

  function updateStyleTag() {
    $('style').text(`
      .plant {
        height: ${config.size.plant}px;
        width: ${config.size.plant}px;
        line-height: ${config.size.plant}px;
      }
      .herbivore, .carnivore {
        height: ${config.size.animal}px;
        width: ${config.size.animal}px;
        line-height: ${config.size.animal}px;
      }
    `)
  }

  // menu
  let collapsibles = $('.collapsible');
  for (i = 0; i < collapsibles.length; i++) {
    $(collapsibles[i]).on('click', function() {
      $(this).toggleClass('active')
      $(this).next('.content').toggle()
    })
  }

  $('#new-world').on('click', start)
  $('#spawn-plant').on('click', spawnPlants)
  $('#spawn-herbivore').on('click', spawnHerbivores)
  $('#spawn-carnivore').on('click', spawnCarnivores)
})
