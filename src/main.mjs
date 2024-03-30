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
const engine = new Engine(level);
window.engine = engine; // for debugging


//
// Create the 2D UI
const ui = new UI(level);
window.ui = ui; // for debugging

//
// Hanlde User Input
const userInput = new UserInput(level);
window.userInput = userInput; // for debugging


// Create the Player
// const camera = new PerspectiveCamera(75, 5/3, 0.1, 1000);
// const player = new UserInput(camera, level);
// window.player = player;


//
// Create the renderer
// const renderer = new WebGLRenderer();
// renderer.domElement.id = 'main-canvas';
// window.gameBody.appendChild(renderer.domElement);

// Resize the game when the window is resized
// resizeGame();
// window.addEventListener('resize', resizeGame);


// const scene = new Scene();
// // Add the Level to the scene.
// level.scene.position.set(0, 0, 0);
// scene.add(level.scene);

// Create the UI
// const ui = new UI(level, player);
// await ui.init();
// window.ui = ui;


// Add some light
// const light = new HemisphereLight(0xffffff, 0x444444);
// light.position.set(1, 1, 1);
// scene.add(light);

function animateLoop() {
    requestAnimationFrame(animateLoop);
    ui.update();
    // Render the scene
    renderer.render(scene, camera);
}

// Start the Animation Loop
animateLoop();


// function resizeGame() {
//   const { width, height } = calculateSize();
//   window.gameBody.style.width = `${width}px`;
//   window.gameBody.style.height = `${height}px`;
//   renderer.setSize(width, height);
//   camera.aspect = width / height;
//   camera.updateProjectionMatrix();
// }


// Calculate the largest 5:3 aspect ratio dimensions that fit entirely in the current screen
// function calculateSize() {
//   let width = window.innerWidth;
//   let height = window.innerHeight;
//   const aspectRatio = 5 / 3;

//   // Adjust width and height based on the aspect ratio
//   if (width / height > aspectRatio) {
//       // Window is too wide
//       width = height * aspectRatio;
//   } else {
//       // Window is too tall
//       height = width / aspectRatio;
//   }

//   return { width, height };
// }


