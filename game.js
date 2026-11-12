// game.js — owner: RULES
// You decide how the game works. You never touch the screen (no document.*).

function newGame(pairs) {
  const faces = getFaces(pairs);
  state.cards = [];
  for (const face of faces) {
    state.cards.push({ face: face, flipped: false, matched: false });
    state.cards.push({ face: face, flipped: false, matched: false });
  }

  // TODO R1: Shuffle state.cards so the pairs aren't next to each other.

  state.firstPick = null;
  state.secondPick = null;
  state.moves = 0;
  state.matches = 0;
  state.locked = false;
}

function pickCard(index) {
  const card = state.cards[index];

  if (!card || state.locked || card.flipped || card.matched) {
    return "ignored";
  }

  card.flipped = true;

  if (state.firstPick === null) {
    state.firstPick = index;
    return "first";
  }

  state.secondPick = index;
  const firstCard = state.cards[state.firstPick];

  if (firstCard.face === card.face) {
    firstCard.matched = true;
    card.matched = true;
    state.matches = state.matches + 1;
    state.firstPick = null;
    state.secondPick = null;
    return "match";
  }

  state.locked = true;
  // TODO R3: Add 1 to state.moves on every second pick.

  return "miss";
}

function hideMiss() {
  if (state.firstPick !== null) {
    state.cards[state.firstPick].flipped = false;
  }
  if (state.secondPick !== null) {
    state.cards[state.secondPick].flipped = false;
  }

  state.firstPick = null;
  state.secondPick = null;
  state.locked = false;
}

function isWon() {
  // TODO R3: Return true when every card on the table is matched.
  return false;
}
