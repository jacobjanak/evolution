define(function() {

  class Tile {
    constructor() {
      this.fertility = Number(Math.random().toFixed(2));
    }

    static createElement() {
      return $('<div class="tile">');
    }
  }

  return Tile;
})
