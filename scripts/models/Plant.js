define(['../config', '../utilities/random'], function(config, random) {

  class Plant {
    constructor() {
      this.id = random.randStr(8);
      this.seedSpread = random.randInt(1, 10);
      this.x = random.randInt(1, config.worldDimensions.width * config.tileSize - config.plantSize);
      this.y = random.randInt(1, config.worldDimensions.height * config.tileSize - config.plantSize);
      this.growth = 0;
    }

    spawn() {
      let $e = $('<div class="plant">');
      $e.attr('id', this.id)
      $e.css({
        top: this.y,
        left: this.x
      })
      $('#world').append($e)
    }

    grow(fertility) {
      this.growth += Math.round(fertility * 100);
    }
  }

  return Plant;
})
