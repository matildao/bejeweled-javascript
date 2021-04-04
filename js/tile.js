class Tile {
	constructor(size, x, y, id) {
		this.size = size;
		this.image = this.getImage();
		this.id = id.replace("tile", this.image);

		this.x = x;
		this.y = y;

		this.prevX;
		this.prevY;
	}

	getImage() {
		const tileImages = [
			"diamond",
			"pink-diamond",
			"aquamarine",
			"green",
			"ruby",
		];
		const randomNumber = Math.floor(Math.random() * tileImages.length);

		return tileImages[randomNumber];
	}

	setPosition(x, y) {
		this.x = x;
		this.y = y;
	}

	getPosition() {
		return { x: this.x, y: this.y };
	}

	getPrevPosition() {
		return { x: this.prevX, y: this.prevX };
	}

	// getPositionFromId() {
	// 	const id = this.id.split('_');
	// 	return id
	// }

	setPrevPosition(x, y) {
		this.prevX = x;
		this.prevY = y;
	}

	switchPlace = (newPos) => {
		let { x, y } = newPos;
		let element = document.getElementById(this.id);

		this.setPosition(x, y);

		element.style.left = `${newPos.x}px`;
		element.style.top = `${newPos.y}px`;
		element.className = "slide-animation";
	};

	switchToOldPosition() {
		this.switchPlace({
			x: this.prevX,
			y: this.prevY,
		});
	}

	existInTiles = () => {};

	checkMatchingTileInDirection = (direction, tile) => {
		const adjacentTiles = [
			{ x: this.x, y: this.y + 70 },
			{ x: this.x, y: this.y - 70 },
			{ x: this.x + 70, y: this.y },
			{ x: this.x - 70, y: this.y },
		];

		if (condition) {
		}
	};

	deleteAnimation(element) {
		element.className = "delete-animation";
	}

	isMatching() {
		const adjacentTiles = [
			{ x: this.x, y: this.y + 70 },
			{ x: this.x, y: this.y - 70 },
			{ x: this.x + 70, y: this.y },
			{ x: this.x - 70, y: this.y },
		];

		adjacentTiles.forEach((adjacent) => {
			if (condition) {
				return true;
			}
		});
	}

	checkMatchingTiles = () => {
		//TODO if 3 or more match in row then remove them all
		//checkmatching tiles in all diretions
		const adjacentGems = [];

		const adjacentTiles = [
			{ x: this.x, y: this.y + 70 },
			{ x: this.x, y: this.y - 70 },
			{ x: this.x + 70, y: this.y },
			{ x: this.x - 70, y: this.y },
		];

		adjacentTiles.forEach((adjacent) => {
			const adjacentElement = document.elementFromPoint(
				adjacent.x + 140,
				adjacent.y + 140
			).parentNode;

			const id = adjacentElement.id.split("_");
			const test = id[1];

			const x = parseInt(id[2]);
			const y = parseInt(id[3]);
			const tileImage = id[0];

			const adjacentClass = tiles[test];

			if (
				adjacent.x >= 0 &&
				adjacent.y >= 0 &&
				adjacentClass.image === selectedTile.image //FAST KOLLA OM NÄSTA/BREDVID POS DU SKA FLYTTA TILL ÄR SAMMA FÄRG I ALLA RIKTNINGAR
			) {
				//Om samma färg kör vidare och kolla nästa i samma riktning
				console.log("NEXT");
				console.log(adjacentElement);
			}
		});

		// return; //list of element tiles that is match
	};

	checkAdjacentTiles = () => {
		let element = document.getElementById(selectedTile.id);
		element.style.border = "1px solid #cacaca";

		const adjacentPos = {
			top: this.y + 70,
			bot: this.y - 70,
			left: this.x + 70,
			right: this.x - 70,
		};

		const compareY =
			(selectedTile.y === adjacentPos.top ||
				selectedTile.y === adjacentPos.bot) &&
			selectedTile.x === this.x;
		const compareX =
			(selectedTile.x === adjacentPos.left ||
				selectedTile.x === adjacentPos.right) &&
			selectedTile.y === this.y;

		if (compareY || compareX) {
			this.checkMatchingTiles();
			// selectedTile.prevY = selectedTile.getPosition();

			// const firstTile = this;
			// const secondTile = selectedTile;

			// firstTile.setPrevPosition(firstTile.x, firstTile.y);
			// selectedTile.setPrevPosition(selectedTile.x, selectedTile.y);

			// firstTile.switchPlace({ x: selectedTile.x, y: selectedTile.y });
			// selectedTile.switchPlace({ x: firstTile.prevX, y: firstTile.prevY });

			// if (this.image === selectedTile.image) {
			// 	console.log("SWITCH");
			// } else {
			// 	console.log("Cant switch");
			// 	setTimeout(function () {
			// 		firstTile.switchToOldPosition();
			// 		secondTile.switchToOldPosition();
			// 	}, 500);
			// }
		}

		selectedTile = null;
		element.style.border = "none";
	};

	clickTile = () => {
		const element = document.getElementById(this.id);

		if (selectedTile !== null) {
			this.checkAdjacentTiles();
		} else if (selectedTile === null) {
			element.style.border = "1px solid #cacaca";
			selectedTile = this;
		}
	};

	drawTile() {
		const div = document.createElement("div");
		const img = document.createElement("img");

		img.src = `${this.image}.png`;
		img.style.height = this.size;
		img.style.width = this.size;

		div.style.height = this.size;
		div.style.width = this.size;
		div.style.top = this.y + "px";
		div.style.left = `${this.x}px`;
		div.style.position = "absolute";
		div.style.padding = "5px";
		div.id = this.id;
		div.onclick = this.clickTile;

		div.append(img);

		return div;
	}

	isNextToTileOfSameColor() {}
}
