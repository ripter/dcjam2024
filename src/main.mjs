import { Engine } from './Engine/index.mjs';
import { Level } from './Level.mjs';
import  UI from './UI/index.mjs';
import { iterateActions, deleteAction } from './actions/index.mjs';

// Game Settings
const aspectRatio = 5 / 3;
window.minimapWidthInTiles = 6;

//
// Load the Level
// Level is specified in the URL query string, e.g. ?level=level001
// Load the level from the URL query string or default
const searchParams = new URLSearchParams(location.search)
const levelName = searchParams.get('level') || 'level1';
const level = await Level.Load(`/levels/${levelName}/config.json`);
window.level = level; // for debugging


//
// Create the 3D Engine
const engine = new Engine(level, aspectRatio, window.gameBody);
window.engine = engine; // for debugging
await engine.init();


//
// Initalize the 2D UI
await UI.init();
window.ui = UI; // for debugging


//
// Game Loop
async function gameLoop() {
  // First step is to run the action queue
  for (const action of iterateActions()) {
    const { value, done } = await action.next();
    console.log('Action:', value, done);
    if (done) {
      deleteAction(action);
    }
  }

  try {
    await engine.update();
    // await ui.update();

    requestAnimationFrame(gameLoop);
  }
  catch (error) {
    console.log('%cError in animateLoop', 'color: red;font-size: 2em;')
    console.error(error);
  }
}
// Start the Game Loop
gameLoop();
