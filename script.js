let operation = []
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


function operate(num1, operator, num2) {
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

    operation.push(parseInt(displayValue));

    displayValue = "";
    
    // Checks for both cases of end of operation, i.e. 'num1 + num2' OR 'num1 ='.
    if (operation.length === 3 || operator === "=") {
        // Collapses the array with the result of the operation.
        operation.splice(0, 3, operate(operation[0], operation[1], operation[2]));
        displayValue = operation[0];
    }
    
    operation.push(operator);

    updateDisplay();
}


function digitClickListener(event) {
    const digit = event.target.innerHTML

    // Checks if operation is waiting for second number and resets the display.
    if (operation.length === 2) {
        displayValue = "";
    }

    displayValue += digit;

    updateDisplay();
}