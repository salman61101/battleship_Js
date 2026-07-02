import Gameboard from "./gameboard.js";

export default class Player {

    constructor(isComputer = false) {

        this.isComputer = isComputer;

        this.gameboard = new Gameboard();

        this.previousMoves = [];

    }

    randomAttack() {

        let x;
        let y;

        do {

            x = Math.floor(Math.random() * 10);

            y = Math.floor(Math.random() * 10);

        } while (

            this.previousMoves.some(
                move => move[0] === x && move[1] === y
            )

        );

        this.previousMoves.push([x, y]);

        return [x, y];

    }

}