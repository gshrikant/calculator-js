// Clippy Calculator
const allowedKeys = "0123456789/*+-c=";

var textField = document.getElementById("display");
var buttonList = document.getElementsByClassName("button");
var enteredValues = "";

window.onLoad = function() {
    // Clear text input field on window load.
    textField = "";
}

// Setup event callbacks for all input elements.
for (let b = 0; b < buttonList.length; ++b) {
    var oldColor = buttonList[b].style.backgroundColor;

    // Highlight on mouse hover.
    buttonList[b].addEventListener("mouseenter", function(event) {
        event.target.style.backgroundColor = "rgba(100, 100, 100, 0.25)";
    }, false);

    buttonList[b].addEventListener("mouseleave", function(event) {
        event.target.style.backgroundColor = oldColor;
    }, false);

    // Deepen color on click for user feedback.
    buttonList[b].addEventListener("click", function(event) {
        event.target.style.backgroundColor = "gray";
        let buttonText = buttonList[b].innerHTML;
        let buttonId = buttonList[b].id;

        if (buttonId == "clear") {
            enteredValues = "";
            textField.value = "";
            return;
        } else if (buttonId == "eval") {
            return;
        }

        enteredValues += buttonText;
        textField.value = enteredValues;
    }, false);

}

// Allow keyboard input for selected keys.
document.addEventListener("keydown", function(event) {
    if (allowedKeys.includes(event.key)) {
        console.log("Pressed: " + event.key);
        if (event.key != "c" && event.key != "=") {
            textField.focus();
        } else {
            textField.blur();
        }
    }
}, false);
