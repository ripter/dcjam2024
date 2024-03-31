# dcjam2024 - Dungeon Crawler Jam 2024

Now it's a place to play with my homebrew Dungeon Crawler engine. 


## Run
The project is written with module javascript, so the only server requirement is a static server. You can use the server of your choice. I use python3 because it's part of my OS.

```
python3 -m http.server
```


## Architecture
Core Classes and Their Roles
#### Level Class

The Level Class instance in the source of truth for a running game.


#### Engine Class

The Engine Class instance handles the 3D using Three.JS


#### UI Class

The UI Class instance handles the game UI using PIXI.js

#### UserInput Class

The UserInput class instance captures and processes user inputs and updates the Level instance.




## Tech Stack

* Three.JS for the 3D engine  
* [PixiJS](https://pixijs.download/release/docs/index.html) for the 2D UI.
* Blender for 3D models.
* Pixelmator Pro for 2D images.


## Idea: Solar Probe


## Things to think about while building.
* Day/Night cycle.
* Power meter.
* Game over: No power for 24 hours.
* Interaction points, consumable.

# How/Why
This was going to be My entry for Dungeon Crawler Jam 2024. Starting off with an empty project is a lot more challenging than starting from Godot or Unreal. So I needed a base that could provide a level starting field for Dungeon Crawler Games.