
export const DIRECTION = {
  NORTH: 'NORTH',
  EAST: 'EAST',
  SOUTH: 'SOUTH',
  WEST: 'WEST',
};

export function rotateDirection(startDirection, turnDirection) {
  const directions = Object.values(DIRECTION);
  const startIndex = directions.indexOf(startDirection);
  let newIndex = startIndex + turnDirection;
  if (newIndex < 0) {
    newIndex = directions.length - 1;
  }
  else if (newIndex >= directions.length) {
    newIndex = 0;
  }
  // const newIndex = (startIndex + turnDirection) % directions.length;
  // console.log('new directoin', newIndex, directions[newIndex])
  return directions[newIndex];
}