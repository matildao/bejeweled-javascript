let y = 0;
let x = 0;
let p = 10;
let tileId = 0;
var selectedFirst = null;
var selectedSecond = null;

var prev1 = null;
var prev2 = null;

function turnStyleToPos(style) {
	return parseInt(style.replace("px", ""));
}

function getPositionOfElement(element) {
	const elY = turnStyleToPos(element.style.top);
	const elX = turnStyleToPos(element.style.left);

	return { x: elX, y: elY };
}

function isAdjacent() {
	let pos1 = getPositionOfElement(selectedFirst);
	let pos2 = getPositionOfElement(selectedSecond);

	const adjacentPos = {
		top: pos1.y + 70,
		bot: pos1.y - 70,
		left: pos1.x + 70,
		right: pos1.x - 70,
	};

	const compareY =
		(pos2.y === adjacentPos.top || pos2.y === adjacentPos.bot) &&
		pos2.x === pos1.x;
	const compareX =
		(pos2.x === adjacentPos.left || pos2.x === adjacentPos.right) &&
		pos2.y === pos1.y;

	if (compareY || compareX) {
		return true;
	}
	return false;
}

function checkMatching(tileX, tileY, gemType) {
	const matching = [];
	const checkX = 2 * 70;

	for (let i = tileX - checkX; i <= tileX + checkX; i += 70) {
		const checkTile = document.elementFromPoint(i, tileY);
		const checkNext = document.elementFromPoint(i + 70, tileY);
		const checkBehind = document.elementFromPoint(i - 70, tileY);

		if (checkTile.gem === gemType && checkNext.gem === gemType) {
			matching.push(checkTile);
		} else if (
			checkBehind !== null &&
			checkBehind.gem === gemType &&
			checkTile.gem === gemType
		) {
			matching.push(checkTile);
		} else if (
			checkBehind !== null &&
			checkBehind.gem === gemType &&
			checkNext.gem === gemType &&
			checkNext.gem === gemType
		)
			matching.push(checkTile);
	}

	matching.forEach((element) => {
		element.remove();
	});
}

function gemClicked(value) {
	if (selectedFirst === null) {
		selectedFirst = value;
		selectedFirst.style.border = "1px solid #cacaca";
	} else {
		selectedSecond = value;

		const test = selectedSecond.getBoundingClientRect();

		if (isAdjacent() === true) {
			swapTiles();
			setTimeout(function () {
				checkMatching(test.left, test.top, prev2.gem);
			}, 500);
		} else {
			console.log("is not adjacent");
			selectedFirst.style.border = "none";
			[selectedFirst, selectedSecond] = [null, null];
		}
	}
}

function swapBackTiles() {
	[prev1.style.left, prev2.style.left] = [prev2.style.left, prev1.style.left];
	[prev1.style.top, prev2.style.top] = [prev2.style.top, prev1.style.top];
}

function swapTiles() {
	prev1 = selectedSecond;
	prev2 = selectedFirst;

	[selectedFirst.style.left, selectedSecond.style.left] = [
		selectedSecond.style.left,
		selectedFirst.style.left,
	];

	[selectedFirst.style.top, selectedSecond.style.top] = [
		selectedSecond.style.top,
		selectedFirst.style.top,
	];

	selectedFirst.className = "slide-animation";
	selectedSecond.className = "slide-animation";
	selectedFirst.style.border = "none";

	selectedFirst = null;
	selectedSecond = null;
}

function generateBoard() {
	const boardContainer = document.getElementById("gamearea");

	for (let i = 0; i < gridSize; i++) {
		for (let a = 0; a < gridSize; a++) {
			const tileImages = [
				"diamond",
				"pink-diamond",
				"aquamarine",
				"green",
				"ruby",
				"grey",
			];
			const randomNumber = Math.floor(Math.random() * tileImages.length);
			const image = tileImages[randomNumber];

			const div = document.createElement("div");

			div.style.height = tileSize;
			div.style.width = tileSize;
			div.style.top = y + "px";
			div.style.left = `${x}px`;
			div.style.position = "absolute";
			div.style.padding = "5px";
			div.style.backgroundImage = `url(${image}.png)`;
			div.style.backgroundSize = "contain";
			div.style.backgroundRepeat = "no-repeat";
			div.style.backgroundPosition = "center";

			div.id = tileId;
			div.gem = image;
			div.onclick = () => gemClicked(div);

			x = x + 60 + p;
			tileId += 1;
			boardContainer.appendChild(div);
		}
		y = y + 60 + p;
		x = 0;
	}
}

function updateBoard() {
	//TODO drop gems that have no gem under them
}

//save position in id e.g. gem_05_04_03
