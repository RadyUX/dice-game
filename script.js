function createDice(number){
    const dotPositionMatrix = {
		1: [
			[50, 50]
		],
		2: [
			[20, 20],
			[80, 80]
		],
		3: [
			[20, 20],
			[50, 50],
			[80, 80]
		],
		4: [
			[20, 20],
			[20, 80],
			[80, 20],
			[80, 80]
		],
		5: [
			[20, 20],
			[20, 80],
			[50, 50],
			[80, 20],
			[80, 80]
		],
		6: [
			[20, 20],
			[20, 80],
			[50, 20],
			[50, 80],
			[80, 20],
			[80, 80]
		]
	};

     const dice = document.querySelector('.dice')

      for (const i of dotPositionMatrix[number]) {
        const dot = document.createElement('div')

        dot.classList.add('dice-dot')
        dot.style.setProperty("--top", i[0] + "%");
        dot.style.setProperty("--left", i[1] + "%");
		dice.appendChild(dot);
      }
 
return dice
}

const btnRollDice = document.querySelector(".roll-btn");


btnRollDice.addEventListener("click", () => {
createDice(6)
	console.log("dé lancé")
});