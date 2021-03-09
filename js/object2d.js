class Object2D {
	constructor(props) {
		this._liveProcess = true;
		this.height = props.height;
		this.width = props.width;
		this.idName = props.idName;
		this.render();
	}

	randomInt(min, max) {
		return Math.ceil(min + Math.random() * (max - min));
	}

	generateRandomColor() {
		let codes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += codes[this.randomInt(0, 15)];
		}
		return color;
	}

	updateBackground() {
		// funny function
		document.getElementById(this.idName).style.backgroundColor = this.generateRandomColor();
	}

	getPosition() {
		return {x: this.positionX, y: this.positionY};
	}

	getProperty() {
		return {width: this.width, height: this.height};
	}

	destroy() {
		this._liveProcess = false;
		document.getElementById(this.idName).remove();
	}

	render() {
		let renderProcess = setInterval(() => {
			if (!this._liveProcess) {
				clearInterval(renderProcess);
				return;
			}
			let objectHTML = document.getElementById(this.idName);
			objectHTML.style.bottom = this.positionY + 'px';
			objectHTML.style.left = this.positionX + 'px';
		}, config.updateSeconds);
	}
}