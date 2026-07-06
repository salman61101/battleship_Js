import { test, expect } from "@jest/globals";
import Gameboard from "../src/gameboard.js";

test("places a ship on the board", () => {
    const board = new Gameboard();

    board.placeShip(0, 0, 3, "horizontal");

    expect(board.ships.length).toBe(1);
});

test("rejects ships that go outside the board", () => {
    const board = new Gameboard();

    expect(() => {
        board.placeShip(8, 0, 3, "horizontal");
    }).toThrow("Invalid ship placement");
});

test("rejects overlapping ships", () => {
    const board = new Gameboard();

    board.placeShip(0, 0, 3, "horizontal");

    expect(() => {
        board.placeShip(1, 0, 3, "vertical");
    }).toThrow("Invalid ship placement");
});

test("attack hits a ship", () => {
    const board = new Gameboard();

    board.placeShip(0, 0, 3, "horizontal");

    board.receiveAttack(0, 0);

    expect(board.ships[0].hits).toBe(1);
});

test("attack records exact hit coordinates", () => {
    const board = new Gameboard();

    board.placeShip(0, 0, 3, "horizontal");

    board.receiveAttack(1, 0);

    expect(board.hitAttacks).toContainEqual([1, 0]);
});

test("attack records a miss", () => {
    const board = new Gameboard();

    board.receiveAttack(5, 5);

    expect(board.missedAttacks).toContainEqual([5, 5]);
});

test("attack does not count the same coordinate twice", () => {
    const board = new Gameboard();

    board.placeShip(0, 0, 3, "horizontal");

    board.receiveAttack(0, 0);
    board.receiveAttack(0, 0);

    expect(board.ships[0].hits).toBe(1);
});

test("allShipsSunk returns false initially", () => {
    const board = new Gameboard();

    board.placeShip(0, 0, 2, "horizontal");

    expect(board.allShipsSunk()).toBe(false);
});

test("allShipsSunk returns false when there are no ships", () => {
    const board = new Gameboard();

    expect(board.allShipsSunk()).toBe(false);
});

test("allShipsSunk returns true when ship sinks", () => {
    const board = new Gameboard();

    board.placeShip(0, 0, 2, "horizontal");

    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);

    expect(board.allShipsSunk()).toBe(true);
});
