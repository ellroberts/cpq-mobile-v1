# MobilePlanCards – v9 Selectable State [Note]
📅 Date: 2025-05-21

## Purpose
Connected card UI to global state to reflect selected plans and enable dynamic footer behavior.

## Key Behaviours
- Filters data using `selectedFilters`
- Displays cards from `mobilePlanData`
- Tracks selection using `selectedPlans[]` from parent

## Props
- `selectedFilters: object`
- `selectedPlans: number[]`
- `setSelectedPlans: function`

## Notes
- Card UI toggles between “+ Add” and “✓ Added”
- State lives in `App.tsx`, not local to this component
