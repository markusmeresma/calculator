// tutorial: https://freshman.tech/calculator/

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // overwrite displayvalue if the current value is 0, otherwise append to it
        // ? is called ternary operator: condition ? expression 1 : expression 2
        // if the condition is true, expression 1 is executed
        // if the condition is false, expression 2 is executed
        // === stands for strict equality (types are not converted, when using == types are converted)
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }
    
    // if the displayValue property doesn't include a decimal add it
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    // destructure the properties on the calculator object
    // object destructuring explained: https://www.javascripttutorial.net/es6/javascript-object-destructuring/
    const { firstOperand, displayValue, operator } = calculator;

    // parsefloat converts the string contents of displayvalue to
    // a floating point number
    const inputValue = parseFloat(displayValue);

    
    // handle the case where the user changes their mind about the operation
    // after already selecting the operation to be done
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    // verify that firstOperand is null and that the inputValue is
    // not a NaN value
    // NaN stands for 'Not a Number'
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    // check if the operator property has been assigned a value
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;

    console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '÷') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function updateDisplay() {
    // select the element with the class of 'output-screen'
    const display = document.querySelector('.output-screen');

    // update the value of the element with the contents of displayValue
    display.value = calculator.displayValue;
}

const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', (event) => {
    // access the clicked element
    const target = event.target;

    // check if the clicked element is a button
    // if not exit from the function
    if (!target.matches('button')) {
        return;
    }

    // check if the clicked element is an operator button
    // if yes then show it in the console
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('clear-all')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
    
});