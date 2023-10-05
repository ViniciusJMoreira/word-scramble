import { words } from "./words.js";
const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word")

let correctWord, timer;

const initTime = maxTime => {
  clearInterval(timer);
  timer = setInterval(() => {
    if(maxTime > 0) {
      maxTime --;
      return timeText.innerText = maxTime;
    }
    clearInterval(timer);
    alert('Time off! ' +correctWord.toLocaleUpperCase()+ ' was the correct word.');
    initGame()
  }, 1000)
}

const initGame = () => {
  initTime(30)
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
  console.log(randomObj)
}

const checkWord = () => {
  let userWord = inputField.value.toLocaleLowerCase();
  console.log(userWord)
  if(!userWord) return alert("Please enter a word check");

  if(userWord !== correctWord) return alert('Oops! '+userWord+ 'is not a correct word.');

  alert('Congrats! '+userWord.toLocaleUpperCase()+' is a correct word.');
  initGame();
}


window.addEventListener('DOMContentLoaded', initGame);
refreshBtn.addEventListener('click', initGame);
checkBtn.addEventListener('click', checkWord);