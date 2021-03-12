class ObjectsTarget extends Object2D {
	constructor(count) {
		super({height: 0, width: 0, idName: "null"});
		this.objects = [];
		this.callbackList = [];
		for (let i = 4; i < count + 4; i++) {
			console.log(`Create ${i - 3}/${count} objects.`);
			this.objects.push(this.createObject({positionX: i * 500}));
		}
	}

	setCallback(method, callback) {
		switch (method) {
			case "checkTarget":
				this.callbackList.push({methodName: "checkTarget", callback: callback});
				break;
		}
		console.log(`Set a new callback for the method "${method}".`);

	}

	createObject(state) {
		let object = {id: this.objects.length, positionX: state.positionX, height: super.randomInt(70, 100)};
		let objectHTML = document.createElement('div');
		objectHTML.classList.add("objectTarget");
		objectHTML.dataset.objectTargetId = object.id;
		objectHTML.style.display = "none";
		document.getElementById('targetObjects').insertAdjacentElement('beforeend', objectHTML);
		return object;
	}

	destroy() {
		this._liveProcess = false;
		this.objects.forEach((element) => {
			document.querySelector(`[data-object-target-id="${element.id}"]`).remove();
			console.log(`Destruction of objects. ${element.id + 1}/${this.objects.length}.`);
		});
	}

	updateBackground(colorDefault = null) {
		if (colorDefault === null) {
			let color = this.generateRandomColor();
			this.objects.forEach((element) => {
				document.querySelector(`[data-object-target-id="${element.id}"]`).style.backgroundColor = color;
			});
		} else {
			this.objects.forEach((element) => {
				document.querySelector(`[data-object-target-id="${element.id}"]`).style.backgroundColor = colorDefault;
			});
		}
	}

	checkTarget(object) {
		let objectPosition = object.getPosition();
		let objectProperty = object.getProperty();
		for (let i = 0; i < this.objects.length; i++) {
			let element = this.objects[i];
			if ((objectPosition.x + objectProperty.width - 10) > element.positionX && objectPosition.x < (element.positionX + 40)) {
				if (objectPosition.y < (element.height + 190)) {
					Game.stop();
				}
				this.callbackList.forEach((element) => {
					if (element.methodName == "checkTarget") element.callback();
				})
			}
		}
	}

	render() {
		let renderProcess = setInterval(() => {
			if (!this._liveProcess) {
				clearInterval(renderProcess);
				return;
			}
			this.objects.forEach((element) => {
				let elementStyle = document.querySelector(`[data-object-target-id="${element.id}"]`).style;
				elementStyle.left = element.positionX + 'px';
				elementStyle.height = element.height + 'px';
				element.positionX -= 6;
				if (element.positionX < document.getElementById("game").scrollWidth - 55) elementStyle.display = "block";
				if (element.positionX < 0) {
					elementStyle.display = "none";
					element.positionX = document.getElementById("game").scrollWidth - 50;
					element.height = super.randomInt(70, 100);
				}
			});
		}, config.updateSeconds);
	}
}