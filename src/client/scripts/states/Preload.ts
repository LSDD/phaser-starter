const Phaser = require('phaser-ce/build/custom/phaser-split');

export default class Preload extends Phaser.State {
  ready: boolean = false;
  preload(): void {}
  create(): void {
    this.load.start();
  }
  update(): void {
    if (this.ready) {
      this.game.state.start('game');
    }
  }
  onLoadComplete(): void {
    this.ready = true;
  }
}
