require([
  'jquery',
  'config',
  'models/Tile',
  'models/Plant',
  'models/Herbivore',
  'models/Carnivore',
  'views/spawn',
  'utilities/find',
  'utilities/isTouching'
], function($, config, Tile, Plant, Herbivore, Carnivore, spawn, find, isTouching) {

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
    updateConfig()
    updateStatistics()
    updateStyleTag()
    spawnTiles()
    updateDOM()
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
        if (isTouching(newPlant, plant)) hasSpace = false;
      })

      // spawn it if there's enough space for it
      if (hasSpace) {
        plants.push(newPlant)
        spawn(newPlant, 'plant')
      }
    }
  }

  function spawnHerbivores() {
    // generate new herbivore objects
    for (i = 0; i < config.spawnCount.herbivores; i++) {
      const herbivore = new Herbivore();
      spawn(herbivore, 'herbivore')
      herbivores.push(herbivore);
    }
  }

  function spawnCarnivores() {
    // generate new herbivore objects
    for (i = 0; i < config.spawnCount.carnivores; i++) {
      const carnivore = new Carnivore();
      spawn(carnivore, 'carnivore')
      carnivores.push(carnivore);
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
    updateStatistics()
  }

  function reproducePlants() {
    plants.forEach((plant) => {
      if (plant.reproductionCycle === 0) {
        let newPlant = plant.reproduce();
        if (newPlant) {
          let hasSpace = true;
          plants.forEach((plant2, j) => {
            if (isTouching(newPlant, plant2)) hasSpace = false;
          })
          if (hasSpace) {
            spawn(newPlant, 'plant')
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
      herbivore.hunger -= config.hunger.herbivore;

      // eat plants
      plants.forEach((plant, j) => {
        if (isTouching(herbivore, plant)) {
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
          spawn(newHerbivore, 'herbivore')
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
      carnivore.hunger -= config.hunger.carnivore;

      // eat herbivores
      if (carnivore.hunger <= 90) {
        herbivores.forEach((herbivore, j) => {
          if (isTouching(carnivore, herbivore)) {
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
          spawn(newCarnivore, 'carnivore')
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

  function updateConfig() {
    config.world.height = Number($('#world-height').val());
    config.world.width = Number($('#world-width').val());
    config.size.tile = Number($('#tile-size').val());
    config.size.plant = Number($('#plant-size').val());
    config.size.herbivore = Number($('#herbivore-size').val());
    config.size.carnivore = Number($('#carnivore-size').val());
    config.spawnCount.plants = Number($('#plant-count').val());
    config.spawnCount.herbivores = Number($('#herbivore-count').val());
    config.spawnCount.carnivores = Number($('#carnivore-count').val());
    config.reproductionRate.plant = Number($('#plant-reproduction').val());
    config.reproductionRate.herbivore = Number($('#herbivore-reproduction').val());
    config.reproductionRate.carnivore = Number($('#carnivore-reproduction').val());
    console.log(config)
  }

  function updateStatistics() {
    // population
    $('#number-of-plants').text(plants.length)
    $('#number-of-herbivores').text(herbivores.length)
    $('#number-of-carnivores').text(carnivores.length)
    // preference
    let totalPreference = 0;
    herbivores.forEach((herbivore) => {
      totalPreference += herbivore.preference;
    })
    let avgPreference = totalPreference ? (totalPreference / herbivores.length).toFixed(2) : '0.00';
    $('#herbivore-preference').text(avgPreference)

    totalPreference = 0;
    carnivores.forEach((carnivore) => {
      totalPreference += carnivore.preference;
    })
    avgPreference = totalPreference ? (totalPreference / carnivores.length).toFixed(2) : '0.00';
    $('#carnivore-preference').text(avgPreference)
  }

  function updateStyleTag() {
    $('style').text(`
      .tile {
        height: ${config.size.tile}px;
        width: ${config.size.tile}px;
      }
      .plant {
        height: ${config.size.plant}px;
        width: ${config.size.plant}px;
        line-height: ${config.size.plant}px;
      }
    `)
  }

  // menu
  let collapsibles = $('.collapsible');
  for (i = 0; i < collapsibles.length; i++) {
    $(collapsibles[i]).on('click', function() {
      // close all tabs that are already open
      $.each(collapsibles, (i, collapsible) => {
        if (this !== collapsible) {
          $(collapsible).removeClass('active')
          $(collapsible).next('.content').hide()
        }
      })
      // open or close the new one
      $(this).toggleClass('active')
      $(this).next('.content').toggle()
    })
  }

  $('#new-world').on('click', start)
  $('#spawn-plant').on('click', spawnPlants)
  $('#spawn-herbivore').on('click', spawnHerbivores)
  $('#spawn-carnivore').on('click', spawnCarnivores)

  $('.settings').on('change', function() {
    updateConfig()
    updateStyleTag()
  })
})
