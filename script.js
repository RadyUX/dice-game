let currentPlayer = 1
let roundScore = [0, 0]
let globalScore = [0, 0]
let hasRolled = [false, false];

function clearDice() {
    const dice = document.querySelector('.dice');
    dice.innerHTML = '';
  }

  
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
     clearDice()
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
const btnHold = document.querySelector(".hold-btn");
const btnNewGame = document.getElementById("reset")
 
btnNewGame.addEventListener("click", () =>{  
    currentPlayer = 1;
    roundScore = [0, 0];
    totalScore = [0, 0];
    hasRolled = [false, false];
    document.querySelector(`.player1 .current-score p`).textContent = roundScore[0];
    document.querySelector(`.player2 .current-score p`).textContent = roundScore[1];
    document.querySelector(`.player1 .global-score`).textContent = totalScore[0];
    document.querySelector(`.player2 .global-score`).textContent = totalScore[1];
    
    
    
  
    alert("score rénitialisé, nouvelle partie commencé !");
})

btnRollDice.addEventListener("click", () => {
    if (hasRolled[currentPlayer - 1]) {
        alert(`Le joueur ${currentPlayer} a déjà lancé les dés ce tour.`);
        return;
      }
    const random = Math.floor((Math.random() * 6) + 1);
	const dice = createDice(random);
    document.body.appendChild(dice);

    roundScore[currentPlayer - 1] += random 
    hasRolled[currentPlayer - 1] = true;
    document.querySelector(`.player${currentPlayer} .current-score p`).textContent = roundScore[currentPlayer - 1];

  console.log(`Tour du joueur ${currentPlayer}`);
	
});

btnHold.addEventListener("click", () => {
    if (!hasRolled[currentPlayer - 1]) {
        alert(`Le joueur ${currentPlayer} n'a pas encore lancé les dés.`);
        return;
      }

    globalScore[currentPlayer - 1] += roundScore[currentPlayer - 1]; 
  
    document.querySelector(`.player${currentPlayer} .global-score`).textContent =  globalScore[currentPlayer - 1];
  
    if (currentPlayer === 2) {
        roundScore = [0, 0];
        document.querySelector(`.player1 .current-score p`).textContent = roundScore[0];
        document.querySelector(`.player2 .current-score p`).textContent = roundScore[1];
      }
    
        // Ajouter la classe 'active' au joueur actif et la retirer de l'autre joueur
  document.querySelector(`.player${currentPlayer}`).classList.remove("active");
  document.querySelector(`.player${(currentPlayer % 2) + 1}`).classList.add("active");


    // changer le current player
    currentPlayer = (currentPlayer % 2) + 1;
    hasRolled = [false, false];
    console.log(`Tour du joueur ${currentPlayer}`);
  });