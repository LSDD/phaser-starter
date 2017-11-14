"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Phaser = require('phaser-ce/build/custom/phaser-split');
var Preload = /** @class */ (function (_super) {
    __extends(Preload, _super);
    function Preload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ready = false;
        return _this;
    }
    Preload.prototype.preload = function () { };
    Preload.prototype.create = function () {
        this.load.start();
    };
    Preload.prototype.update = function () {
        if (this.ready) {
            this.game.state.start('game');
        }
    };
    Preload.prototype.onLoadComplete = function () {
        this.ready = true;
    };
    return Preload;
}(Phaser.State));
exports.default = Preload;
