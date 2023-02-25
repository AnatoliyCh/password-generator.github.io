const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const numeral = [...Array(10).keys()];
const specialSymbols = ["%", "*", "(", ")", "?", "@", "#", "$", "~", "-"];
const defaultAmount = 16;

let isLowerCase = true;
let isUpperCase = false;
let isNumbers = false;
let isSpecialSymbols = false;
let lastPassword = null;

/**
 * Changing the state of components
 * @param {string} name
 * @param {Event} event
 */
function change(name, event) {
  switch (name) {
    case "lowerCase":
      isLowerCase = !isLowerCase;
      break;
    case "upperCase":
      isUpperCase = !isUpperCase;
      break;
    case "numbers":
      isNumbers = !isNumbers;
      break;
    case "specialSymbols":
      isSpecialSymbols = !isSpecialSymbols;
      break;
    case "amount":
      changeAmount(event?.target ?? null);
      break;
  }

  if (!(isLowerCase || isUpperCase || isNumbers || isSpecialSymbols)) {
    const checkbox = document.getElementById("lowerCase");
    checkbox && (checkbox.checked = true);
    isLowerCase = true;
  }
}

/**
 * Changing the state of an input component
 * @param {HTMLInputElement} input
 */
function changeAmount(input) {
  const regex = new RegExp(/^\d+$/);
  if (input.value !== undefined && !regex.test(input.value)) input.value = defaultAmount;
}

function generatePassword() {
  const input = document.getElementById("amount");
  const textarea = document.getElementById("result");
  if (!input) return;

  const amount = input.value ?? defaultAmount;
  const password = [];
  for (let i = 0; i < amount; i++) {
    const row = getArray();
    const element = row[getRandom(row.length)];
    const newCaseElement = getCase(element);
    password.push(newCaseElement !== null ? newCaseElement : element);
  }

  const result = password.join("");
  textarea && (textarea.value = result);
  lastPassword = result;

  /**
   * Returns one random array from: alphabet, numbers, specialSymbols
   * @returns array
   */
  function getArray() {
    const arr = [
      isLowerCase || isUpperCase ? alphabet : null,
      isNumbers ? numeral : null,
      isSpecialSymbols ? specialSymbols : null,
    ].filter((row) => row !== null);
    const position = getRandom(arr.length); // 0, 1, 2

    return arr[position];
  }

  /**
   * Returns an element in a new case
   * @param {string | number} element
   * @returns element (random case)
   */
  function getCase(element) {
    if (!alphabet.includes(element)) return element;

    const arr = [
      isLowerCase ? element.toLowerCase() : null,
      isUpperCase ? element.toUpperCase() : null,
    ].filter((el) => el !== null);

    return arr[getRandom(arr.length)] ?? null;
  }
}

/**
 * Returns a random number up to the maximum value
 * @param {number} max maximum value
 * @returns random number
 */
function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function copyToClipboard() {
  if (lastPassword === null) return;

  navigator.clipboard.writeText(lastPassword);
}
