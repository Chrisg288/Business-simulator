# Economy Master Interface v2.3 Concept Notes

## Goal

This version is a correction build. The project should not overbuild fake content. The first requirement is a stable hierarchical workspace controlled by context buttons and capable of creating/editing objects.

## Priority architecture

1. Sector buttons choose the economic viewpoint.
2. Activity Tool buttons choose the center presentation.
3. The Activity Tool persists until the user manually changes it.
4. The TreeView remains meaningful and populated.
5. The center panel changes from the selected TreeView node plus selected Activity Tool.
6. The inspector follows the most specific available context.
7. Objects can be created, edited, saved locally, exported, and imported.

## TreeView depth

Every sector tree now has at least three meaningful levels:

```text
Sector
  Domain
    Category
      Class
        Object Set
```

The Home tree remains an orientation tree:

```text
Economy Home
  Human / Consumer
  Market / Exchange
  Business / Commercial
  Finance / Capital
  Public / Government
```

## Datagrid rule

The datagrid is a stable interface element and should not be changed casually.

Approved direction:

```text
Dense legacy Comparator-style grid
Visible row and column lines
Maximum 8 pt font
Tight margins/padding
Many rows and columns visible
Resizable column widths by dragging header boundary
No row-height dragging
```

## Object workshop

The prototype uses browser localStorage for custom objects. This is not the final database; it is a local prototype mechanism so the object-building workflow can be tested.

Long-term, these custom objects should become JSON files or server-side database records.
