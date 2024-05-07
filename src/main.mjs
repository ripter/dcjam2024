import ThreeD from './ThreeD/index.mjs';
import { Level } from './Level.mjs';
import  UI from './UI/index.mjs';
import { iterateActions, deleteAction } from './actions/index.mjs';

// Game Settings
const aspectRatio = 5 / 3;
window.minimapWidthInTiles = 6;

//
// Initalize the 3D Engine
// const engine = new Engine(level, aspectRatio, window.gameBody);
await ThreeD.init(aspectRatio, window.gameBody);
await ThreeD.resize();
window.ThreeD = ThreeD; // for debugging


//
// Initalize the 2D Engine
await UI.init();
await UI.resize();
window.ui = UI; // for debugging


//
// Load the Level
// Level is specified in the URL query string, e.g. ?level=level001
// Load the level from the URL query string or default
const searchParams = new URLSearchParams(location.search)
const levelName = searchParams.get('level') || 'level1';
const level = await Level.Load(`/levels/${levelName}/config.json`);
window.level = level; // for debugging
// Render the floor map
await ThreeD.loadFloorMap(level.floorMap);
await UI.loadLevel(level);


//
// Game Loop
async function gameLoop() {
  // First step is to run the action queue
  for (const action of iterateActions()) {
    try {
      const { value, done } = await action.next();
      console.log('Action:', value, done);
      if (done) {
        deleteAction(action);
      }
    } catch (error) {
      console.error('Error in action loop:', error);
    }
  }

  try {
    // await ui.update();
    await ThreeD.render();

    requestAnimationFrame(gameLoop);
  }
  catch (error) {
    console.log('%cError in animateLoop', 'color: red;font-size: 2em;')
    console.error(error);
  }
}
// Start the Game Loop
gameLoop();
