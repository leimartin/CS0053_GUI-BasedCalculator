// CS0053 - Technical 1 Source Code for 1T AY 2023-2024
/*
    Program:        GUI-Based Calculator
    Programmer(s): 
                    Vassili L. Inacay
                    Katryna Lei V. Martin (L)
    Section:        AN31
    Start Date:     September 14, 2023
    End Date:       September 16, 2023
*/

const display = document.getElementById("display");
let calculatorOn = false; // Calculator's power is off by default

function powerBtn() {
    calculatorOn = !calculatorOn;
    const powerButton = document.getElementById("power-btn");
 
    powerButton.textContent = calculatorOn ? "Off" : "On";
    powerButton.classList.toggle("on", !calculatorOn);
    powerButton.classList.toggle("off", calculatorOn);

    if(!calculatorOn) {
        clearDisplay();
    }
}

function appendInput(value) {
    if(calculatorOn) {
        if (value.startsWith("[") && value.endsWith("]")) {
            try {
                const numArray = JSON.parse(value);
                const enteredValue = '';

                if (enteredValue) {
                    arrays[enteredValue] = numArray;
                    display.value = `[${numArray.join(", ")}]`;
                } else {
                    display.value = "Cancelled array allocation";
                }
            } catch (error) {
                display.value = "Invalid array allocation";
            }
        } else {
            display.value += value;
        }
    }
}

function backspace() {
    var erase = display.value;
    display.value = erase.substring(0, erase.length -1);
}

function clearDisplay() {
    display.value = "";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function calculate() {
    const expression = document.getElementById("display").value;

    if (calculatorOn) {
        try {
            const changeDisplay = expression.replace(/([A-Za-z]+)/g, (match, element) => {
                if (arrays[element]) {
                    return JSON.stringify(arrays[element]);
                }
                return match; 
            });

            const result = eval(changeDisplay);
            display.value = result;
        } catch (error) {
            display.value = "Syntax Error!";
            sleep(1500).then(() => { clearDisplay(); });   
        }
    } else {
        display.value = "";
    }
}

document.addEventListener("keydown", function (event) {
    const eventKey = event.key;
    const validKeys = "0123456789+-.=";

    if (validKeys.includes(eventKey)) {
        if (eventKey === "=") {
            calculate();
        } else {
            appendInput(eventKey);
        }
    } else if (eventKey === "/") {
        event.preventDefault();
        document.getElementById("divide-btn").click();
    } else if (eventKey === "*") { 
        document.getElementById("multiply-btn").click();
    } else if (eventKey === "Enter") {
        event.preventDefault();
        document.getElementById("calculate-btn").click();
    } else if (eventKey === "Backspace") {
        backspace(); 
    } else if (eventKey === "Delete") {
        clearDisplay();
    } 
});