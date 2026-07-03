import Player from "./player.js";

export let human;
export let computer;

let currentTurn = "human";
const computerAttacks = [];
const playerAttacks = [];

export function startGame() {

    human = new Player();

    computer = new Player(true);

    currentTurn = "human";

    placeShips(human);

    placeShips(computer);

}

function placeShips(player) {

    const ships = [5, 4, 3, 3, 2];

    ships.forEach(length => {

        let placed = false;

        while (!placed) {

            const direction =
                Math.random() > 0.5
                    ? "horizontal"
                    : "vertical";

            const x =
                Math.floor(Math.random() * 10);

            const y =
                Math.floor(Math.random() * 10);

            try {

                player.gameboard.placeShip(
                    x,
                    y,
                    length,
                    direction
                );

                placed = true;

            }

            catch {

            }

        }

    });

}

export function playerAttack(x, y) {

    if (currentTurn !== "human") {

        return false;

    }

    const alreadyPlayed =
        playerAttacks.some(
            attack =>
                attack[0] === x &&
                attack[1] === y
        );

    if (alreadyPlayed) {

        return false;

    }

    playerAttacks.push([x, y]);

    computer.gameboard.receiveAttack(x, y);

    currentTurn = "computer";

    return true;

}

export function computerAttack() {

    if (currentTurn !== "computer") {

        return;

    }

    while (true) {

        const x =
            Math.floor(Math.random() * 10);

        const y =
            Math.floor(Math.random() * 10);

        const played =
            computerAttacks.some(
                attack =>
                    attack[0] === x &&
                    attack[1] === y
            );

        if (played) {

            continue;

        }

        computerAttacks.push([x, y]);

        human.gameboard.receiveAttack(x, y);

        break;

    }

    currentTurn = "human";

}

export function checkWinner() {

    if (computer.gameboard.allShipsSunk()) {

        return "human";

    }

    if (human.gameboard.allShipsSunk()) {

        return "computer";

    }

    return null;

}

export function getCurrentTurn() {

    return currentTurn;

}

export function restartGame() {

    computerAttacks.length = 0;

    playerAttacks.length = 0;

    startGame();

}