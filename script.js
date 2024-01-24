const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    newDiv.setAttribute("data-revealed", "false");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}





let revealedCount = 0;
let frozenBoard = "false";
let activeCard = null;

// TODO: Implement this function!
function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  let card = e.target;
  cardColor = Array.from(card.classList)[0];
  const revealed = card.getAttribute("data-revealed");

  if (frozenBoard === "true"
    || card === activeCard
    || revealed === "true"
    ) {
    return;
  }

  card.style.backgroundColor = cardColor;

  if (!activeCard) {
    activeCard = card;
    return;
  }

  if (cardColor !== activeCard.style.backgroundColor) {
    frozenBoard = "true";

    setTimeout(function clearCards() {
      card.style.backgroundColor = null;
      activeCard.style.backgroundColor = null;
      frozenBoard = "false";
      activeCard = null;
    }, 1000)
    return;
  }

  if (cardColor === activeCard.style.backgroundColor) {
    card.setAttribute("data-revealed", "true");
    activeCard.setAttribute("data-revealed", "true");
    activeCard = null;
    revealedCount += 2;

    if (revealedCount === 10) {
      alert("You win!");
      location.reload();
    }

    return;
  }

}

// when the DOM loads
createDivsForColors(shuffledColors);