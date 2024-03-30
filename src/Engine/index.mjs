
export class Engine {
  #level;
  #player;
  #ui;  
  constructor(level, player) {
    this.#level = level;
    this.#player = player;
    this.#ui = new UI(level, player);
  }
}