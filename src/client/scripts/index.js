"use strict";
// Client scripts start here
Object.defineProperty(exports, "__esModule", { value: true });
window.PIXI = require('phaser-ce/build/custom/pixi');
window.p2 = require('phaser-ce/build/custom/p2');
var Phaser = require('phaser-ce/build/custom/phaser-split');
window.Phaser = Phaser;
var Boot_1 = require("./states/Boot");
var Preload_1 = require("./states/Preload");
// import Game from "./states/Game";
var config_1 = require("../../config");
var game;
window.onload = function () {
    game = new Phaser.Game(config_1.default.gameWidth, config_1.default.gameHeight, Phaser.AUTO, 'GameContainer');
    game.state.add('boot', Boot_1.default);
    game.state.add('preload', Preload_1.default);
    // game.state.add("game", Game);
    game.state.start('boot');
};
