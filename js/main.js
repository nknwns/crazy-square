setTimeout(() => {
	document.getElementById("startRules").style.display = "none";
	document.getElementById("buttonRestart").addEventListener("click", () => {
		Game.start();
	});

	Game.start();
}, 3000);