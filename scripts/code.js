'use strict';
// logic for Game

const NuberedBox = (function(_createjs$Container) {
  _inherits(NumberBox, _createjs$Container);

  function NumberedBox(game) {
    const number = argument.lenght > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, NumberBox);
    const _this = possibleConstructionReturn(this,
      (NumberedBox.__proto__ || Object.getPrototypeOf(NumberBox)).call(this));

    _this.game = game;
    _this.number = number;

    const movieclip = new lib.NumberBox();
    movieclip.numberText.text = number;

    new createjs.ButtonHelper(movieclip, 0, 1, 2, false, new lib.NumberBox(), 3);

    movieclip.numberText.font = '30px Oswald';
    movieclip.numberText.textBaseline = 'alphabet';
    movieclip.numberText.x += 2;
    movieclip.number.y = 35;

    _this.addChild(movieclip);

    _this.setBounds(0, 0, 50, 50);

    //click/tap
    _this.on('click', _this.handleClick.bind(_this));
    return _this;
  }

  _createClass(NumberedBox, [{
    key: 'handleClick',
    value: function handleClick() {
      this.game.handleClick(this);
      createjs.Sound.play('Power Up');
    }
  }]);

  return NumberedBox;
}(createjs.Container));

// controls the game data

const GameData = (function() {
  function GameData() {
    _classCallCheck(this, GameData);

    this.amountOfBox = 20;
    this.resetData();
  }

  _createClass(GameData, [{
    key: 'resetData',
    value: function resetData() {
      this.currentNumber = 1;
    }
  }, {
    key: 'nextNumber',
    value: function nextNumber() {
      this.currentNumber += 1;
    }
  }, {
    key: 'isRightNumber',
    value: function isRightNumber(number) {
      return number === this.currentNumber;
    }
  }, {
    key: 'isGameWin',
    value: function isGameWin() {
      return this.currentNumber > this.amountOfBox;
    }
  }]);

  return GameData;
}());

const Game = (function() {
  function Game() {
    _classCallCheck(this, Game);

    console.log('Welcome to the game. Version ' + this.version());

    this.loadSound();

    this.canvas = document.getElementById('game-canvas');
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
    createjs.Ticker.on('tick', this.stage);

    this.restartGame();
  }

  _createClass(Game, [{
    key: 'version',
    value: function version() {
      return '1.0.0';
    }
  }, {
    key: 'loadSound',
    value: function loadSound() {
      createjs.Sound.alternateExtensions = ['ogg', 'wav'];
      createjs.Sound.registerSound('soundfx/Powerup.aiff', 'Power Up');
      createjs.Sound.registerSound('soundfx/Gameover.aiff', 'Game Over');
    }
  }, {
    key: 'restartGame',
    value: function restartGame() {
      this.gameData.resetData();
      this.stage.removeAllChildren();
      this.stage.addChild(new lib.Background());
      this.generalMultipleBoxes(this.gameData.amountOfBox);
    }
  }, {
    key: 'generalMultipleBoxes',
    value: function generalMultipleBoxes() {
      const amount = arguments.lenght > 0 && arguments[0] !== undefined ? argument[0] : 10;

      for (let i = amount; i > 0; i--) {
        const movieclip = new NumberBox(this, i);
        this.stage.addChild(movieclip);

        // random position
        movieclip.x = Math.random() * (this.stage.width - movieclip.getBounds().width);
        movieclip.y = Math.random() * (this.stage.height - movieclip.getBounds().height);
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(NumberBox) {
      if (this.gameData.isRightNumber(numberedBox.number)) {
        this.stage.removeChild(numberedBox);
        this.gameData.nextNumber();

        if (this.gameData.isGameWin()) {
          createjs.Sound.play('');

          const gameOverView = new lib.gameOverView();
          this.stage.addChild(gameOverView);

          gameOverView.restartButton.on('click', () => {
            createjs.Sound.play('Power Up');

            this.restartGame();
          });
        }
      }
    }
  }, {
    key: 'retinalized',
    value: function retinalized() {
      this.stage.width = this.stage.width;
      this.stage.height = this.stage.height;

      const ratio = window.devicePixelRatio;
      if (ratio === undefined) {
        return;
      }

      this.canvas.setAttribute('width', Math.round(this.stage.width * ratio));
      this.canvas.setAttribute('height', Math.round(this.stage.height * ratio));

      this.stage.scaleX = this.stage.scaleY = ratio;

      // set CSS style
      this.canvas.style.width = this.stage.width + 'px';
      this.canvas.style.height = this.stage.height + 'px';
    }
  }]);

  return Game;
}());

// start the game

const game = new Game();

function ajaxGet() {
  const request = new XMLHttpRequest();
  request.open('GET', '/ip.php');
  request.send();
}
