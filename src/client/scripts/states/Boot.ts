const Phaser = require('phaser-ce/build/custom/phaser-split');

class Boot extends Phaser.State {
  create(): void {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
}

export default Boot;
