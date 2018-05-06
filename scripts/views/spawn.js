define([
  'views/selectors' //BUG why does this work? it's like the path ain't relative
], function(selectors) {

  function spawn(organism, className) {
    let $e = $('<div>');
    $e.attr('class', className)
    $e.attr('id', organism.id)
    $e.css({
      top: organism.y,
      left: organism.x
    })
    selectors.world.append($e)
  }

  return spawn;

})
