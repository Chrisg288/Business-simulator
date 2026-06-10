# Economy Master Overview v2.9 Workspace

This build keeps the v2.7.1/v2.8 experimental method reversible, but adds a user-editable workspace layer.

## Main additions

- Workspace Editor button
- Workspace Export JSON
- Workspace Import JSON
- Datagrid Template / Field Editor
- Node Override Editor
- PDCA / Acceptance Checks panel
- Embedded sector TreeView data for one-file GitHub Pages operation
- `/data/` folder included for transparent editing/reference

## Identity rules

- `UID` = neutral object/record identity.
- `ITEM` = original row/order position inside the selected datagrid/view.
- `DATAGRID_UID` = identity of the visible table/view.
- Optional display codes belong in `DISPLAY_CODE`, not in the primary UID.

## Non-leaf node rule

If a selected TreeView node has children, the center panel should show a branch overview of what is below that node, regardless of Activity Tool. Leaf/comparable nodes and object folders continue to use contextual datagrids.

## Recommended workflow

1. Open the prototype.
2. Select a TreeView node.
3. Use Workspace Editor to edit node override notes or datagrid columns.
4. Use PDCA Checks to test known rules.
5. Use Export Workspace and upload the resulting JSON in the next ChatGPT handoff.

## GitHub Pages forced URL

`https://chrisg288.github.io/Economy-Master-Overview/?v=2_9_workspace`
