import { test, expect } from "@jest/globals";
import Player from "../src/player.js";

test("creates a human player", () => {

    const player = new Player();

    expect(player.isComputer).toBe(false);

});

test("creates a computer player", () => {

    const computer = new Player(true);

    expect(computer.isComputer).toBe(true);

});

test("player has a gameboard", () => {

    const player = new Player();

    expect(player.gameboard).toBeDefined();

});

test("computer attack returns coordinates", () => {

    const computer = new Player(true);

    const move = computer.randomAttack();

    expect(move.length).toBe(2);

});

test("computer never attacks the same square twice", () => {

    const computer = new Player(true);

    const attacks = [];

    for (let i = 0; i < 20; i++) {

        attacks.push(computer.randomAttack().toString());

    }

    const unique = new Set(attacks);

    expect(unique.size).toBe(attacks.length);

});