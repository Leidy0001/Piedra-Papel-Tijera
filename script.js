"use strict";

const choices = ["piedra", "papel", "tijera"];
const choiceEmojis = {
  piedra: "✊",
  papel: "✋",
  tijera: "✌️",
};
const winsAgainst = {
  piedra: "tijera",
  tijera: "papel",
  papel: "piedra",
};

const choiceButtons = document.querySelectorAll("[data-choice]");
const playerChoiceDisplay = document.querySelector("#player-choice");
const computerChoiceDisplay = document.querySelector("#computer-choice");
const resultDisplay = document.querySelector("#result");
const playerScoreDisplay = document.querySelector("#player-score");
const computerScoreDisplay = document.querySelector("#computer-score");
const matchStatusDisplay = document.querySelector("#match-status");
const resetButton = document.querySelector("#reset");

const scores = { player: 0, computer: 0 };
const winningScore = 3;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerChoice) {
  if (isMatchOver()) {
    return;
  }

  const computerChoice = getComputerChoice();

  playerChoiceDisplay.textContent = `${choiceEmojis[playerChoice]} ${capitalize(playerChoice)}`;
  computerChoiceDisplay.textContent = `${choiceEmojis[computerChoice]} ${capitalize(computerChoice)}`;

  const result = getRoundResult(playerChoice, computerChoice);
  if (result.outcome === "win") {
    scores.player += 1;
    playerScoreDisplay.textContent = scores.player;
  } else if (result.outcome === "loss") {
    scores.computer += 1;
    computerScoreDisplay.textContent = scores.computer;
  }

  resultDisplay.textContent = result.message;
  resultDisplay.className = `result result--${result.outcome}`;

  if (isMatchOver()) {
    const playerWon = scores.player === winningScore;
    const winner = playerWon ? "¡Ganaste la partida!" : "La computadora ganó la partida";
    resultDisplay.textContent = winner;
    matchStatusDisplay.textContent = "Partida terminada";
    choiceButtons.forEach((button) => {
      button.disabled = true;
    });
  }
}

function getRoundResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return { outcome: "draw", message: "¡Empate!" };
  }

  if (winsAgainst[playerChoice] === computerChoice) {
    return { outcome: "win", message: "¡Ganaste la ronda!" };
  }

  return { outcome: "loss", message: "Perdiste esta ronda" };
}

function isMatchOver() {
  return scores.player === winningScore || scores.computer === winningScore;
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.dataset.choice);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) {
    return;
  }

  const choiceIndex = Number(event.key) - 1;
  if (choiceIndex >= 0 && choiceIndex < choices.length) {
    playRound(choices[choiceIndex]);
  }
});

resetButton.addEventListener("click", () => {
  scores.player = 0;
  scores.computer = 0;
  playerScoreDisplay.textContent = "0";
  computerScoreDisplay.textContent = "0";
  playerChoiceDisplay.textContent = "—";
  computerChoiceDisplay.textContent = "—";
  resultDisplay.textContent = "¡Haz tu primera jugada!";
  resultDisplay.className = "result";
  matchStatusDisplay.textContent = "Primero en llegar a 3 gana";
  choiceButtons.forEach((button) => {
    button.disabled = false;
  });
});
