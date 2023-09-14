const MAX_DECIMALS = 2;

const operators = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '*': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num1 / num2,
    '=': (num1, _num2) => num1
};

let operation = []

window.onload = main;


function main() {
    const displayText = document.querySelector("#display-text");
    const digits = document.querySelectorAll(".digit");
    const operatorButtons = document.querySelectorAll(".operator");

    displayText.innerHTML = "";
    digits.forEach(digit => {
        digit.addEventListener("click", digitClickListener);
    });
    operatorButtons.forEach(operatorButton => {
        operatorButton.addEventListener("click", operatorButtonClickListener);
    })
}


function operate (num1, operator, num2) {
    return operators[operator](num1, num2);
}


function evaluateOperation() {
    // Collapses the array with the result of the operation.
    operation.splice(0, 3, operate(operation[0], operation[1], operation[2]));
    const result = parseFloat(operation[0].toFixed(MAX_DECIMALS));
    return result;
}


function operatorButtonClickListener(event) {
    const displayText = document.querySelector("#display-text");
    const operator = event.target.innerHTML;

    if (operator === "AC") {
        displayText.setHTML("");
        operation = [];
        return;
    }
    else if (operator === "DEL") {
        if (operation.length === 0) {
            displayText.setHTML(displayText.innerHTML.slice(0, -1));
        }
        return;
    }

    const num = parseFloat(displayText.innerHTML);

    if (isNaN(num)) {
        return;
    }

    operation.push(num);
    
    // If operation is complete, evaluate it
    if (operation.length === 3) {
        displayText.setHTML(evaluateOperation());
    }
    // Otherwise, clear the display for the next number
    else if (operator !== "=") {
        displayText.setHTML("");
    }
    
    operation.push(operator);
}


function digitClickListener(event) {
    const displayText = document.querySelector("#display-text");
    const digit = event.target.innerHTML;

    // Prevent multiple decimal points in the same number
    if (digit === "." && displayText.innerHTML.includes(".")) {
        return;
    }

    // Ensures that numbers are valid.
    if (displayText.innerHTML === "0" && digit !== "."
    // If in the middle of an operation, clear the previous evaluation.
    || operation.length === 2 && operation[1] !== "=") {
        displayText.setHTML(digit);
    } else {
        displayText.setHTML(displayText.innerHTML + digit);
    }
}