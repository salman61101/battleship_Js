import { test, expect } from "@jest/globals";
import Gameboard from "../src/gameboard.js";

test("places a ship on the board", () => {
    const board = new Gameboard();

    board.placeShip(0, 0, 3, "horizontal");

    expect(board.ships.length).toBe(1);
});

test("attack hits a ship", () => {
    const board = new Gameboard();

    board.placeShip(0, 0, 3, "horizontal");

    board.receiveAttack(0, 0);

    expect(board.ships[0].hits).toBe(1);
});

test("attack records a miss", () => {
    const board = new Gameboard();

    board.receiveAttack(5, 5);

    expect(board.missedAttacks).toContainEqual([5, 5]);
});

test("allShipsSunk returns false initially", () => {
    const board = new Gameboard();

    board.placeShip(0, 0, 2, "horizontal");

    expect(board.allShipsSunk()).toBe(false);
});

test("allShipsSunk returns true when ship sinks", () => {
    const board = new Gameboard();

    board.placeShip(0, 0, 2, "horizontal");

    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);

    expect(board.allShipsSunk()).toBe(true);
});