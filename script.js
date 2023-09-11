let operation = {
    operator: "",
    num1: 0,
    num2: 0,
}
let displayValue = "";

window.onload = main;


function main() {
    const displayText = document.querySelector("#display-text");
    const digits = document.querySelectorAll(".digit");
    const operations = document.querySelectorAll(".operation");

    displayText.innerHTML = displayValue;
    digits.forEach(digit => {
        digit.addEventListener("click", digitClickListener);
    });
    operations.forEach(operation => {
        operation.addEventListener("click", operationClickListener);
    })
}


function operate(operator, num1, num2) {
    let result;

    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = sub(num1, num2);
            break;
        case "*":
            result = mul(num1, num2);
            break;
        case "/":
            result = div(num1, num2);
            break;
        default:
            break;
    }

    return result;
}


function add(num1, num2) {
    return num1 + num2;
}


function sub(num1, num2) {
    return num1 - num2;
}


function mul(num1, num2) {
    return num1 * num2;
}


function div(num1, num2) {
    return num1 / num2;
}


function updateDisplay() {
    const displayText = document.querySelector("#display-text");

    displayText.innerHTML = displayValue;
}


function operationClickListener(event) {
    const operator = event.target.innerHTML;

    if (operator === "=") {
        operation.num2 = parseInt(displayValue);
        displayValue = operate(operation.operator, operation.num1, operation.num2);
    }
    else {
        operation.num1 = parseInt(displayValue);
        operation.operator = operator;
        displayValue = "";
    }

    updateDisplay();
}


function digitClickListener(event) {
    const digit = event.target.innerHTML

    displayValue += digit;

    updateDisplay();
}