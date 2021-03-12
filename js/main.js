setTimeout(() => {
	document.getElementById("startRules").style.display = "none";
	document.getElementById("buttonRestart").addEventListener("click", Game.start.bind(Game));
	document.getElementById("checkbox").addEventListener("change", Game.toggleGameType.bind(Game));
	document.addEventListener("keyup", (key) => {
		if (key.code == "KeyR") {
			if (Game.isLive()) {
				Game.stop();
			}
			Game.start();
		}
	})
	Game.setGameType("funny");
	Game.start();
}, 3000);