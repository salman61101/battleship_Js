import "./style.css";

import { startGame } from "./game.js";

import {
    renderBoards,
    setupRestart
} from "./ui.js";

startGame();

renderBoards();

setupRestart();

console.log("Battleship Loaded");