const buttons = document.querySelectorAll('.button, .zero');
const display = document.querySelector('.show p');
const operators = document.querySelectorAll('.orange');
const clearButton = document.querySelector('.gray:first-child');


let currentOperand = '';
let previousOperand = '';
let operator = '';

function updateDisplay(value) {
    display.innerText = value;
}

function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentOperand = result.toString();
    operator = '';
    previousOperand = '';
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (['+', '-', '*', '/'].includes(value)) {
            operators.forEach(op => op.classList.remove('active-operator'));

            button.classList.add('active-operator');
        }

        if (!isNaN(value) || value === '.') {
            currentOperand += value;
            updateDisplay(currentOperand);
            clearButton.innerText = 'C';
        } else if (value === 'AC' || value === 'C') {

            if (clearButton.innerText === 'C') {
                currentOperand = '';
                updateDisplay('0');
                clearButton.innerText = 'AC';
            } else {
                currentOperand = '';
                previousOperand = '';
                operator = '';
                updateDisplay('0');
                operators.forEach(op => op.classList.remove('active-operator'));
            }
        } else if (value === '=') {

            calculate();
            updateDisplay(currentOperand);
            operators.forEach(op => op.classList.remove('active-operator'));
            clearButton.innerText = 'AC';
        } else if (value === '+/-') {

            currentOperand = (parseFloat(currentOperand) * -1).toString();
            updateDisplay(currentOperand);
        } else if (value === '%') {

            currentOperand = (parseFloat(currentOperand) / 100).toString();
            updateDisplay(currentOperand);
        } else {

            if (currentOperand === '') return;
            if (previousOperand !== '') {
                calculate();
                updateDisplay(currentOperand);
            }
            operator = value;
            previousOperand = currentOperand;
            currentOperand = '';
        }
    });
});
