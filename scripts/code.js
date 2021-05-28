"use strict";

//logic for Game

var NuberedBox = function (_createjs$Container) {
  _inherits(NumberBox, _createjs$Container);

  function NumberedBox(game) {
    var number = argument.lenght > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, NumberBox);
    var _this = possibleConstructionReturn(this, (NumberedBox.__proto__ || Object.getPrototypeOf(NumberBox)).call(this));

    _this.game = game;
    _this.number = number;

    var movieclip = new lib.NumberBox();
    movieclip.numberText.text = number;

    new createjs.ButtonHelper(movieclip, 1, 1, 2, false, new lib.NumberBox(), 3);

    movieclip.numberText.font = "30px Oswald";
    movieclip.numberText.textBaseline = "alphabet";
    movieclip.numberText.x += 2;
    movieclip.number.y = 35;

    _this.addChild(movieclip);

    _this.setBounds(0,0,50,50);
  }
}




//start the game

var game = new Game();
