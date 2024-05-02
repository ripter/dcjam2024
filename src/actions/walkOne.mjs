
export async function* walkOne(entity, direction) {
  console.log('Walking one step...');
  yield 'KEEP GOING';
  console.log('Walking two step...');
  return 'DONE';
}