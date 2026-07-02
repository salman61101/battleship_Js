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

    player.gameboard.placeShip(
        0,
        0,
        5,
        "horizontal"
    );

    player.gameboard.placeShip(
        2,
        3,
        4,
        "vertical"
    );

    player.gameboard.placeShip(
        6,
        1,
        3,
        "horizontal"
    );

    player.gameboard.placeShip(
        7,
        6,
        3,
        "vertical"
    );

    player.gameboard.placeShip(
        4,
        8,
        2,
        "horizontal"
    );

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