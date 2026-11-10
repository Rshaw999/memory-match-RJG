// state.js — THE CONTRACT
// Every file reads this. Nobody edits it alone.
// To change it: open a pull request and get approval from EVERY teammate.

// How many pairs of cards are on the table.
const PAIRS = 8;

// One card looks like this: { face: "🍕", flipped: false, matched: false }

const state = {
  cards: [],        // every card on the table, in order
  firstPick: null,  // index of the first face-up card this turn, or null
  secondPick: null, // index of the second face-up card this turn, or null
  moves: 0,         // turns taken (one turn = two picks)
  matches: 0,       // pairs found so far
  locked: false,    // true while a missed pair is still showing
};

// FUNCTION CONTRACT
// Owners must keep these names, inputs, and outputs exactly as written.
//
// deck.js   CARD_BACK         -> string shown on a face-down card
// deck.js   getFaces(pairs)   -> array of `pairs` different faces (strings)
// game.js   newGame(pairs)    -> resets state and deals a fresh deck
// game.js   pickCard(index)   -> "ignored" | "first" | "match" | "miss"
// game.js   hideMiss()        -> turns the two missed cards face down again
// game.js   isWon()           -> true when every card is matched
// ui.js     render()          -> redraws the whole table from state
