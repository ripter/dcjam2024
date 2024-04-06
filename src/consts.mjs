
export const DIRECTION = {
  NORTH: 'NORTH',
  EAST: 'EAST',
  SOUTH: 'SOUTH',
  WEST: 'WEST',
};


export function rotateDirection(startDirection, turnDirection) {
  switch (startDirection) {
    case DIRECTION.NORTH:
      return turnDirection === -1 ? DIRECTION.WEST : DIRECTION.EAST;
    case DIRECTION.EAST:
      return turnDirection === -1 ? DIRECTION.NORTH : DIRECTION.SOUTH;
    case DIRECTION.SOUTH:
      return turnDirection === -1 ? DIRECTION.EAST : DIRECTION.WEST;
    case DIRECTION.WEST:
      return turnDirection === -1 ? DIRECTION.SOUTH : DIRECTION.NORTH;
    default:
      return startDirection;
  }
}
