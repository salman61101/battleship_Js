import {
    human,
    computer,
    playerAttack,
    computerAttack,
    checkWinner,
    getCurrentTurn,
    restartGame
} from "./game.js";

export function renderBoards() {

    renderPlayerBoard();

    renderComputerBoard();

    updateStatus();

}

function renderPlayerBoard() {

    const board =
        document.getElementById("player-board");

    board.innerHTML = "";

    for (let y = 0; y < 10; y++) {

        for (let x = 0; x < 10; x++) {

            const cell =
                document.createElement("div");

            cell.classList.add("cell");

            const ship =
                human.gameboard.getShipAt(x, y);

            if (ship) {

                cell.classList.add("ship");

            }

            const hit =
                human.gameboard.hitAttacks.find(
                    attack =>
                        attack[0] === x &&
                        attack[1] === y
                );

            if (hit) {

                cell.classList.add("hit");

            }

            const miss =
                human.gameboard.missedAttacks.find(
                    attack =>
                        attack[0] === x &&
                        attack[1] === y
                );

            if (miss) {

                cell.classList.add("miss");

            }

            board.appendChild(cell);

        }

    }

}

function renderComputerBoard() {

    const board =
        document.getElementById("computer-board");

    board.innerHTML = "";

    for (let y = 0; y < 10; y++) {

        for (let x = 0; x < 10; x++) {

            const cell =
                document.createElement("div");

            cell.classList.add("cell");

            cell.addEventListener("click", () => {

                if (checkWinner()) {

                    return;

                }

                const played =
                    playerAttack(x, y);

                if (!played) {

                    return;

                }

                computerAttack();

                renderBoards();

                const winner =
                    checkWinner();

                if (winner) {

                    const status =
                        document.getElementById("status");

                    status.textContent =
                        winner === "human"
                            ? "🏆 Congratulations! You sank every enemy ship!"
                            : "💀 The computer destroyed your fleet!";

                    document
                        .getElementById("restart-btn")
                        .textContent = "Play Again";

                }

            });

            const hit =
                computer.gameboard.hitAttacks.find(
                    attack =>
                        attack[0] === x &&
                        attack[1] === y
                );

            if (hit) {

                cell.classList.add("hit");

            }

            const miss =
                computer.gameboard.missedAttacks.find(
                    attack =>
                        attack[0] === x &&
                        attack[1] === y
                );

            if (miss) {

                cell.classList.add("miss");

            }

            board.appendChild(cell);

        }

    }

}

function updateStatus() {

    const status =
        document.getElementById("status");

    if (!status) {

        return;

    }

    status.textContent =
        getCurrentTurn() === "human"
            ? "Your Turn"
            : "Computer's Turn";

}

export function setupRestart() {

    const button =
        document.getElementById("restart-btn");

    button.addEventListener("click", () => {

        restartGame();

        button.textContent = "Restart Game";

        renderBoards();

    });

}

export function setupRandomPlacement() {

    const button =
        document.getElementById("random-placement-btn");

    button.addEventListener("click", () => {

        restartGame();

        button.textContent = "Randomize Fleets";

        renderBoards();

    });

}
