// ----------------------- range time select -----------------------
// get the input element for gameTime
const gameTimeInput = document.querySelector('input[name="gameTime"]');

// get the display element for gameTime
const gameTimeDisplay = document.querySelector('#gameTimeDisplay');

// listen for input event on the gameTime input element
gameTimeInput.addEventListener('input', () => {
    // update the value of the display element with the value of the input element
    gameTimeDisplay.innerText = gameTimeInput.value;
});


// ----------------------- Selection of the key by the user to fire -----------------------

// get the input element for shootKey
const shootKeyInput = document.querySelector('input[name="shootKey"]');

let keyAlreadyPressed = false; // flag variable to keep track of whether key has already been pressed
let lastPressedKey = '';


// listen for focus event on the shootKey input element
shootKeyInput.addEventListener('focus', () => {
    // set the value of the input element to an empty string
    shootKeyInput.value = '';
    keyAlreadyPressed = false; // reset flag variable
  });


// listen for button press event on the document
document.addEventListener('keydown', (event) => {
  if (document.activeElement === shootKeyInput) {
    
    // update the value of shootKeyInput with the name of the pressed button
    if (event.code === "Space") {
      shootKeyInput.value = "space";
      keyAlreadyPressed = true; // set flag variable to true
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
        lastPressedKey = event.key;

        // shootKeyInput.value = event.key;
        keyAlreadyPressed = true; // set flag variable to true
    } else {
      alert('Invalid key! Please select a letter key or spacebar.');
      shootKeyInput.value = "";
    }
  }
});

// listen for button release event on the document
document.addEventListener('keyup', (event) => {
    // update the value of shootKeyInput only if the key was not a modifier key
    if(!event.ctrlKey && !event.altKey && !event.metaKey && event.key === lastPressedKey) {
      shootKeyInput.value = lastPressedKey;
      lastPressedKey = '';
    }
  });

  
  // ----------------------- Constraint on the PLAY button -----------------------
  // If the user presses PLAY when the shootkey input box it will pop up an alert and not let him start playing
  function playButtonClicked() {
    var shootKeyInput = document.getElementsByName('shootKey')[0];
    
    // if (shootKeyInput.value.trim() == '') {
    //   alert('Please enter a value for the shootKey input.');
    //   return false;
    // }
    
    // Otherwise, continue with the game.
    // ...
  }

  