const upperDisplay = document.getElementById('upperDisplay');
const lowerDisplay = document.getElementById('lowerDisplay');
let displayval = document.getElementById('lowerDisplay').textContent;
let operatorIsPresent = false;
let operatorIsLast = false;
let result = 0;
let operand1 = '0';
let operand2 = '';
let num1 = 0;
let num2 = 0;
let num1DecPlace = -1;
let num2DecPlace = -1;
let operation = '';
let evaluated = false;

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', (e) => mouseInput(e)));

function mouseInput(e) {
    let input = e.target.textContent;
    if (input == '=') inputEqual();
    else if (input == 'Clear') inputClear();
    else if (input == 'Backspace') inputBackspace();
    else if (input == '+' || input == '-' || input == '×' || input == '÷') inputOperator(input);
    else if (input == '.') inputPoint();
    else inputNum(input);
}

document.addEventListener('keydown', (e) => keyInput(e));

function keyInput(e) {
    let key = e.key;
    if (key == '=' || key == 'Enter') inputEqual();
    else if (key == 'c') inputClear();
    else if (key == 'Escape') inputBackspace();
    else if (key == '+' || key == '-') inputOperator(key);
    else if (key == '*') inputOperator('×');
    else if (key == '/') inputOperator('÷');
    else if (key == '.') inputPoint();
    else if (key >= 0 && key <= 9) inputNum(key);
}

function inputEqual() {
    if (operatorIsPresent && !operatorIsLast) {
        evaluate();
        upperDisplay.textContent = num1 + operation + num2 + '=';
        lowerDisplay.textContent = result;
        operand1 = result;
    }
}

function inputClear() {
    operand1 = '0';
    operand2 = '';
    upperDisplay.textContent = '';
    lowerDisplay.textContent = '0';
    num1 = 0;
    num2 = 0;
    result = 0;
    num1DecPlace = -1;
    num2DecPlace = -1;
    operatorIsPresent = false;
    operatorIsLast = false;
    evaluated = false;
}

function inputBackspace() {
    if (evaluated) inputClear();
    else if (!operatorIsPresent) {
        operand1 = operand1.slice(0, operand1.length - 1);
        if (num1DecPlace >= 0) num1DecPlace--;
        lowerDisplay.textContent = operand1;
    }
    else if (operatorIsPresent && !operatorIsLast) {
        operand2 = operand2.slice(0, operand2.length - 1);
        if (operand2 == '') operatorIsLast = true;
        if (num2DecPlace >= 0) num2DecPlace--;
        lowerDisplay.textContent = operand2;
    }
}

function inputOperator(userInput) {
    if (evaluated) {
        upperDisplay.textContent = operand1 + userInput;
        operatorIsPresent = true;
        operatorIsLast = true;
        evaluated = false;
    }
    if (!operatorIsPresent) {
        operatorIsPresent = true;
        operatorIsLast = true;
        upperDisplay.textContent = operand1 + userInput;
        lowerDisplay.textContent = operand1;
    }
    else if (operatorIsPresent && !operatorIsLast) {
        evaluate();
        operand1 = result;
        upperDisplay.textContent = operand1 + userInput;
        lowerDisplay.textContent = operand1;
        operatorIsPresent = true;
        operatorIsLast = true;
        evaluated = false;
    }
    else if (operatorIsPresent) {
        upperDisplay.textContent = operand1 + userInput;
    }
    operation = userInput;
}

function inputPoint() {
    if (evaluated) {
        num1DecPlace++;
        operand1 = '0.';
        lowerDisplay.textContent = operand1;
        evaluated = false;
    }
    else if (!operatorIsPresent && num1DecPlace < 0) {
        num1DecPlace++;
        operand1 += '.';
        lowerDisplay.textContent = operand1;
    }
    else if (operatorIsPresent && num2DecPlace < 0) {
        num2DecPlace++;
        operand2 += '.';
        lowerDisplay.textContent = operand2;
    }
}

function inputNum(userInput) {
    if (evaluated) {
        operand1 = userInput;
        lowerDisplay.textContent = operand1;
        evaluated = false;
    }
    else if (operatorIsPresent) {
        operatorIsLast = false;
        if (operand2 == '0') operand2 = userInput;
        operand2 += userInput;
        lowerDisplay.textContent = operand2;
        if (num2DecPlace >= 0) num2DecPlace++;
    }
    else {
        if (operand1 == '0') operand1 = userInput;
        else operand1 += userInput;
        lowerDisplay.textContent = operand1;
        if (num1DecPlace >= 0) num1DecPlace++;
    }
}

function evaluate() {
    num1 = parseFloat(operand1);
    num2 = parseFloat(operand2);
    operand1 = '0';
    operand2 = '';
    num1DecPlace = -1;
    num2DecPlace = -1;
    operatorIsPresent = false;
    operatorIsLast = false;
    evaluated = true;
    switch (operation) {
        case '':
            break;
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '×':
            result = num1 * num2;
            break;
        case '÷':
            if (num2 != 0) result = num1 / num2;
            else alert('Division by zero will crash the whole internet!');
            break;
        default:
            console.log('evaluate() default case');
    }
    result = Math.round(result * 1000) / 1000;
}