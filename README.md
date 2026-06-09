# Economy Master Overview v2.7.1 — Local Node Delete + No Auto Child Folders

Date: 2026-06-09

This version preserves the v2.7 Tree node builder and v2.6 external sector TreeViews, then makes a narrow correction to local node behavior.

## What changed from v2.7

- New locally-created TreeView nodes no longer auto-create visible child folders.
- Recommended object folders are kept in the generated datagrid proposal metadata only.
- Added a `Delete Local Node` button.
- Delete has confirmation.
- Delete is permission-limited to local browser-created nodes only.
- Permanent external sector JSON nodes are locked from deletion in the prototype.

## Preserved

- Five external sector tree JSON files in `/data/`.
- Home wheel.
- Dense datagrid style.
- Resizable columns.
- Three-state sorting.
- Activity Tool persistence.
- Template-aware datagrid rendering.
- Tree node builder.
- Grid proposal generator.
- Five dummy rows for generated node grids.

## Notes

Locally-created nodes are stored in browser localStorage and can be exported through the existing Export JSON button. They are not automatically written back into the permanent sector JSON files.
