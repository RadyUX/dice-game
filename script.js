let currentPlayer = 1
let roundScore = [0, 0]
let globalScore = [0, 0]

const btnRollDice = document.querySelector(".roll-btn");
const btnHold = document.querySelector(".hold-btn");
const btnNewGame = document.getElementById("reset")

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


function clearDice() {
  const dice = document.querySelector('.dice');
  dice.innerHTML = '';
}



function clearGame(){
  currentPlayer = 1;
    roundScore = [0, 0];
    globalScore = [0, 0];
    document.querySelector(`.player1 .current-score p`).textContent = roundScore[0];
    document.querySelector(`.player2 .current-score p`).textContent = roundScore[1];
    document.querySelector(`.player1 .global-score`).textContent = globalScore[0];
    document.querySelector(`.player2 .global-score`).textContent = globalScore[1];    
} 

function RollDice(){
  // dice animation: promise resolved when over and return the last result du lancé de dé
  return new Promise(resolve => {
    let counter = 0;
    let result;
    const interval = setInterval(() => {
      const random = Math.floor((Math.random() * 6) + 1);
      result = random
      const dice = createDice(random);
      document.body.appendChild(dice);
      counter++;
      if (counter > 10) { 
        clearInterval(interval);
        resolve(result);  
      }
    }, 30);
  });
}

btnNewGame.addEventListener("click", () =>{  
    clearGame()
    alert("score rénitialisé, nouvelle partie commencé 👹");
})

btnRollDice.addEventListener("click", async () => {
    
   let random = await RollDice()
  
    if (random === 1) {
      // remise a 0 si dé tombe aléatoirement sur le 1
        alert(`tombé sur 1, retour a 0 👽 au tour du joueur ${(currentPlayer % 2) + 1}`)
        roundScore[currentPlayer - 1] = 0;
        document.querySelector(`.player${currentPlayer} .current-score p`).textContent = 0;
        document.querySelector(`.player${currentPlayer}`).classList.remove("active");
    document.querySelector(`.player${(currentPlayer % 2) + 1}`).classList.add("active");


    // switch player division
    currentPlayer = (currentPlayer % 2) + 1;
   
    } else {
      // sinon rajoute le score au joueur courant et display it
        roundScore[currentPlayer - 1] += random; 
        document.querySelector(`.player${currentPlayer} .current-score p`).textContent = roundScore[currentPlayer - 1];
    }


	
});

btnHold.addEventListener("click", () => {

// add curent player's temporary score to the global score and display it 
  globalScore[currentPlayer - 1] += roundScore[currentPlayer - 1]; 
  document.querySelector(`.player${currentPlayer} .global-score`).textContent =  globalScore[currentPlayer - 1];
    // victory condition
  if ( globalScore[currentPlayer - 1] >=  100){
    alert(`victoire du joueur ${currentPlayer}`)
    clearGame()
  }
   
  // after player 2 has played the round is over
    if (currentPlayer === 2) {
        roundScore = [0, 0];
        document.querySelector(`.player1 .current-score p`).textContent = roundScore[0];
        document.querySelector(`.player2 .current-score p`).textContent = roundScore[1];
      }

  // player switch after submitting the round score
  currentPlayer = (currentPlayer % 2) + 1;
  document.querySelector(`.player${currentPlayer}`).classList.remove("active");
  document.querySelector(`.player${(currentPlayer % 2) + 1}`).classList.add("active");


  });