import Ship from "./ship.js";

export default class Gameboard {

    constructor() {

        this.ships = [];

        this.missedAttacks = [];

        this.hitAttacks = [];

    }

    placeShip(x, y, length, direction) {

        const positions =
            this.getShipPositions(x, y, length, direction);

        if (
            !this.arePositionsInBounds(positions) ||
            this.hasOverlap(positions)
        ) {

            throw new Error("Invalid ship placement");

        }

        const ship = new Ship(length);

        ship.positions = positions;

        this.ships.push(ship);

        return ship;

    }

    receiveAttack(x, y) {

        if (!this.isInBounds(x, y) || this.wasAttacked(x, y)) {

            return false;

        }

        const ship =
            this.getShipAt(x, y);

        if (ship) {

            ship.hit();

            this.hitAttacks.push([x, y]);

            return true;

        }

        this.missedAttacks.push([x, y]);

        return false;

    }

    allShipsSunk() {

        return this.ships.length > 0 &&
            this.ships.every(ship => ship.isSunk());

    }

    wasAttacked(x, y) {

        return this.hitAttacks.some(
            attack => attack[0] === x && attack[1] === y
        ) ||
            this.missedAttacks.some(
                attack => attack[0] === x && attack[1] === y
            );

    }

    getShipAt(x, y) {

        return this.ships.find(ship =>
            ship.positions.some(
                position => position[0] === x && position[1] === y
            )
        );

    }

    getShipPositions(x, y, length, direction) {

        if (direction !== "horizontal" && direction !== "vertical") {

            throw new Error("Direction must be horizontal or vertical");

        }

        const positions = [];

        for (let i = 0; i < length; i++) {

            positions.push(
                direction === "horizontal"
                    ? [x + i, y]
                    : [x, y + i]
            );

        }

        return positions;

    }

    arePositionsInBounds(positions) {

        return positions.every(
            position => this.isInBounds(position[0], position[1])
        );

    }

    isInBounds(x, y) {

        return x >= 0 && x < 10 && y >= 0 && y < 10;

    }

    hasOverlap(positions) {

        return positions.some(position => this.getShipAt(position[0], position[1]));

    }

}
