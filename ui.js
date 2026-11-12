// ui.js — owner: TABLE
// You decide what players see and click. You never change the rules.

const tableEl = document.getElementById("table");
const statusEl = document.getElementById("status");

function render() {
  state.cards.forEach(function (card, index) {
    let button = tableEl.children[index];

    if (!button) {
      button = document.createElement("button");
      button.className = "card";
      button.type = "button";

      const inner = document.createElement("span");
      inner.className = "card-inner";

      const back = document.createElement("span");
      back.className = "card-face card-back";

      const front = document.createElement("span");
      front.className = "card-face card-front";

      inner.appendChild(back);
      inner.appendChild(front);
      button.appendChild(inner);
      button.addEventListener("click", function () {
        handleClick(Number(button.dataset.index));
      });
      button.addEventListener("pointerenter", function () {
        button.classList.remove("is-shining", "is-shine-fading");
        void button.offsetWidth;
        button.classList.add("is-shining");
      });
      button.addEventListener("pointerleave", function () {
        if (button.classList.contains("is-shining")) {
          button.classList.add("is-shine-fading");
        }
      });
      button.addEventListener("animationend", function (event) {
        if (event.animationName === "card-shine") {
          button.classList.remove("is-shining", "is-shine-fading");
        }
      });
      tableEl.appendChild(button);
    }

    const isFaceUp = card.flipped || card.matched;
    const back = button.querySelector(".card-back");
    const front = button.querySelector(".card-front");

    button.dataset.index = index;
    button.classList.toggle("is-flipped", isFaceUp);
    button.classList.toggle("is-matched", card.matched);
    button.setAttribute("aria-pressed", String(isFaceUp));
    button.setAttribute(
      "aria-label",
      isFaceUp ? `Card ${index + 1}: ${card.face}` : `Card ${index + 1}: face down`
    );
    back.textContent = CARD_BACK;
    front.textContent = card.face;
  });

  while (tableEl.children.length > state.cards.length) {
    tableEl.lastElementChild.remove();
  }

  statusEl.textContent = `Moves: ${state.moves} • Matches: ${state.matches} / ${PAIRS}`;

  // TODO T3: When isWon() is true, show a win message with the move count.
}

function handleClick(index) {
  const result = pickCard(index);
  render();
  if (result === "miss") {
    setTimeout(function () {
      hideMiss();
      render();
    }, 800);
  }
}

// TODO T3: Add a "New game" button to index.html. When it's clicked,
// call newGame(PAIRS) and then render().

newGame(PAIRS);
render();
