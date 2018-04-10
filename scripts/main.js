require(['jquery', 'foo'], function($, foo) {
  // global variables
  let i, j;
  let tiles = [];
  let plants = [];
  let $world = $('#world');
  let tileSize = 50;
  let world = {
    height: 10,
    width: 10
  };
  let initialCounts = {
    plants: 50,
    herbivores: 20,
    carnivores: 10
  };

  // utilities
  let randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  class Tile {
    constructor() {
      this.fertility = Math.random().toFixed(2);
    }

    static createElement() {
      return $('<div class="tile">');
    }
  }

  // create new world with tiles
  newWorld(world)

  function newWorld(config) {
    // generate new tile objects
    tiles = [];
    let tileCount = config.height * config.width;
    for (i = 0; i < tileCount; i++) {
      tiles.push(new Tile())
    }

    // update DOM
    $world.empty()
    // create grid: i = rows, j = columns
    for (i = 0; i < config.height; i++) {
      let $row = $('<div class="row">');
      for (j = 0; j < config.width; j++) {
        $row.append(Tile.createElement())
      }
      $world.append($row)
    }
  }

  updateWorld()

  function updateWorld() {
    // update colors
    $.each($('.tile'), function(i, tile) {
      const fertility = tiles[i].fertility;
      $(tile).css({
        backgroundColor: 'rgb(' + (100 + (100 * fertility)) + ', 200, 100)'
      })
    })
  }

  class Plant {
    constructor() {
      this.growth = 0;
      this.seedSpread = randInt(1, 10);
      this.x = randInt(1, world.width * tileSize);
      this.y = randInt(1, world.height * tileSize);
    }

    spawn() {
      let $e = $('<div class="plant">');
      $e.css({
        top: this.y,
        left: this.x
      })
      $world.append($e)
    }

    grow() {

    }
  }

  spawnPlants()

  function spawnPlants() {
    // generate new plant objects
    plants = [];
    for (i = 0; i < initialCounts.plants; i++) {
      plants.push(new Plant());
    }

    // update DOM
    plants.forEach((plant) => {
      plant.spawn()
    })
  }

  console.log(plants)
})
