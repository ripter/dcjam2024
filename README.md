# dcjam2024 - Dungeon Crawler Jam 2024

Now it's a place to play with my homebrew Dungeon Crawler engine. 


## Run
The project is written with module javascript, so the only server requirement is a static server. You can use the server of your choice. I use python3 because it's part of my OS.

```
python3 -m http.server
```


# How to Use as an Engine

1. Clone this repo. 
2. Replace the README.md, LICENSE, etc with your own versions.
3. Create levels by adding level-config.json files to the `levels/` folder. 
4. Add custom Entity classes in the `entities/` folder.
5. If you didn't replace `index.html` with your own, you can try any level with `?level=configname`




## Tech Stack

* Three.JS for the 3D engine  
* [PixiJS](https://pixijs.download/release/docs/index.html) for the 2D UI.
* Blender for 3D models.
* Pixelmator Pro for 2D images.



# How/Why
This was going to be My entry for Dungeon Crawler Jam 2024. Starting off with an empty project is a lot more challenging than starting from Godot or Unreal. So I needed a base that could provide a level starting field for Dungeon Crawler Games.
I was unable to complete the entry in time, but continued development of the engine.