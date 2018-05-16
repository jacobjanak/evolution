define(function() {

  class Tile {
    constructor() {
      this.fertility = Number(Math.random().toFixed(2));
    }
  }

  return Tile;
})
