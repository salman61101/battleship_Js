import "./style.css";

import { startGame } from "./game.js";

import {
    renderBoards,
    setupRandomPlacement,
    setupRestart
} from "./ui.js";

startGame();

renderBoards();

setupRestart();

setupRandomPlacement();

console.log("Battleship Loaded");
