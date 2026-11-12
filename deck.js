// deck.js — owner: DECK
// You decide what the cards look like. You do not decide the rules.

// TODO D2: Pick a card back that fits your theme (an emoji or a symbol).
const CARD_BACK = "?";

function getFaces(pairs) {
  // D1: Space-themed faces, with extras for games larger than eight pairs.
  const faces = ["☀️", "🌙", "⭐", "🪐", "🚀", "🛸", "👽", "☄️", "🌍", "🌕", "🛰️", "🌌"];

  return faces.slice(0, pairs);
}
