# Master Interface Concept v2.0

## Core correction

The master interface is not a Comparator app. It is a larger economic workspace that gives minimum useful starting access to:

1. Business Modeling
2. Business Simulation
3. Assessment / Credit / Value Measurement
4. Comparator / Transaction
5. Objects / Definitions
6. Economy Context Simulation through event/message flow

## The master matrix

```text
Sector / Viewpoint × Activity Tool × Scope × Classification Tree × Selected Object
```

The current prototype implements this as:

```text
Top row = sector / viewpoint
Tool row = activity interface
Left panel = unified classification tree
Scope panel = scale / jurisdiction
Overlay panel = cross-sector layer
Center panel = best working representation for selected context
Right panel = selected object inspector/editor
Bottom panels = summary, event bus, evidence records
```

## Hyper-contextual economy

An economy is hyper-contextual when every object, action, rule, risk, price, value, and decision exists in multiple overlapping contexts at once.

A rental apartment is not only a rental apartment. It is also:

- a human shelter need
- a market offer
- a business service output
- a finance/cash-flow problem
- a legal/rights object
- a safety/risk object
- a transaction candidate
- an evidence record
- a future satisfaction/outcome source

This is why the system needs a tree, matrix, graph, swimlane, event bus, inspector, and evidence trail.

## Visual modeling and swimlanes

The modeling interface must feed Comparator, Business Simulator, Assessment, and Economy Context Simulation.

A model is not only a diagram. It contains:

- objects
- roles
- swimlanes
- graph nodes
- edges/relationships
- event sources
- handlers
- evidence links
- simulation triggers
- assessment triggers
- transaction triggers

Objects must be able to connect across any swimlane. A customer need can connect to an offer, a business process, a finance constraint, a government rule, an evidence record, and an interrupt.

## Economic Event Bus

The Economic Event Bus is the nervous system of the prototype.

```text
Object = economic actor/resource/offer/need/process/record
Message = signal/request/update/event
Interrupt = value-changing reprioritization in time
Queue = pending attention stack
Scheduler = priority/value/time logic
Handler = response procedure
Log = evidence/audit trail/learning record
```

## Interrupt doctrine

Interrupts are usually treated as inefficiencies. In a hyper-contextual value system, an interrupt is better understood as:

```text
An interrupt is a reprioritization of value in time.
```

Interrupts can be bad, good, or neutral:

- failure, delay, damage, non-payment
- new customer, lower price, better supplier, grant available
- changed scope, changed deadline, changed budget, new information

## Minimum useful screens in this prototype

### Model

Shows a visual swimlane/graph editor with cross-lane object connections and interrupt nodes.

### Simulate

Shows scenario setup, agent layer, run controls, outputs, and feedback into model/assessment.

### Assess

Shows evidence-backed credit/value measurement modules.

### Compare / Transact

Shows selected class as typed comparable offer rows with transaction actions.

### Objects / Definitions

Shows unified class definitions and JSON preview for future schema/data-file expansion.

## Next development steps

1. Split JavaScript into modules.
2. Move taxonomy, classes, field templates, sample offers, event schema, and model schema into external JSON.
3. Add persistent local project files or browser storage export/import.
4. Add richer graph editing: connection handles, editable node fields, multiple model tabs.
5. Add real definition editor for class templates.
6. Add event handler rules.
7. Add assessment methodology forms and evidence upload structure.
8. Add simulation scenario save/load.
9. Add Comparator transaction record export.
10. Later connect live listings/offers/transactions to a server-side database.
