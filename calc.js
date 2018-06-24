// Clippy Calculator
const BUTTON_CLASS = "button";
const EVAL_KEY = "=";
const CLEAR_KEY = "c";

var textField = document.getElementById("display");

// Reset the display.
function reset() {
    textField.value = "";
}

// Display an element on the calculator screen.
function show(id, text) {
    if (id != "clear" && id != "eval") {
        textField.value += text;
    } else if (id == "clear") {
        reset();
    } else if (id == "eval") {
        evaluate(textField.value);
    }
}

function evaluate(estr) {
    // This monstrosity matches a 0 before another non-zero
    // digit character when such a number occurs near the
    // start of a string or next to a non-digit character,
    // essentially filtering out octal representations.
    const octalFilter = /(^|\D)0([1-9]+)/g;

    estr = estr.replace(octalFilter, "$1$2");
    estr = estr.replace(/÷/g, "/");
    estr = estr.replace(/×/g, "*");

    try {
        reset();
        let result = eval(estr);
        if (result != "undefined" && result != "NaN" && result != "Infinity")
            textField.value = result;
    } catch (e) {
        console.log("Invalid expression");
    }
}

// Setup callbacks for mouse and keyboard effects and display.
function main() {
    const CLICK_COLOR = "gray";
    const HOVER_COLOR = "rgba(100, 100, 100, 0.25)";
    const ALLOWED_KEYS = "0123456789/*+-";

    let buttonList = document.getElementsByClassName(BUTTON_CLASS);

    for (let b = 0; b < buttonList.length; ++b) {
        let oldColor = buttonList[b].style.backgroundColor;

        // Mouse hover effect: highlight corresponding key.
        buttonList[b].addEventListener("mouseenter", function(event) {
            event.target.style.backgroundColor = HOVER_COLOR;
        }, false);

        buttonList[b].addEventListener("mouseleave", function(event) {
            event.target.style.backgroundColor = oldColor;
        }, false);

        // Mouse click effect:
        // 1. Change button color for user feedback.
        // 2. Translate key and display on screen.
        buttonList[b].addEventListener("click", function(event) {
            event.target.style.backgroundColor = CLICK_COLOR;
            let buttonText = buttonList[b].innerHTML;
            let buttonId = buttonList[b].id;
            show(buttonId, buttonText);
        }, false);
    }

    // Allow keyboard input for selected keys.
    // If the pressed key is one of the allowed ones and not a
    // special key focus the text field, allowing the user to
    // enter numeric input.
    document.addEventListener("keydown", function(event) {
        if (ALLOWED_KEYS.includes(event.key)) {
            textField.focus();
        } else if (event.key == EVAL_KEY || event.key == "Enter") {
            evaluate(textField.value);
        } else if (event.key.toLowerCase() == CLEAR_KEY) {
            reset();
        }
    }, false);

    // Disable keyboard input into text field.
    // Blur the text element once the keydown event completes.
    // This prevents users from being able to enter invalid text
    // into the evaluation field.
    document.addEventListener("keyup", function(event) {
        textField.blur();
    }, false);
}

window.onLoad = reset;
main();
