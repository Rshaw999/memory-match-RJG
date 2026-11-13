const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

class FakeClassList {
  constructor(element) {
    this.element = element;
  }

  add(...names) {
    names.forEach((name) => this.element.classNames.add(name));
  }

  remove(...names) {
    names.forEach((name) => this.element.classNames.delete(name));
  }

  contains(name) {
    return this.element.classNames.has(name);
  }

  toggle(name, force) {
    const shouldAdd = force === undefined ? !this.contains(name) : force;
    if (shouldAdd) this.add(name);
    else this.remove(name);
    return shouldAdd;
  }
}

class FakeElement {
  constructor(id = "") {
    this.id = id;
    this.children = [];
    this.classNames = new Set();
    this.classList = new FakeClassList(this);
    this.dataset = {};
    this.listeners = {};
    this.attributes = {};
    this.style = { setProperty() {} };
    this.textContent = "";
  }

  set className(value) {
    this.classNames = new Set(value.split(/\s+/).filter(Boolean));
  }

  get className() {
    return [...this.classNames].join(" ");
  }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
  }

  addEventListener(type, listener) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(listener);
  }

  click() {
    (this.listeners.click || []).forEach((listener) => listener({ target: this }));
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  querySelector(selector) {
    const className = selector.slice(1);
    for (const child of this.children) {
      if (child.classList.contains(className)) return child;
      const nested = child.querySelector(selector);
      if (nested) return nested;
    }
    return null;
  }

  get lastElementChild() {
    return this.children.at(-1) || null;
  }

  remove() {
    if (!this.parentElement) return;
    const index = this.parentElement.children.indexOf(this);
    if (index !== -1) this.parentElement.children.splice(index, 1);
  }
}

function loadGame() {
  const elements = {
    table: new FakeElement("table"),
    status: new FakeElement("status"),
    "win-message": new FakeElement("win-message"),
    "win-move-count": new FakeElement("win-move-count"),
    "new-game": new FakeElement("new-game"),
    "easy-game": new FakeElement("easy-game"),
    "hard-game": new FakeElement("hard-game"),
  };
  elements["easy-game"].className = "difficulty-button";
  elements["easy-game"].dataset.pairs = "6";
  elements["hard-game"].className = "difficulty-button";
  elements["hard-game"].dataset.pairs = "12";

  const storage = new Map();
  const context = vm.createContext({
    console,
    clearTimeout,
    setTimeout,
    window: {
      localStorage: {
        getItem(key) {
          return storage.has(key) ? storage.get(key) : null;
        },
        setItem(key, value) {
          storage.set(key, value);
        },
      },
    },
    document: {
      createElement() {
        return new FakeElement();
      },
      getElementById(id) {
        return elements[id];
      },
      querySelectorAll(selector) {
        if (selector === ".difficulty-button") {
          return [elements["easy-game"], elements["hard-game"]];
        }
        return [];
      },
    },
  });

  for (const file of ["state.js", "deck.js", "game.js", "ui.js"]) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  }

  return {
    click(id) {
      elements[id].click();
    },
    snapshot() {
      return vm.runInContext("[PAIRS, state.cards.length]", context);
    },
  };
}

test("Easy deals six pairs", () => {
  const game = loadGame();
  game.click("easy-game");
  assert.deepEqual([...game.snapshot()], [6, 12]);
});

test("Hard deals twelve pairs", () => {
  const game = loadGame();
  game.click("hard-game");
  assert.deepEqual([...game.snapshot()], [12, 24]);
});

test("New game preserves the selected hard difficulty", () => {
  const game = loadGame();
  game.click("hard-game");
  game.click("new-game");
  assert.deepEqual([...game.snapshot()], [12, 24]);
});
