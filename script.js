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
    const operationText = document.querySelector("#operation-text");
    const digits = document.querySelectorAll(".digit");
    const operatorButtons = document.querySelectorAll(".operator");

    operationText.setHTML("");
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
    const operationText = document.querySelector("#operation-text");
    const operator = event.target.innerHTML;

    if (operator === "AC") {
        operationText.setHTML("");
        operation = [];
        return;
    }
    else if (operator === "DEL") {
        if (operation.length === 0) {
            operationText.setHTML(operationText.innerHTML.slice(0, -1));
        }
        return;
    }

    const num = parseFloat(operationText.innerHTML);

    if (isNaN(num)) {
        return;
    }

    operation.push(num);
    
    // If operation is complete, evaluate it
    if (operation.length === 3) {
        operationText.setHTML(evaluateOperation());
    }
    // Otherwise, clear the operation for the next number
    else if (operator !== "=") {
        operationText.setHTML("");
    }
    
    operation.push(operator);
}


function digitClickListener(event) {
    const operationText = document.querySelector("#operation-text");
    const digit = event.target.innerHTML;

    // Prevent multiple decimal points in the same number
    if (digit === "." && operationText.innerHTML.includes(".")) {
        return;
    }

    // Ensures that numbers are valid.
    if (operationText.innerHTML === "0" && digit !== "."
    // If in the middle of an operation, clear the previous evaluation.
    || operation.length === 2 && operation[1] !== "=") {
        operationText.setHTML(digit);
    } else {
        operationText.setHTML(operationText.innerHTML + digit);
    }
}