export function renderBoards(human, computer) {

    renderPlayerBoard(human);

    renderComputerBoard(computer);

}

function renderPlayerBoard(player) {

    const board =
        document.getElementById("player-board");

    board.innerHTML = "";

    for (let y = 0; y < 10; y++) {

        for (let x = 0; x < 10; x++) {

            const cell =
                document.createElement("div");

            cell.classList.add("cell");

            const ship =
                player.gameboard.ships.find(ship =>
                    ship.positions.some(
                        pos =>
                            pos[0] === x &&
                            pos[1] === y
                    )
                );

            if (ship) {

                cell.classList.add("ship");

            }

            board.appendChild(cell);

        }

    }

}

function renderComputerBoard(player) {

    const board =
        document.getElementById("computer-board");

    board.innerHTML = "";

    for (let y = 0; y < 10; y++) {

        for (let x = 0; x < 10; x++) {

            const cell =
                document.createElement("div");

            cell.classList.add("cell");

            cell.addEventListener("click", () => {

                player.gameboard.receiveAttack(x, y);

                updateEnemyBoard(player);

            });

            board.appendChild(cell);

        }

    }

}

function updateEnemyBoard(player) {

    const board =
        document.getElementById("computer-board");

    const cells = board.children;

    let index = 0;

    for (let y = 0; y < 10; y++) {

        for (let x = 0; x < 10; x++) {

            const cell = cells[index];

            const ship =
                player.gameboard.ships.find(ship =>
                    ship.positions.some(
                        pos =>
                            pos[0] === x &&
                            pos[1] === y
                    )
                );

            if (ship && ship.hits > 0) {

                cell.classList.add("hit");

            }

            if (

                player.gameboard.missedAttacks.some(

                    miss =>
                        miss[0] === x &&
                        miss[1] === y

                )

            ) {

                cell.classList.add("miss");

            }

            index++;

        }

    }

}