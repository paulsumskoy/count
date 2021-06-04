"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    new createjs.ButtonHelper(movieclip, 0, 1, 2, false, new lib.NumberBox(), 3);

    movieclip.numberText.font = "30px Oswald";
    movieclip.numberText.textBaseline = "alphabet";
    movieclip.numberText.x += 2;
    movieclip.number.y = 35;

    _this.addChild(movieclip);

    _this.setBounds(0,0,50,50);

    //handle click/tap
    _this.on('click', _this.handleClick.bind(_this));
    return _this;
  }

  _createClass(NumberedBox, [{
    key: "handleClick",
    value: function handleClick() {
      this.game.handleClick(this);
      createjs.Sound.play("Power Up");
    }
  }]);

  return NumberedBox;
}(createjs.Container);


// controls the game data

var GameData = function () {
  function GameData() {
    _classCallCheck(this, GameData);

    this.amountOfBox = 20;
    this.resetData();
  }

  _createClass(GameData, [{
    key: "resetData",
    value: function resetData() {
      this.currentNumber = 1;
    }
  }, {
    key: "nextNumber",
    value: function nextNumber() {
      this.currentNumber += 1;
    }
  }, {
    key: "isRightNumber",
    value: function isRightNumber(number) {
      return number === this.currentNumber;
    }
  }, {
    key: "isGameWin",
    value: function isGameWin() {
      return this.currentNumber > this.amountOfBox;
    }
  }]);

  return GameData;
}();

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    console.log("Welcome to the game. Version " + this.version());

    this.loadSound();

    this.canvas = document.getElementById("game-canvas");
    this.stage = new createjs.Stage(this.canvas);

    this.stage.width = this.canvas.width;
    this.stage.height = this.canvas.height;

    this.stage.enableMouseOver();

    // enable tap on touch divice
    createjs.Touch.enable(this.stage);

    // enable retina screen
    this.retinalized();

    createjs.Ticker.setFPS(60);

    // game related initialization
    this.gameData = new GameData();

    // keep re-drawing the stage.
    createjs.Ticker.on("tick", this.stage);

    this.restartGame();
  }

    _createClass(Game, [{
      key: "version",
      value: function version() {
        return '1.0.0';
      }
    }, {
      key: "loadSound",
      value: function loadSound() {
        createjs.Sound.alternateExtensions = ["ogg", "wav"];
        createjs.Sound.registerSound("soundfx/Powerup.aiff", "Power Up");
        createjs.Sound.registerSound("soundfx/Gameover.aiff", "Game Over");
      }
    }, {
      key: "restartGame",
      value: function restartGame() {
        this.gameData.resetData();
        this.stage.removeAllChildren();
        this.stage.addChild(new lib.Background());
        this.generalMultipleBoxes(this.gameData.amountOfBox);
      }
    }, {
      key: "generalMultipleBoxes",
      value: function generalMultipleBoxes() {
        var amount = arguments.lenght > 0 && arguments[0] !== undefined ? argument[0] : 10;

        for (var i = amount; i > 0; i--) {
          var movieclip = new NumberBox(this, i);
          this.stage.addChild(movieclip);

          //random position
          movieclip.x = Math.random() * (this.stage.width - movieclip.getBounds().width);
          movieclip.y = Math.random() * (this.stage.height - movieclip.getBounds().height);
        }
      }
    }, {
      key: "handleClick",
      value: function handleClick(NumberBox) {
        if (this.gameData.isRightNumber(numberedBox.number)) {
          this.stage.removeChild(numberedBox);
          this.gameData.nextNumber();

          if (this.gameData.isGameWin()) {
            createjs.Sound.play("");

            var gameOverView = new lib.gameOverView();
            this.stage.addChild(gameOverView);

            gameOverView.restartButton.on('click', function () {
              createjs.Sound.play("Power Up");

              this.restartGame();
            }.bind(this));
          }
        }
      }
    }, {
    key: "retinalized",
    value: function retinalized() {
      this.stage.width = this.stage.width;
      this.stage.height = this.stage.height;

      var ratio = window.devicePixelRatio;
      if (ratio === undefined) {
        return;
      }

      this.canvas.setAttribute('width', Math.round(this.stage.width * ratio));
      this.canvas.setAttribute('height', Math.round(this.stage.height * ratio));

      this.stage.scaleX = this.stage.scaleY = ratio;

      // set CSS style
      this.canvas.style.width = this.stage.width + "px";
      this.canvas.style.height = this.stage.height + "px";
    }
  }]);

    return Game;
}();



//start the game !

var game = new Game();
