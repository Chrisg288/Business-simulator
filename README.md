# Economy Master Interface v2.6 — GitHub-ready Prototype

Date: 2026-06-08

This package integrates the five external sector TreeView JSON data sources into the existing Economy / Comparator / Business Simulation master interface.

## Start

Open `index.html`, or upload the full folder contents to the root of the GitHub Pages repository.

GitHub Pages URL after upload:

`https://chrisg288.github.io/Economy-Master-Overview/`

## Main change

Sector buttons now use external data files under `/data/`:

- `comparator_tree_human_consumer_v0_2.json`
- `tree_market_exchange_v0_1.json`
- `tree_business_commercial_v0_1.json`
- `tree_finance_capital_v0_1.json`
- `tree_public_government_v0_1.json`

A companion local startup file, `data/sector_trees_embedded.js`, contains the same data so the prototype can open locally without browser fetch restrictions.

## Preserved behavior

- Existing modern/fresh layout
- Home wheel orientation
- Dense legacy-style datagrid
- Resizable datagrid columns
- Three-state header sorting: ascending, descending, original/order-added
- Activity Tool persistence
- Inspector context hierarchy
- One-line VRQ/event streams
- Object editor / custom object workflow


## v2.6 change

The dense datagrid renderer is now template-aware. The TreeViews are unchanged, but the grid now considers:

- Sector / viewpoint
- Selected comparable class
- Selected virtual object folder
- `datagrid_template_id`
- `object_folder_template_id`

This prevents Public / Government registry records such as Land Title Record from using marketplace-style bid/sold fields. Public registry/case/permit/procurement grids now use the public-sector template columns plus limited class-specific extensions. Consumer and Market contexts still support offer/bid/transaction relationship fields where they make sense.
