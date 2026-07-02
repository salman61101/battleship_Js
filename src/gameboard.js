import Ship from "./ship.js";

export default class Gameboard {

    constructor() {

        this.ships = [];

        this.missedAttacks = [];

    }

    placeShip(x, y, length, direction) {

        const ship = new Ship(length);

        ship.positions = [];

        for (let i = 0; i < length; i++) {

            if (direction === "horizontal") {

                ship.positions.push([x + i, y]);

            } else {

                ship.positions.push([x, y + i]);

            }

        }

        this.ships.push(ship);

    }

    receiveAttack(x, y) {

        for (const ship of this.ships) {

            for (const position of ship.positions) {

                if (position[0] === x && position[1] === y) {

                    ship.hit();

                    return;

                }

            }

        }

        this.missedAttacks.push([x, y]);

    }

    allShipsSunk() {

        return this.ships.every(ship => ship.isSunk());

    }

}