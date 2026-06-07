# Economy Master Overview v2.3 — GitHub-ready Prototype

Date: 2026-06-07

This build is focused on the durable interface framework, not on pretending the whole economy library is finished.

## Main corrections in v2.3

- Home opens with a smaller, fully visible clickable five-sector wheel.
- Wheel regions drill into the matching sector.
- Activity Tool selection persists until manually changed.
- Sector changes do not reset the selected Activity Tool.
- TreeView is always populated and has at least three meaningful levels under each sector.
- Datagrid has been changed back to a dense legacy Comparator-style grid.
- Datagrid uses visible row and column lines, 8 pt font, tight cell padding, many rows and columns.
- Datagrid columns can be resized by dragging header boundaries.
- Row height dragging is not implemented.
- Inspector context hierarchy remains: center selection -> TreeView node -> sector/scope/overlay -> startup.
- Object creation/editing now exists through the inspector actions and center toolbar.
- Custom objects can be saved to browser storage, exported as JSON, and imported again.
- VRQ/message streams remain one-line compact text rows.

## Core interface doctrine

```text
Sector / Viewpoint × Activity Tool × Scope × Classification Tree × Selected Object
```

The interface is the workshop. The large object/model library can be built later inside this framework.

## Uploading to GitHub

Upload these files/folders to the repository root and allow `index.html` and `README.md` to replace the existing versions.

```text
index.html
README.md
data/
docs/
```

GitHub Pages URL after upload:

```text
https://chrisg288.github.io/Economy-Master-Overview/
```
