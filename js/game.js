class Game {
	constructor(props) {
		// pass
	}

	static toggleGameType() {
		if (this.gameType == "funny") {
			this.gameType = "classic";
		} else {
			this.gameType = "funny";
		}
	}

	static isLive() {
		return this.islive;
	}

	static setGameType(typeName) {
		this.gameType = typeName;
	}

	static updateScore() {
		this.score++;
		document.getElementById("scoreboard").innerHTML = (Math.ceil((this.score - 1)/ 21).toString());
	}

	static keyListener(key) {
		if (key.code == "KeyW") {
			Game.square.jump(Game.updateScore.bind(Game));
			switch (Game.gameType) {
				case "funny":
					Game.square.updateBackground();
					Game.objectsTarget.updateBackground();

					Game.transformType++;
					if (Game.transformType > Game.transformTypes.length - 1) Game.transformType = 0;

					document.getElementById('game').style.backgroundColor = Game.square.generateRandomColor();
					document.getElementById('place').style.backgroundColor = Game.square.generateRandomColor();
					document.getElementById('body').style.transform = Game.transformTypes[Game.transformType];
					break;
				case "classic":
					console.log(document.getElementById(Game.square.idName).classList[1]);
					if (document.getElementById(Game.square.idName).classList[1] == "white") {
						document.getElementById(Game.square.idName).classList.replace("white", "black");
						document.getElementById('game').style.backgroundColor = "#e9ebee";
						document.getElementById('place').style.backgroundColor = "black";
						Game.objectsTarget.updateBackground("black");
					} else {
						document.getElementById(Game.square.idName).classList.replace("black", "white");
						document.getElementById('place').style.backgroundColor = "#e9ebee";
						document.getElementById('game').style.backgroundColor = "black";
						Game.objectsTarget.updateBackground("#e9ebee");
					}
					// Game.objectsTarget;
					break;
			}
		}
	}

	static start() {
		console.log("Start game.");

		this.score = 0;
		this.islive = true

		document.getElementById("buttonRestart").classList.remove("active");
		document.getElementById("scoreboard").innerText = "0";

		switch (this.gameType) {
			case "funny":
				document.getElementById('game').style.backgroundColor = "aqua";
				document.getElementById('place').style.backgroundColor = "green";
				break;
			case "classic":
				document.getElementById('game').style.backgroundColor = "#e9ebee";
				document.getElementById('place').style.backgroundColor = "black";
				break;
		}

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
		this.objectsTarget.setCallback("checkTarget", this.updateScore.bind(Game));
		this.checkTargetObject = setInterval(() => {
			this.objectsTarget.checkTarget(this.square);
		}, config.updateSeconds);
	}

	static stop() {
		this.islive = false;

		clearInterval(this.checkTargetObject);

		this.square.destroy();
		this.objectsTarget.destroy();

		delete this.checkTargetObject;
		delete this.square;
		delete this.objectsTarget;

		document.removeEventListener("keyup", this.keyListener);
		document.getElementById("buttonRestart").classList.add("active");

		console.log("Stop game.");
	}
}