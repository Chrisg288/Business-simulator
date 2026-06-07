# Comparator Definition and Sample Data Library v0.1

This package is a starter definition/sample-data layer for the Comparator / Business Simulation system.

It demonstrates:

- a compact filename coding system for fast loading and accurate lookup;
- class-based field templates with inheritance from BaseOffer;
- leaf-level sample data in both JSON and tab-delimited text;
- sample contexts such as:
  - Personal → Municipal → Shelter → Rent → Apartments
  - Personal → Regional → Transportation → Vehicle → Passenger Vehicle
  - Business/Organizational → Municipal → Security → Service → Camera Installers
  - Personal → National → Law/Rights → Ombudsman → Federal Complaint Paths

Prototype rule:

```text
Tree node selected
+ Sector/View
+ Primary Scope
+ Applicable Scope
+ Class/Leaf
= load matching schema + sample/live data grid
```

In a real operating system:

- these JSON/class/taxonomy files can live in GitHub as the definition layer;
- live offers/listings/users/bids/transactions/evidence should be served from a server-side database;
- the browser app can load the matching schema, then request matching rows from an API/database.

All sample data here is fictional and only intended for interface/system prototyping.
