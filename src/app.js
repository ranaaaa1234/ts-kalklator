"use strict";
const displayScreen = document.getElementById("result");
const numberButtons = document.querySelectorAll(".dark");
const addButton = document.getElementById("Add");
const subtractButton = document.getElementById("Subtract");
const multiplyButton = document.getElementById("Multiply");
const divideButton = document.getElementById("Divide");
const equalsButton = document.getElementById("Equals");
const resetButton = document.querySelector(".gray");
let currentInput = "";
let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
function updateScreen(value) {
    displayScreen.textContent = value;
}
// Update display when number buttons are clicked
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        if (value === ".") {
            // Prevent multiple decimal points
            if (currentInput.includes("."))
                return;
        }
        currentInput += value;
        updateScreen(currentInput);
    });
});
function handleOperation(operation) {
    if (currentInput === "")
        return;
    if (!firstOperand) {
        firstOperand = currentInput;
        currentOperation = operation;
        currentInput = "";
        updateScreen(`${firstOperand} ${operation}`);
    }
}
addButton.addEventListener("click", () => handleOperation("+"));
subtractButton.addEventListener("click", () => handleOperation("-"));
multiplyButton.addEventListener("click", () => handleOperation("×"));
divideButton.addEventListener("click", () => handleOperation("÷"));
equalsButton.addEventListener("click", () => {
    if (!firstOperand || !currentOperation || currentInput === "")
        return;
    secondOperand = currentInput;
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);
    let result;
    switch (currentOperation) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "×":
            result = num1 * num2;
            break;
        case "÷":
            if (num2 === 0) {
                updateScreen("Error: Division by zero");
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }
    updateScreen(result.toString());
    firstOperand = result.toString();
    secondOperand = "";
    currentInput = "";
    currentOperation = "";
});
resetButton.addEventListener("click", () => {
    currentInput = "";
    firstOperand = "";
    secondOperand = "";
    currentOperation = "";
    updateScreen("0");
});
