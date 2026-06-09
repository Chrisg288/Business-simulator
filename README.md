# Economy Master Overview v2.8.1 Experimental

This is a reversible experiment built on top of v2.7.1. It fixes the visible title/version and makes neutral UID behavior visible in normal datagrid rows, not only in the shared-data sample.

## Purpose

Adds a **Shared Data Sample** button that demonstrates the idealized high-efficiency method discussed in chat:

- TreeViews are viewpoints, not duplicated databases.
- Shared objects have neutral `UID` values.
- Datagrid views have their own `DATAGRID_UID` values.
- `ITEM` preserves original row/order-added order inside a specific datagrid.
- `DISPLAY_CODE` is optional and human-friendly, not the primary identity.
- The same UID can appear in Consumer, Business, Market, Finance, Public, Assessment, and Simulation contexts.

## Revert note

No external TreeView JSON files were rewritten in this experiment. To revert, use v2.7.1.

## Quick start

Open `index.html` locally or upload the whole folder to GitHub Pages.


## v2.8.1 fix

- Header now displays v2.8.1 Experimental.
- Normal generated datagrids use neutral numeric `UID` values instead of semantic codes like `PASS-0001`.
- Relationship references use `*_UID` names where practical in the prototype.
- The normal datagrid header now shows a generated `DATAGRID_UID`.
- `ITEM` remains the original/order-added row sequence for the current datagrid view.
