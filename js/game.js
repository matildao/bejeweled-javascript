let y = 0;
let x = 0;
let p = 10;
let tileId = 0;
var selectedFirst = null;
var selectedSecond = null;

var prevSelectedFirst = null;
var prevSelectedSecond = null;

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

function checkMatchingTiles(tile, behind, next, gemType) {
	if (!tile || !behind || !next) return false;

	if (tile.gem === gemType && behind.gem === gemType && next.gem === gemType) {
		return true;
	}

	return false;
}

function checkMatching(tileX, tileY, gemType) {
	const matchingX = [];
	const matchingY = [];
	const allMatches = [];

	const check = 2 * 70;

	for (let i = tileX - check; i <= tileX + check; i += 70) {
		const checkTile = document.elementFromPoint(i, tileY);
		const checkNext = document.elementFromPoint(i + 70, tileY);
		const checkBehind = document.elementFromPoint(i - 70, tileY);

		if (checkMatchingTiles(checkTile, checkNext, checkBehind, gemType)) {
			matchingX.push(checkTile, checkBehind, checkNext);
		}
	}

	for (let i = tileY - check; i <= tileY + check; i += 70) {
		const checkTile = document.elementFromPoint(tileX, i);
		const checkNext = document.elementFromPoint(tileX, i + 70);
		const checkBehind = document.elementFromPoint(tileX, i - 70);

		if (checkMatchingTiles(checkTile, checkNext, checkBehind, gemType)) {
			matchingY.push(checkTile, checkBehind, checkNext);
		}
	}

	if (matchingX.length >= 3) allMatches.push(...matchingX);
	if (matchingY.length >= 3) allMatches.push(...matchingY);

	return allMatches;
}

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
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
				const matches = checkMatching(
					test.left,
					test.top,
					prevSelectedFirst.gem
				);

				if (matches.length === 0) {
					swapBackTiles();
				} else {
					matches.forEach((match) => {
						match.remove();
					});
				}
			}, 500);
		} else {
			console.log("is not adjacent");
			selectedFirst.style.border = "none";
			[selectedFirst, selectedSecond] = [null, null];
		}
	}
}

function swapBackTiles() {
	[prevSelectedFirst.style.left, prevSelectedSecond.style.left] = [
		prevSelectedSecond.style.left,
		prevSelectedFirst.style.left,
	];
	[prevSelectedFirst.style.top, prevSelectedSecond.style.top] = [
		prevSelectedSecond.style.top,
		prevSelectedFirst.style.top,
	];
}

function swapTiles() {
	prevSelectedFirst = selectedFirst;
	prevSelectedSecond = selectedSecond;

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
			let image = tileImages[randomNumber];

			// if (checkMatching(x, y, image).length > 0) {
			// 	console.log("HEJ");
			// 	let colorIndex = tileImages.indexOf(image);
			// 	let newColors = tileImages.splice(colorIndex);

			// 	const newRandom = Math.floor(Math.random() * newColors.length);
			// 	image = newColors[newRandom];
			// }

			const div = document.createElement("div");

			div.style.height = tileSize;
			div.style.width = tileSize;
			div.style.top = y + "px";
			div.style.left = `${x}px`;
			div.style.position = "absolute";
			div.style.padding = "5px";
			div.style.backgroundImage = `url(./image/${image}.png)`;
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
