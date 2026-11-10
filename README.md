# Memory Match — Team Starter

**Today's goal:** finish a working memory card game as a team, with every change going through a pull request.

Open `index.html` right now and you'll see cards that flip but never match. Your team's job is to finish it.

## Roles

| Role | You own | Your job |
|---|---|---|
| **Deck** | `deck.js` | The theme: card faces and card back |
| **Rules** | `game.js` | Shuffling, matching, counting moves, winning |
| **Table** | `ui.js`, `index.html`, `style.css` | What players see and click |

Two-person team: one person takes **Deck + Rules**.

**`state.js` belongs to everyone.** It's the contract that lets three people work at the same time without breaking each other's code. Change it only through a pull request that **every** teammate approves.

## Rules of the road

1. **Only edit the files you own.**
2. **Never commit to `main`.** Every change goes: branch → pull request → teammate review → merge.
3. **AI can write your code. You write the commit message and you click Commit.** Don't ask AI to commit for you. The commit history is your record of what you did.
4. **When you prompt AI, paste in `state.js` and your own file**, then add: *"Only change this file. Don't rename any function or variable from state.js."* If the AI hands you a whole new file, check that it didn't touch anything outside your TODO before you paste it in.
5. **One TODO = one branch = one pull request.** Small pull requests are easy to review and rarely conflict.

## Setup — repo owner (one person, about 5 minutes)

1. On the starter repo, click **Use this template → Create a new repository**. Name it `memory-match-yourteam`. Make it **Public**.
2. **Settings → Collaborators** → add your teammates and your teacher.
3. **Settings → Branches → Add branch protection rule** (or **Rules → Rulesets**) for `main`:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: **1**
4. **Issues tab** → create one issue for each TODO in the list below and assign it to its owner.

## Setup — everyone

In **GitHub Desktop**: **File → Clone repository** → pick your team's repo. Open the folder and double-click `index.html`.

## Warm-up: your first merge conflict (10 min)

Everyone does this at once, on purpose.

1. Make a branch called `add-yourname`.
2. In `TEAM.md`, put your name on the line right under `Members:`.
3. Commit, push, open a pull request, and have a teammate approve it.
4. The first pull request merges cleanly. **The next ones will conflict**, because you all edited the same line.
5. On GitHub, click **Resolve conflicts**. Keep everyone's name, delete the `<<<<<<<`, `=======`, `>>>>>>>` lines, then **Mark as resolved → Commit merge**.

Now you've seen a conflict, and it wasn't a big deal. The file split exists so you won't hit many more.

## The loop (repeat for every TODO)

1. **Start fresh:** switch to `main` → **Fetch origin** → **Pull**. *Skip this and you'll be building on old code, which causes conflicts.*
2. **Branch:** **Current branch → New branch**, named for the issue number plus a few words, like `4-shuffle`.
3. **Work:** do the TODO. Refresh `index.html` to test.
4. **Commit:** write a summary that says what changed ("Shuffle the deck in newGame"). In the description, write `Closes #4`. Click **Commit**.
5. **Push:** **Push origin → Create Pull Request**.
6. **Review:** a teammate switches to your branch in GitHub Desktop, opens `index.html`, and plays it. Then on GitHub they click **Approve** or **Request changes** and leave one comment either way.
7. **Merge:** click **Merge pull request** on GitHub. Tell your team so everyone pulls `main` again.

## The TODOs (each one is an issue)

**Deck** (`deck.js`)
- **D1** Choose a theme with at least 10 different faces.
- **D2** Choose a card back that fits the theme.

**Rules** (`game.js`)
- **R1** Shuffle the deck in `newGame`.
- **R2** Matching in `pickCard` and `hideMiss`: ignore bad clicks, keep matches face up, flip misses back.
- **R3** Count moves and finish `isWon`.

**Table** (`ui.js`, `index.html`, `style.css`)
- **T1** Grid layout and a card look that fits the theme.
- **T2** Status line showing moves and matches.
- **T3** Win message and a **New game** button.

**Team stretch** (needs a `state.js` change, so it needs everyone's approval)
- **S1** Save the best score with `localStorage` and show it.
- **S2** Easy / Hard buttons that deal a different number of pairs.

## Done means

- `main` has a game you can play all the way to a win.
- Every TODO issue is closed by a merged pull request.
- Every teammate has **at least two merged pull requests** and **at least one review** of someone else's.
