import { test, expect } from "@jest/globals";
import Ship from "../src/ship.js";

test("creates a ship with correct length", () => {
    const ship = new Ship(5);

    expect(ship.length).toBe(5);
});

test("ship starts with 0 hits", () => {
    const ship = new Ship(3);

    expect(ship.hits).toBe(0);
});

test("hit() increases hit count", () => {
    const ship = new Ship(4);

    ship.hit();

    expect(ship.hits).toBe(1);
});

test("ship is not sunk after one hit", () => {
    const ship = new Ship(3);

    ship.hit();

    expect(ship.isSunk()).toBe(false);
});

test("ship sinks after enough hits", () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
});