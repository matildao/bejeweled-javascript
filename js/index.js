var gameArea = document.getElementById("gamearea");
const tileSize = "60px";
const gridSize = 10;
const score = 0;

// let y = 0;
// let x = 0;
// let p = 10;
// let tileId = 0;

//global variables
// var selectedTile = null;

var tiles = [];

document.getElementById("score").innerHTML = `Score: ${score}`;

// const game = new Game(gameArea);

generateBoard();
// game.start();
