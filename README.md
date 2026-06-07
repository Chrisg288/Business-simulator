# Economy Master Overview v2.0 — GitHub-ready Prototype

Date: 2026-06-07

This package contains a single-root prototype for the Economy / Comparator / Business Simulation / Assessment system.

## What this version demonstrates

This prototype corrects the earlier Comparator-only drift and shows the master matrix:

```text
Sector / Viewpoint × Activity Tool × Scope × Classification Tree × Selected Object
```

Top sectors:

- Human / Consumer
- Market / Exchange
- Business / Commercial
- Finance / Capital
- Government / Public

Activity tools:

- Model
- Simulate
- Assess
- Compare / Transact
- Objects / Definitions

## Key design decisions

1. The tree is a unified classification source, not a separate Comparator tree.
2. Budget / Standard / Premium are not taxonomy leaves. They are future filters, tags, rankings, or search refinements.
3. Modeling is a common planning layer beneath Comparator, Business Simulator, Assessment, and Economy Context Simulation.
4. Visual graph models can connect objects across any swimlane.
5. The Economic Event Bus is a first-class layer.
6. Interrupts are modeled as value-changing events, not merely errors.
7. Value is treated as hyper-contextual.

## Files

```text
index.html
README.md
data/economy_matrix_seed_v0_2.json
data/event_bus_schema_v0_1.json
data/modeling_swimlane_schema_v0_1.json
docs/Master_Interface_Concept_v2_0.md
```

## How to use

Open `index.html` in a browser or place the files at the root of the GitHub Pages repository.

The prototype is vanilla HTML/CSS/JavaScript and uses no external libraries.

## Prototype interactions

- Switch sectors and tools using the top rows.
- Select meaningful taxonomy nodes in the left TreeView.
- Change scope and cross-sector overlay.
- In Model mode, drag nodes across swimlanes.
- Use Connect Selected to connect objects across swimlanes.
- Inject interrupts into the model.
- Run simulation scenarios.
- Recalculate credit scores.
- Select comparator offer rows and move them through transaction actions.
- View definition JSON in Objects / Definitions.

## Conceptual slogan

```text
The economy is hyper-contextual: every value object gains meaning through relationships.
```
