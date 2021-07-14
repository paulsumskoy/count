"use strict";
// logic for the Count game

class NumberedBox extends createjs.Container {
  constructor (game, number = 0) {
    super()

    this.game = game
    this.number = number

    const movieclip = new lib.NumberedBox()
    movieclip.numberText.text = number

    new createjs.ButtonHelper(movieclip, 0, 1, 2, false, new lib.NumberedBox(), 3)

    movieclip.numberText.font = '28px Oswald'
    movieclip.numberText.textBaseline = 'alphabet'
    movieclip.numberText.x += 2
    movieclip.numberText.y = 35

    this.addChild(movieclip)

    this.setBounds(0, 0, 50, 50)

    // handle click/tap
    this.on('click', this.handleClick.bind(this))
  }

  handleClick () {
    this.game.handleClick(this)
    createjs.Sound.play('Power Up')
  }
}

// controls the game data
class GameData {
  constructor () {
    this.amountOfBox = 20
    this.resetData()
  }

  resetData () {
    this.currentNumber = 1
  }

  nextNumber () {
    this.currentNumber += 1
  }

  isRightNumber (number) {
    return number === this.currentNumber
  }

  isGameWin () {
    return this.currentNumber > this.amountOfBox
  }
}

class Game {
  constructor () {
    console.log(`Welcome to the game. Version ${this.version()}`)

    this.loadSound()

    this.canvas = document.getElementById('game-canvas')
    this.stage = new createjs.Stage(this.canvas)

    this.stage.width = this.canvas.width
    this.stage.height = this.canvas.height

    this.stage.enableMouseOver()

    // enable tap on touch divice
    createjs.Touch.enable(this.stage)

    // enable retina screen
    this.retinalized()

    createjs.Ticker.setFPS(60)

    // game related initialization
    this.gameData = new GameData()

    // keep re-drawing the stage.
    createjs.Ticker.on('tick', this.stage)

    this.restartGame()
  }

  version () {
    return '1.0.0'
  }

  loadSound () {
    createjs.Sound.alternateExtensions = ['ogg', 'wav']
    createjs.Sound.registerSound('soundfx/Powerup.aiff', 'Power Up')
    createjs.Sound.registerSound('soundfx/Gameover.aiff', 'Game Over')
  }

  restartGame () {
    this.gameData.resetData()
    this.stage.removeAllChildren()
    this.stage.addChild(new lib.Background())
    this.generalMultipleBoxes(this.gameData.amountOfBox)
  }

  generalMultipleBoxes (amount = 10) {
    for (let i = amount; i > 0; i--) {
      const movieclip = new NumberedBox(this, i)
      this.stage.addChild(movieclip)

      // random position
      movieclip.x = Math.random() * (this.stage.width - movieclip.getBounds().width)
      movieclip.y = Math.random() * (this.stage.height - movieclip.getBounds().height)
    }
  }

  handleClick (numberedBox) {
    if (this.gameData.isRightNumber(numberedBox.number)) {
      this.stage.removeChild(numberedBox)
      this.gameData.nextNumber()

      // is game over?
      if (this.gameData.isGameWin()) {
        createjs.Sound.play('Game Over')

        const gameOverView = new lib.GameOverView()
        this.stage.addChild(gameOverView)

        gameOverView.restartButton.on('click', function () {
          createjs.Sound.play('Power Up')

          this.restartGame()
        }.bind(this))
      }
    }
  }

  retinalized () {
    this.stage.width = this.stage.width
    this.stage.height = this.stage.height

    const ratio = window.devicePixelRatio
    if (ratio === undefined) {
      return
    }

    this.canvas.setAttribute('width', Math.round(this.stage.width * ratio))
    this.canvas.setAttribute('height', Math.round(this.stage.height * ratio))

    this.stage.scaleX = this.stage.scaleY = ratio

    // set CSS style
    this.canvas.style.width = this.stage.width + 'px'
    this.canvas.style.height = this.stage.height + 'px'
  }
}

// start the game
const game = new Game()
