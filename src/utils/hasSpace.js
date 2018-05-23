import { touching } from '../utils';

function hasSpace(organism, organisms) {
  let returnValue = true;
  organisms.forEach((organism2) => {
    if (touching(organism, organism2)) returnValue = false;
  })
  return returnValue;
}

export default hasSpace;
