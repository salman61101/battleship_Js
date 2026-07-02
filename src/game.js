import Player from "./player.js";

export const human = new Player();

export const computer = new Player(true);

human.gameboard.placeShip(0, 0, 5, "horizontal");
human.gameboard.placeShip(2, 3, 4, "vertical");

computer.gameboard.placeShip(1, 1, 5, "horizontal");
computer.gameboard.placeShip(5, 4, 4, "vertical");