import { Engine } from './Engine/index.mjs';
import { Level } from './Level.mjs';
import { UI } from './UI/index.mjs';
import { UserInput } from './UserInput.mjs';
import { walkOne } from './actions/walkOne.mjs';

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
// Create the 2D UI
const ui = new UI(level);
window.ui = ui; // for debugging
await ui.init();

//
// Hanlde User Input
// const userInput = new UserInput(level);
// window.userInput = userInput; // for debugging
// await userInput.init();

const actionQueue = new Set();

// actionQueue.add(walkOne(level.player, 'north'));

//
// Game Loop
async function gameLoop() {
  // First step is to run the action queue
  for (const action of actionQueue) {
    const { value, done } = await action.next();
    console.log('action:', value, done);
    if (done) {
      actionQueue.delete(action);
    }
  }

  try {
    await engine.update();
    await ui.update();

    level.endTick();
    requestAnimationFrame(gameLoop);
  }
  catch (error) {
    console.log('%cError in animateLoop', 'color: red;font-size: 2em;')
    console.error(error);
  }
}
// Start the Game Loop
gameLoop();
