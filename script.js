"use strict";

const choices = ["piedra", "papel", "tijera"];
const choiceEmojis = {
  piedra: "✊",
  papel: "✋",
  tijera: "✌️",
};

const choiceButtons = document.querySelectorAll("[data-choice]");
const playerChoiceDisplay = document.querySelector("#player-choice");
const computerChoiceDisplay = document.querySelector("#computer-choice");

function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();

  playerChoiceDisplay.textContent = `${choiceEmojis[playerChoice]} ${capitalize(playerChoice)}`;
  computerChoiceDisplay.textContent = `${choiceEmojis[computerChoice]} ${capitalize(computerChoice)}`;
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.dataset.choice);
  });
});
