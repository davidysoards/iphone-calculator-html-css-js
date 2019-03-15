const
select = (element) => { return document.querySelector(element); },
selectAll = (element) => { return [...document.querySelectorAll(element)]; },

buttons = selectAll('.calculator button'),
numbers = selectAll('.number'),
operators = selectAll('.operator'),
equals = select('#equals'),
screen = select('#screen')
;

let
currentNumber = '0',
previousNumber = '',
resultNumber,
operator
;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = event.target.innerText;
    if (button.classList.contains('number')) {
      Numbers(value);
    }
    if (button.classList.contains('operator')) {
      Operators(value);
    }
    if (button.id === ('clear')) {
      Clear(value);
    }
    if (button.id === ('equals')) {
      Equals();
    }
    if (button.id === ('backspace')) {
      Backspace(value);
    }
  });
});

Numbers = (value) => {
  (currentNumber === '0' || currentNumber === resultNumber) ?
  currentNumber = value : 
  currentNumber = currentNumber + value;
  toDisplay(currentNumber);
}

Backspace = (value) => {
  currentNumber = currentNumber.toString();
  (currentNumber.length === 1) ?
    currentNumber = '0' :
  (currentNumber.charAt(currentNumber.length-2) === '.') ?
    currentNumber = currentNumber.substr(0, currentNumber.length-2) :
  currentNumber = currentNumber.substr(0, currentNumber.length -1);
  toDisplay(currentNumber);
}

Clear = (value) => {
  currentNumber = '0';
  previousNumber = '';
  resultNumber = '';
  toDisplay(currentNumber);
}

Operators = (value) => {
  if (currentNumber !== '') {
  previousNumber = currentNumber;
  currentNumber = '';
  }
  operator = value;
}

toDisplay = (el) => {
  screen.innerText = el; 
}

Equals = () => {
  previousNumber = parseFloat(previousNumber);
  currentNumber = parseFloat(currentNumber);
  switch(operator) {
    case '+' :
      resultNumber = previousNumber + currentNumber;
      break;
    case '-' :
      resultNumber = previousNumber - currentNumber;
      break;
    case '×' :
      resultNumber = previousNumber * currentNumber;
      break;
    case '÷' :
      resultNumber = previousNumber / currentNumber;
      break;
    default:
      resultNumber = currentNumber;
    }
  toDisplay(resultNumber);
  currentNumber = resultNumber;
  previousNumber = '';
  operator = '';
}