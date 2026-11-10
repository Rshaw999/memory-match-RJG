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

  // TODO R2: Return "ignored" if the table is locked, or if this card is
  // already flipped or matched.

  card.flipped = true;

  // TODO R2: If this is the first pick of the turn, remember it and
  // return "first". If it's the second pick, compare the two cards:
  //   - same face: mark both matched, add 1 to state.matches, return "match"
  //   - different: lock the table and return "miss"
  // TODO R3: Add 1 to state.moves on every second pick.

  return "first";
}

function hideMiss() {
  // TODO R2: Turn the two picked cards face down, clear both picks,
  // and unlock the table.
  state.locked = false;
}

function isWon() {
  // TODO R3: Return true when every card on the table is matched.
  return false;
}
