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

function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();

  playerChoiceDisplay.textContent = `${choiceEmojis[playerChoice]} ${capitalize(playerChoice)}`;
  computerChoiceDisplay.textContent = `${choiceEmojis[computerChoice]} ${capitalize(computerChoice)}`;

  const result = getRoundResult(playerChoice, computerChoice);
  resultDisplay.textContent = result.message;
  resultDisplay.className = `result result--${result.outcome}`;
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

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.dataset.choice);
  });
});
