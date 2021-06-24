'use strict'

const Game = require('./game-es6')

const GameData = require('./game-es6')

test('test jest', () => {

    expect(4 + 5).toBe(9);

    expect(4 + 5).toBe(5);

})

describe('checking gamecode', () => {

    const d = new Game();

    test('version check', () => {

        expect(d.version).not.toBeUndefined();

        expect(d.version).toBe('1.0.0');

    })
})

describe('checking data', () => {

    const z = new GameData();

    test('check ingame win', () => {

        this.currentNumber = 10;

        this.amountOfBox = 5;

        expect(z.isGameWin()).toEqual(true);

    })
})
