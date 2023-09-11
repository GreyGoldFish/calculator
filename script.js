let operator, num1, num2;

window.onload = main;


function main() {
    
}


function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            add(num1, num2);
            break;
        case "-":
            sub(num1, num2);
            break;
        case "*":
            mul(num1, num2);
            break;
        case "/":
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