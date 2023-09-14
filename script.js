const MAX_DECIMALS = 2;

const operators = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '*': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num1 / num2,
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
    // Ensures that return only has up to 'MAX_DECIMALS' decimals.
    return parseFloat(operation[0].toFixed(MAX_DECIMALS));
}


function operatorButtonClickListener(event) {
    const displayText = document.querySelector("#display-text");
    const operator = event.target.innerHTML;

    if (operator === "AC") {
        displayText.innerHTML = "";
        operation = [];
        return;
    }
    else if (operator === "DEL") {
        if (operation.length === 0) {
            displayText.innerHTML = displayText.innerHTML.slice(0, -1);
        }
        return;
    }

    const num = parseFloat(displayText.innerHTML);

    operation.push(num);
    
    if (operation.length === 3) {
        displayText.innerHTML = evaluateOperation();
    }
    else {
        displayText.innerHTML = "";
    }
    
    operation.push(operator);
}


function digitClickListener(event) {
    const displayText = document.querySelector("#display-text");
    const digit = event.target.innerHTML;

    if (operation.length === 2) {
        displayText.innerHTML = "";
    }

    displayText.innerHTML += digit;
}