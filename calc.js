// Clippy Calculator
var textField = document.getElementById("display");
var buttonList = document.getElementsByClassName("button");
var enteredValues = "";

// Clear text input field on window load.
window.onLoad = function() {
    textField = "";
}

for (let b = 0; b < buttonList.length; ++b) {
    var oldColor = buttonList[b].style.backgroundColor;

    buttonList[b].addEventListener("mouseenter", function(event) {
        event.target.style.backgroundColor = "rgba(100, 100, 100, 0.25)";
    }, false);

    buttonList[b].addEventListener("mouseleave", function(event) {
        event.target.style.backgroundColor = oldColor;
    }, false);

    buttonList[b].addEventListener("click", function(event) {
        event.target.style.backgroundColor = "gray";
        let buttonText = buttonList[b].innerHTML;
        let buttonId = buttonList[b].id;

        if (buttonId == "clear") {
            enteredValues = "";
            textField.value = "";
            return;
        }

        enteredValues += buttonText;
        textField.value = enteredValues;
    }, false);
}
