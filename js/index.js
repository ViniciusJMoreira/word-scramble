import { words } from "./words.js";
const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
validInput = document.querySelector('.valid-input'),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word")


let correctWord, timer;

const initTime = maxTime => {
  clearInterval(timer);
  timer = setInterval(() => {
    while (maxTime > 11) {
      maxTime --;
      return timeText.innerText = maxTime;
    }
    timeText.classList.add('word-wrong')
    while(maxTime > 0) {
      maxTime --;
      return timeText.innerText = maxTime;
    }
    clearInterval(timer);
    alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
    initGame()
  }, 1000)
}

const initGame = () => {
  // initTime(30)
  let randomObj = words[Math.floor(Math.random() * words.length)]; //getting random object from words
  let wordArray = randomObj.word.split(""); // splitting wach letter of randon word
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.textContent = wordArray.join("");
  hintText.textContent = randomObj.hint;
  correctWord = randomObj.word.toLocaleLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
  validInput.textContent = '';
}

const checkWord = () => {
  let userWord = inputField.value.toLocaleLowerCase();
  if(!userWord) {
    inputField.classList.add('inputAnimation')
    validInput.classList.add('word-wrong');
    validInput.textContent = 'Please enter the word to check!';
    const animationTime = setInterval(() => {inputField.classList.remove('inputAnimation'); clearInterval(animationTime)}, 1000*1.5)
  } else if(userWord !== correctWord) {
    inputField.classList.add('inputAnimation')
    validInput.classList.add('word-wrong');
    validInput.textContent = `Oops! ${userWord} is not a correct word`;
    const animationTime = setInterval(() => {inputField.classList.remove('inputAnimation'); clearInterval(animationTime)}, 1000*1.5)
  } else {
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
  }
}

window.addEventListener('DOMContentLoaded', initGame);
refreshBtn.addEventListener('click', initGame);
checkBtn.addEventListener('click', checkWord);