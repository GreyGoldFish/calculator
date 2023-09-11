let operator, num1, num2;
let displayValue = 0;

window.onload = main;


function main() {
    const displayText = document.querySelector("#display-text");
    const digits = document.querySelectorAll(".digit");

    displayText.innerHTML = "";
    digits.forEach(digit => {
        digit.addEventListener("click", digitClickListener);
    });
}


function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            add(num1, num2);
            break;
        case "-":
            sub(num1, num2);
            break;
        case "×":
            mul(num1, num2);
            break;
        case "÷":
            div(num1, num2);
            break;
        default:
            break;
    }
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


function digitClickListener(event) {
    const displayText = document.querySelector("#display-text");

    displayValue = parseInt(event.target.innerHTML);
    displayText.innerHTML = displayValue;
}