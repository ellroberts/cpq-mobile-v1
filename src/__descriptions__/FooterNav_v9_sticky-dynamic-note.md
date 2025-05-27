# FooterNav – v9 Sticky + Dynamic Button [Note]
📅 Date: 2025-05-21

## Purpose
This update made the footer sticky and introduced a dynamic “Continue” button that responds to the number of plans selected.

## Key Behaviours
- Sticky footer using `fixed bottom-0 w-full z-50`
- Dynamic button label: e.g. `Continue (2 selected)`
- Button disabled if no plans selected (`selectedCount === 0`)

## Props
- `selectedCount: number` — required to control visibility and state

## Notes
- Component uses Tailwind for layout and style
- Designed to remain visible on all screen sizes
