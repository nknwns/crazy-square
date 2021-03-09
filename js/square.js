class Square extends Object2D {
	constructor(props) {
		super(props);
		this.positionX = document.getElementById('game').scrollWidth / 2 - props.width / 2;
		this.positionY = 200;
		this.createSquare();
		this.gravity();
	}

	jump() {
		if (this.positionY > 200) return;
		let counter = 0;
		let jumpProcess = setInterval(() => {
			if (counter > 50) clearInterval(jumpProcess);
			counter++;
			this.positionY += 5;
		}, 2);
	}

	createSquare() {
		let elementHTML = document.createElement('div');
		elementHTML.classList.add("square");
		elementHTML.id = "square";
		document.getElementById("game").insertAdjacentElement("afterend", elementHTML);
	}

	gravity() {
		this._gravityProcess = setInterval(() => {
			if (this.positionY > 200) this.positionY -= 5;
		}, config.updateSeconds);
	}
}

