# Economy Master Overview v2.4 — GitHub-ready Prototype

Date: 2026-06-07

This is a narrow update from v2.3.2 focused on the Comparator TreeView and class-specific dense datagrids.

## Preserved

- Overall UI layout and modern style
- Dense 8 pt legacy Comparator-style datagrid
- Resizable datagrid columns
- Three-state header sorting: ascending, descending, original order
- Activity Tool persistence
- Inspector context hierarchy
- Compact one-line VRQ/event streams

## Changed

- Rebuilt the TreeView as a deeper Comparator-style classification structure.
- Each sector now has 100 class leaves and more than 1,000 nodes when object-set children are included.
- Standard class children are now: Offers / Listings, Bids, Records.
- Evidence, invoices, history, and outcome records are nested under Records instead of being top-level class children.
- Models and VRQs are not default TreeView children. Models are controlled by the Model tool. VRQs remain in the event/message stream.
- Datagrid columns are class-specific: common comparator fields plus template fields for the selected class.
- Each datagrid shows 5 sample records.

## Sample paths to inspect

- Human / Consumer > Needs & Life Domains > Transportation > Road Vehicles > Passenger Vehicles > Offers / Listings
- Human / Consumer > Needs & Life Domains > Transportation > Road Vehicles > Passenger Vehicles > Bids
- Human / Consumer > Needs & Life Domains > Transportation > Road Vehicles > Passenger Vehicles > Records > Transaction Records
- Human / Consumer > Needs & Life Domains > Shelter > Rent > Apartments > Offers / Listings
- Human / Consumer > Needs & Life Domains > Shelter > Rent > Apartments > Records > Transaction Records
- Business / Commercial > Commercial Classification > Business Types > Service Businesses > Auto Repair Shop > Records > Transaction Records
