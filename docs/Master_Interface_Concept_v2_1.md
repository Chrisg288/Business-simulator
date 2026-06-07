# Economy Master Interface v2.1 Concept Notes

## Main focus

The main purpose of v2.1 is to demonstrate the inspector context hierarchy and sector-level swimlanes.

## Inspector context hierarchy

The inspector must always use the most specific available context:

```text
1. Center-panel selected object
2. TreeView selected node
3. Sector + Scope + Cross-sector Overlay
4. Startup / Sector button explanation
```

This makes the inspector predictable. It always answers: "what am I editing or inspecting right now?"

## Home

Home is not a sector. It is the orientation screen.

Home button order:

```text
Home | Human / Consumer | Market / Exchange | Business / Commercial | Finance / Capital | Public / Government
```

The Home center panel uses the five-sector wheel image supplied by the user. The Home TreeView mirrors those five sectors.

## Swimlane activity tool

Swimlane is now the first Activity Tool because sector selection should immediately show the stable top-level contextual objects for that sector.

The sector swimlanes should be treated as basic and durable. Details can change, but the conceptual lanes should remain stable enough to guide future modeling, simulation, assessment, comparison, and event handling.

## VRQ

VRQ means:

```text
Value Reprioritization Request
```

A VRQ is not merely an interruption. It is a request for the system to reconsider priority because value, risk, timing, evidence, availability, or context has changed.
