# Comparator Sample Data Filename Coding System v0.1

Purpose: make files easy for a prototype loader to find without guessing.

Pattern:

```text
SD_<VIEW>_<PRIMARYSCOPE>-<APPLICABLESCOPE>_<DOMAIN>_<CLASS>_<LEAF>_v###.<ext>
```

Example:

```text
SD_HUM_PER-MUN_SHEL_RENT_APT_v001.txt
```

Means:

```text
Sample Data
Human / Consumer view
Primary scope = Personal
Applicable scope = Municipal
Domain = Shelter
Class = Rent
Leaf = Apartment
Version 001
```

## VIEW codes

| Code | Meaning |
|---|---|
| HUM | Human / Consumer |
| MKT | Market / Exchange |
| BUS | Business / Commercial |
| FIN | Finance / Capital |
| GOV | Government / Public |
| CMP | Comparator tool |
| SIM | Simulation tool |
| CRD | Credits / Value Assessment |
| OBJ | Object / Schema Workbench |

## Scope codes

| Code | Meaning |
|---|---|
| INT | International |
| NAT | National |
| PRO | Provincial / State |
| REG | Regional |
| MUN | Municipal / Local |
| ORG | Organizational |
| PER | Personal / Household |

Primary scope means where the user is standing.
Applicable scope means where the answer/action/listing/regulation/service lives.

Example:

```text
HUM_PER-NAT_LAWR_OMBUD_FED_v001
```

means a personal user need that points to a national/federal ombudsman or rights/remedy mechanism.

## Domain codes

| Code | Meaning |
|---|---|
| SHEL | Shelter |
| TRAN | Transportation |
| FOOD | Food |
| SECU | Security / Defense / Safety |
| LAWR | Law / Rights / Regulation |
| BUSN | Business |
| FINC | Finance |
| GOVP | Government / Public |
| HLTH | Health |
| ENER | Energy |
| INFO | Information / Communication |

## Class / leaf examples

| Code | Meaning |
|---|---|
| RENT | Rent / rental |
| OWN | Ownership / purchase |
| APT | Apartment |
| ROOM | Room |
| HOUSE | House |
| VEH | Vehicle |
| PASS | Passenger vehicle |
| SERV | Service |
| CAMI | Camera installation |
| OMBUD | Ombudsman / complaint mechanism |
| FED | Federal / national-level object |

## Loader rule

A browser prototype can load `index/sample_data_index.json`, filter by selected matrix context, then open the matching `.json` file. The `.txt` version is provided for human inspection, spreadsheet import, and Git diff readability.
