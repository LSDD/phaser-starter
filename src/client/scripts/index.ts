// Client scripts start here

(<any>window).PIXI = require('phaser-ce/build/custom/pixi');
(<any>window).p2 = require('phaser-ce/build/custom/p2');
const Phaser = require('phaser-ce/build/custom/phaser-split');
(<any>window).Phaser = Phaser;

import Boot from './states/Boot';
import Preload from './states/Preload';
// import Game from "./states/Game";

import config from '../../config';

let game;

window.onload = function() {
  game = new Phaser.Game(
    config.gameWidth,
    config.gameHeight,
    Phaser.AUTO,
    'GameContainer'
  );
  game.state.add('boot', Boot);
  game.state.add('preload', Preload);
  // game.state.add("game", Game);
  game.state.start('boot');
};
