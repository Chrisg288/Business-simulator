# Economy Master Overview v2.8.2 Experimental

Reversible experimental build based on v2.8.1.

## Main change

Non-leaf TreeView nodes now show a branch overview in the center workspace in every activity mode. This prevents category/navigation nodes from generating fake record grids.

## Preserved

- v2.7.1 local node builder and delete rules
- v2.8.1 neutral UID and DATAGRID_UID sample
- external sector TreeView JSON behavior embedded in the prototype
- dense datagrid style, column resizing, and original-order ITEM concept

## Rule

- Node has children: show branch overview of what is below it.
- Leaf/comparable node: show contextual datagrid/template behavior.
- Object folder / leaf: show folder or class-specific records.
