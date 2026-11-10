// deck.js — owner: DECK
// You decide what the cards look like. You do not decide the rules.

// TODO D2: Pick a card back that fits your theme (an emoji or a symbol).
const CARD_BACK = "?";

function getFaces(pairs) {
  // TODO D1: Choose a theme and replace these letters with at least
  // 10 faces (emoji or short words). Every face must be different.
  const faces = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return faces.slice(0, pairs);
}
