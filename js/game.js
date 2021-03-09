class Game {
	constructor(props) {
		// nope
	}

	static keyListener(key) {
		if (key.code == "KeyW") {
			Game.square.jump();
			Game.square.updateBackground();
			Game.objectsTarget.updateBackground();

			Game.transformType++;
			if (Game.transformType > Game.transformTypes.length - 1) Game.transformType = 0;

			document.getElementById('game').style.backgroundColor = Game.square.generateRandomColor();
			document.getElementById('place').style.backgroundColor = Game.square.generateRandomColor();
			document.getElementById('body').style.transform = Game.transformTypes[Game.transformType];
		}
	}

	static start() {
		document.getElementById("buttonRestart").classList.remove("active");
		document.getElementById('game').style.backgroundColor = "aqua";
		document.getElementById('place').style.backgroundColor = "green";

		this.transformType = 0;
		this.transformTypes = ["rotateX(0deg)", "rotateX(180deg)", "rotateY(75deg)", "rotateZ(180deg)", "rotateZ(45deg)", "rotateX(75deg)"];
		document.getElementById('body').style.transform = this.transformTypes[this.transformType];
		
		let stateSquare = {
			height: 100,
			width: 100,
			idName: "square"
		};

		this.square = new Square(stateSquare);

		document.addEventListener("keyup", this.keyListener);

		this.objectsTarget = new ObjectsTarget(3);
		this.checkTargetObject = setInterval(() => {
			this.objectsTarget.checkTarget(this.square);
		}, config.updateSeconds);
	}

	static stop() {
		clearInterval(this.checkTargetObject);
		this.square.destroy();
		this.objectsTarget.destroy();
		delete this.checkTargetObject;
		delete this.square;
		delete this.objectsTarget;
		document.removeEventListener("keyup", this.keyListener);
		document.getElementById("buttonRestart").classList.add("active");
	}
}