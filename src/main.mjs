import { 
  HemisphereLight, 
  PerspectiveCamera, 
  Scene, 
  WebGLRenderer, 
} from '/libs/three.module.js';
import { Level } from './Level.mjs';
import { UserInput } from './UserInput.mjs';
import { UI } from './UI/index.mjs';
import { Engine } from './Engine/index.mjs';

const aspectRatio = 5 / 3;

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
// await ui.init();

//
// Hanlde User Input
const userInput = new UserInput(level);
window.userInput = userInput; // for debugging
await userInput.init();

//
// Animation Loop
async function animateLoop() {
  try {
    await engine.update();
    await ui.update();

    level.endTick();
    requestAnimationFrame(animateLoop);
  }
  catch (error) {
    console.log('%cError in animateLoop', 'color: red;font-size: 2em;')
    console.error(error);
  }
}
// Start the Animation Loop
animateLoop();
