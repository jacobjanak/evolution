define(function() {

  function touching(thing1, thing2) {
    // if they are the same size things are a little easier
    if (thing1.size === thing2.size) {
      if (Math.abs(thing1.x - thing2.x) <= thing1.size &&
          Math.abs(thing1.y - thing2.y) <= thing1.size) {
        return true;
      }
      return false;
    }

    // if they're different sizes
    const xMargin = thing1.x - thing2.x;
    const yMargin = thing1.y - thing2.y;

    if (xMargin >= 0 && yMargin >= 0) {
      if (xMargin <= thing1.size && yMargin <= thing2.size) {
        return true;
      }
      return false;
    }

    if (xMargin >= 0 && yMargin < 0) {
      if (xMargin <= thing1.size && yMargin >= 0 - thing2.size) {
        return true;
      }
      return false;
    }

    if (xMargin < 0 && yMargin >= 0) {
      if (xMargin >= 0 - thing1.size && yMargin <= thing2.size) {
        return true;
      }
      return false;
    }

    if (xMargin < 0 && yMargin < 0) {
      if (xMargin >= 0 - thing1.size && yMargin >= 0 - thing2.size) {
        return true;
      }
      return false;
    }
  }

  return touching;
})
