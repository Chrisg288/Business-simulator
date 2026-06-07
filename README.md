# Economy Master Overview v2.1 — GitHub-ready Prototype

Date: 2026-06-07

This build advances the Economy / Comparator / Business Simulation master interface from v2.0 by focusing on the **context hierarchy** and **sector-level swimlanes**.

## Start URL after upload

https://chrisg288.github.io/Economy-Master-Overview/

## New in v2.1

- Added a leftmost **Home** button before the Sector buttons.
- Renamed **Government / Public** to **Public / Government**.
- Home center panel now shows the five-sector wheel image.
- Home TreeView corresponds to the five sector buttons:
  - Human / Consumer
  - Market / Exchange
  - Business / Commercial
  - Finance / Capital
  - Public / Government
- Added **Swimlane** as the first Activity Tool button.
- Each sector now has stable top-level swimlanes.
- Inspector panel now demonstrates the requested context hierarchy:
  1. Center-panel selected object
  2. TreeView selected node
  3. Sector + Scope + Cross-sector Overlay
  4. Startup / Sector button explanation
- Replaced most interrupt language with **VRQ = Value Reprioritization Request**.

## Upload instructions

Upload/replace these root files and folders in the GitHub repo root:

```text
index.html
README.md
assets/
data/
docs/
```

Keep existing folders such as `Business-Simulator/`, `Comparator-definitions/`, and `Prototypes/` unless intentionally pruning old history.
