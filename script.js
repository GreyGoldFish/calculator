const MAX_DECIMALS = 2;

const operators = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '*': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num1 / num2,
    '=': (num1, _num2) => num1
};

let operation = [];

window.onload = main;


function main() {
    const operationText = document.querySelector("#operation-text");
    const digits = document.querySelectorAll(".digit");
    const operatorButtons = document.querySelectorAll(".operator");

    operationText.textContent = "";
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
    const operator = event.target.textContent;

    if (operator === "AC") {
        operationText.textContent = "";
        operation = [];
        return;
    }
    else if (operator === "DEL") {
        if (operation.length === 0) {
            operationText.textContent = operationText.textContent.slice(0, -1);
        }
        return;
    }

    const num = parseFloat(operationText.textContent);

    if (isNaN(num)) {
        return;
    }

    operation.push(num);
    
    // If operation is complete, evaluate it
    if (operation.length === 3 || operator === "=") {
        operationText.textContent = evaluateOperation();
        operationEvaluated = true;
    }
    // Otherwise, clear the operation for the next number
    else {
        operationText.textContent = "";
    }
    
    operation.push(operator);
}


function digitClickListener(event) {
    const operationText = document.querySelector("#operation-text");
    const digit = event.target.textContent;

    // Prevent multiple decimal points in the same number
    if (digit === "." && operationText.textContent.includes(".")) {
        return;
    }

    // Ensures that numbers are valid.
    if ((operationText.textContent === "0") && digit !== ".") {
        operationText.textContent = digit;
    }
    else {
        // Checks if in the middle of an operation and clears the operation text if true
        if (operationText.textContent == operation[0]) {
            operationText.textContent = "";
        }
        operationText.textContent += digit;
    }
}