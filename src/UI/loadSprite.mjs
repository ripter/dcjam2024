import { Assets, Sprite } from '../../libs/pixi.min.mjs';

export async function loadSprite(url, tileSize) {
  const texture = await Assets.load(url);
  const sprite = new Sprite(texture);
  sprite.width = tileSize;
  sprite.height = tileSize;
  sprite.anchor.set(0.5);
  return sprite;
}