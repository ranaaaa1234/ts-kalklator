var displayScreen = document.getElementById("result");
var numberButtons = document.querySelectorAll(".dark");
var addButton = document.getElementById("Add");
var subtractButton = document.getElementById("Subtract");
var multiplyButton = document.getElementById("Multiply");
var divideButton = document.getElementById("Divide");
var equalsButton = document.getElementById("Equals");
var resetButton = document.querySelector(".gray");
var currentInput = "";
var firstOperand = "";
var secondOperand = "";
var currentOperation = null;
function updateScreen(value) {
    displayScreen.textContent = value;
}
// Update display when number buttons are clicked
numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var value = button.textContent;
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
        updateScreen("".concat(firstOperand, " ").concat(operation));
    }
}
addButton.addEventListener("click", function () { return handleOperation("+"); });
subtractButton.addEventListener("click", function () { return handleOperation("-"); });
multiplyButton.addEventListener("click", function () { return handleOperation("×"); });
divideButton.addEventListener("click", function () { return handleOperation("÷"); });
equalsButton.addEventListener("click", function () {
    if (!firstOperand || !currentOperation || currentInput === "")
        return;
    secondOperand = currentInput;
    var num1 = parseFloat(firstOperand);
    var num2 = parseFloat(secondOperand);
    var result;
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
resetButton.addEventListener("click", function () {
    currentInput = "";
    firstOperand = "";
    secondOperand = "";
    currentOperation = "";
    updateScreen("0");
});
