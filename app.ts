
const displayScreen = document.getElementById("result")! as HTMLDivElement;

const numberButtons = document.querySelectorAll(".dark") as NodeListOf<HTMLButtonElement>;
const addButton = document.getElementById("Add")! as HTMLButtonElement;
const subtractButton = document.getElementById("Subtract")! as HTMLButtonElement;
const multiplyButton = document.getElementById("Multiply")! as HTMLButtonElement;
const divideButton = document.getElementById("Divide")! as HTMLButtonElement;
const equalsButton = document.getElementById("Equals")! as HTMLButtonElement;
const resetButton = document.querySelector(".gray")! as HTMLButtonElement;

let currentInput = "";
let firstOperand = "";
let secondOperand = "";
let currentOperation: string | null = null;

function updateScreen(value: string): void {
    displayScreen.textContent = value;
}

// Update display when number buttons are clicked
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent!;
        if (value === ".") {
            // Prevent multiple decimal points
            if (currentInput.includes(".")) return;
        }
        currentInput += value;
        updateScreen(currentInput);
    });
});

function handleOperation(operation: string): void {
    if (currentInput === "") return;
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
    if (!firstOperand || !currentOperation || currentInput === "") return;
    secondOperand = currentInput;

    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    let result: number;

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