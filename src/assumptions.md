# 📘 Assumptions & Dependencies

## 🗂️ Documentation Notes

As of Milestone v9 (2025-05-21), all descriptive behavior snapshots, design intentions, and component rationale are documented in Markdown files under:

```
src/__descriptions__/
```

File format follows:

```
Component_vX_label-note.md
```

This separates human-readable context from code-level rollback snapshots (`__snapshots__`) and helps keep implementation, logic, and rationale clear as the project evolves.

---

## [v2–v6] – 2025-05-20

### 🧩 Filter Group

- ✅ Each filter group is collapsible using internal `expanded` state
- ✅ Icons (chevrons, info) are shown conditionally
- ✅ Tooltip and dropdown logic live in the same component
- ✅ FiltersPanel receives `selectedFilters`, `toggleFilter`, and `resetFilters` as props
- ✅ Filter options are rendered from static arrays (e.g. `"5GB"`, `"10GB"`)
- ✅ Matching is done via string equality (not range logic)

- ⛔ No shared context between groups (selection logic handled externally)
- ⛔ Filter UI assumes single-level checkboxes (no nested or advanced types)

---

## [v3] – 2025-05-20

### 🧩 Tooltip

- ✅ FontAwesome icons only
- ✅ Tooltip appears on hover (desktop) or tap (mobile)
- ✅ Tooltip content passed via `tooltip` prop
- ✅ Uses Tailwind for styling and positioning

- ⛔ No keyboard or screen reader accessibility (future scope)

---

## [v6] – 2025-05-20

### 🧩 Reset Logic

- ✅ "Reset All" resets filters to default values using `resetFilters()` callback
- ✅ Fully clears selection state for checkboxes

- ⛔ Does not reset dropdowns or scroll position yet

---

## [v6.2] – 2025-05-20

### 🧩 Filter Updates

- ✅ Snapshot `v6_all-groups.tsx` was used as implementation baseline
- ✅ The previous v6.1 had only "Network" filter implemented
- ✅ Removal of `faRedo` icon was intentional by design
- ✅ Future milestones can assume all groups are structurally in place

---

## [v7] – 2025-05-21

### 🧩 Mobile Plan Cards

- ✅ Logos are rendered based on lowercase `network` matched in `logoMap`
- ✅ FontAwesome icons (phone, plane, globe) map dynamically from `icons[]`
- ✅ "+ Add" button included visually (inactive for now)
- ✅ Layout matches screenshot: logo, title, usage rows, UK-EU mins, icons, pricing, term, button
- ✅ Tailwind used for all layout
- ✅ Fully responsive 3-column card grid
- ✅ Logos imported from `src/assets/` for all networks
- ✅ Filtering is applied using chained `.filter()` logic (network, data, contract, roaming, features)
- ✅ Filters use exact string match (e.g. `data === "10GB"`)
- ✅ Features must match all selected icons using `.every()`
- ✅ Cards dynamically reflect data from `mobilePlanData.ts`

- ⛔ No selection state or button interactivity (planned for v8)
- ⛔ No summary or continuation logic integrated yet
- ⛔ No persistence (localStorage, debounce, etc.)

---

## [v8] – 2025-05-21

### 🧩 Plan Selection Logic

- ✅ Button interactivity added to each mobile plan card
- ✅ Button text toggles between `+ Add` and `✓ Added` based on selection
- ✅ Styling switches between grey and green based on `isSelected` prop
- ✅ `MobilePlanCard.tsx` now accepts:
  - `isSelected: boolean` – for button state and styling
  - `onToggle(id: number)` – to toggle selection from parent
- ✅ `MobilePlanCards.tsx` manages `selectedPlans: number[]` locally via React state
- ✅ State is updated using `.includes()` and `.filter()` to add/remove IDs
- ✅ Selection state is passed down via props to each individual card

⛔ No global persistence yet (e.g. localStorage or query string)  
⛔ No visual summary or multi-step navigation logic implemented  
⛔ No animation or accessibility support for selection state

---

## [v8.4] – 2025-05-21

### 🧩 Features Filter + Divider Cleanup

- ✅ Features filter options are now structured as `{ label, value, icon }`
- ✅ Displayed label: Travel Plus, Travel Free, International calling
- ✅ Filtering logic uses `.value` to match against `plan.icons[]`
- ✅ FontAwesome icons (faPhone, faPlane, faGlobe) shown in UI
- ✅ Checkbox state triggers `toggleFilter("features", item.value)`
- ✅ FilterGroup supports optional `hideDivider` prop
- ✅ FiltersPanel sets `hideDivider={true}` for Features group
- ✅ Conditional class logic suppresses `border-b` style in last group

- ⛔ No animation or smooth collapse behavior for group transitions
- ⛔ No global state shared between filter groups (remains isolated)

---

## [v9] – 2025-05-21

### 🧩 Sticky Footer + Dynamic Button Logic

- ✅ `FooterNav` is now sticky (`fixed bottom-0`) and always visible on screen
- ✅ Button state updates based on `selectedCount` prop
- ✅ Disabled state shown when `selectedCount === 0`
- ✅ Button label dynamically shows selected count (e.g. `Continue (2 selected)`)
- ✅ `App.tsx` maintains global `selectedPlans` state
- ✅ `MobilePlanCards` receives and updates selected plans via props
- ✅ Footer and content layout do not conflict visually
- ✅ `pb-36` added to `<main>` for scroll safety below sticky footer

- ⛔ No summary or checkout drawer UI implemented yet
- ⛔ No accessibility enhancements (ARIA roles, keyboard interaction)

---

## [v10] – 2025-05-22

### 🧩 Plan Sorting & Filter Enhancements

- ✅ 15 mobile plan cards rendered from mobilePlanData.ts
- ✅ Each plan includes unique attributes: network, data, term, price, icons[], type
- ✅ Sort dropdown added above plan grid
- ✅ Sort order controlled in App.tsx via sortOrder state
- ✅ Sorting options: Price (Low to High) and Price (High to Low)
- ✅ Sorted plans passed as props to MobilePlanCards.tsx
- ✅ Product Type filter now connected to plan data using type field (e.g. voice, data)
- ✅ “Roaming” filter group label renamed to International Roaming
- ✅ Feature filters updated to correct labels: Travel Plus, Travel Free, International Calling
- ✅ Filtering logic includes plan.type and .every() for icons match
- ✅ Filter UI order and spacing match original v9 layout (including divider polish)

- ⛔ No debounce or animation added for filter/sort transitions
- ⛔ No lazy loading or pagination on card rendering
- ⛔ Sort does not persist in URL/query string or session

---

## [v10.1] – 2025-05-22

### 🧩 View Selected Plans + Footer Actions

- ✅ Footer displays X selected, View, and Clear All when plans are selected
- ✅ View link triggers modal showing selected plans
- ✅ Modal accepts plans[] as props and maps basic info (name, price)
- ✅ Modal uses isOpen and onClose props to control visibility
- ✅ handleClearAll() resets selected plans via setSelectedPlans([])
- ✅ FooterNav.tsx receives new onViewSelected and onClearAll props
- ✅ App.tsx manages modal state and handles filtering selected plan data

- ⛔ Modal does not support removing individual plans yet
- ⛔ Modal is informational only — no CTA or “Proceed” action included
- ⛔ No ARIA roles or keyboard handling for modal focus trap

---

## [v10.2] – 2025-05-22

### 🧩 Global Footer + Plan Context Integration

- ✅ A single global FooterNav is now rendered from `Layout.tsx`
- ✅ Back and Continue buttons are available across all steps
- ✅ Modal control (View, Clear All, selected count) appears only on `/mobile-plans`
- ✅ Selected plans and modal visibility are managed via `PlanContext`
- ✅ FooterNav reads `location.pathname` to determine if on Mobile Plans step
- ✅ Header and Footer content now share layout alignment via `max-w-[1200px] mx-auto`
- ✅ Modal state and selectedPlans[] are globally scoped and used by both Footer and MobilePlans
- ✅ `MobilePlans.tsx` no longer contains any local selection or modal logic
- ✅ FontAwesome icons use React-based API for consistency
- ✅ Trash icon used in modal instead of text for removal
- ✅ Chevron icons now point down when expanded, up when collapsed

- ⛔ Plan context is not persisted between sessions
- ⛔ Modal still lacks keyboard accessibility or screen reader roles
- ⛔ Add-ons step is scaffolded only — functional logic is TBD in next milestone

---

## [v11.0] – 2025-05-23

### 🧩 Add-ons Page Setup

## 💡 Scope Assumptions

- ✅ Add-ons are optional and can be selected or deselected independently
- ✅ Modal is not required for Add-ons (unless used for future summary)
- ✅ FooterNav is global and will eventually support both Plans and Add-ons
- ✅ Add-ons data is hardcoded or JSON-based, not fetched dynamically
- ✅ Cards for Add-ons will reuse similar structure to Mobile Plans

## 💻 Technical Assumptions

- ✅ Global PlanContext can support multiple selection buckets (e.g., `selectedPlans`, `selectedAddOns`)
- ✅ FooterNav will dynamically show based on selected context (future support planned for step awareness)
- ✅ Filters will be shared in structure across steps, but may need field-specific logic (e.g., arrays vs. strings)
- ✅ Tailwind is active and should be used consistently across layout and card styling

## 🔁 Carry-Forward to v12

- ⛔ Contract, Roaming, and Features filters on `/mobile-plans` need logic correction
- ⛔ Add-ons FooterNav summary and modal still need wiring
- ⛔ Filter panel needs to be added to `/add-ons`
- ⛔ Final styling pass for add-on card visuals

---

## [v12.0] – 2025-05-24

### 🧠 Assumptions Review – Milestone v12 (Emergency Recovery)

Related Fix-log: Milestone v12 – Emergency Recovery Summary

### ❌ Assumptions That Led to Issues

#### 1. “The Code from v11.4 Will Still Work After Swapping Files”

- 🔸 **What was assumed:** Replacing all files with `src-v11.4` would immediately restore a working state.
- 🔸 **What was overlooked:** CodeSandbox may cache files or modules and not reflect structural resets without a full environment restart. Lingering mismatched imports (e.g. `addOnData`) weren’t aligned with the original v11.4 structure.

#### 2. “PlanContext Is Shared and Stable Across Both Pages”

- 🔸 **What was assumed:** Updates to `PlanContext.tsx` would seamlessly support both Mobile Plans and Add-ons.
- 🔸 **What was overlooked:** The context diverged. Mobile Plans used `selectedPlans`, while Add-ons relied on `updateAddOn`, `clearAddOns`, and a different modal toggle strategy. These weren't aligned. Assumptions about a global `setIsModalOpen` led to ghost modals and rendering failures.

#### 3. “All Components Referencing Context Will Stay Compatible”

- 🔸 **What was assumed:** Components would continue functioning as long as the context exported the same variable names.
- 🔸 **What was overlooked:** Structural changes (e.g. `setSelectedAddOns` being removed or relocated) broke usage silently across files, leading to runtime-only errors.

#### 4. “Imports Are Interchangeable”

- 🔸 **What was assumed:** Importing `addOnData` as a default (e.g. `import addOnData from ...`) would work regardless of how the module was exported.
- 🔸 **What was overlooked:** The actual export was named (`export const addOnData`). The default import caused fatal load errors and blocked rendering entirely.

#### 5. “CSS and Layout Changes Could Be Layered In Without Breakage”

- 🔸 **What was assumed:** Adding `max-w-[1200px]` and styling updates to `FooterNav` would not interfere with modal stacking or visibility.
- 🔸 **What was overlooked:** FooterNav’s `z-index`, container wrapping, and layout flow were coupled to the modal rendering logic. Misalignment caused ghost overlays and layout issues.

#### 6. “Modal Logic Would Be Plug-and-Play Across Pages”

- 🔸 **What was assumed:** Both Add-ons and Mobile Plans could use the same modal open/close handlers and shared state.
- 🔸 **What was overlooked:** `isModalOpen` was scoped differently per page. Centralizing it via `PlanContext` without isolating route-specific behavior caused dual modals or incorrect close behavior.

### ✅ Learning: Future Safeguards

- ☑️ Reintroduce one feature at a time from a known working base.
- ☑️ Validate named vs default imports after any ZIP swap or reset.
- ☑️ Maintain clear, separate modal states per page unless explicitly unified by design.
- ☑️ Confirm `PlanContext` methods are fully declared and synced across consuming components.
- ☑️ After any file replacement or structure change, restart the preview environment and review logs for module or import mismatches.

---

## [v12.1] – 2025-05-25

## 🧠 Contextual Assumptions

- The existing add-on data structure (`name`, `description`, `price`, `qty`) remains unchanged
- Cards are rendered via `AddOnCards.tsx`, with each `AddOnCard.tsx` component representing a row item
- Context methods `setSelectedAddOns`, `selectedAddOns`, `isModalOpen`, etc., are available via `usePlanContext()`
- FooterNav and modal logic rely on updates to `selectedAddOns` only — no side effects elsewhere

## ⚠️ Known Gotchas

- Tailwind's `truncate` class only works when all parent containers respect `max-width` and `min-w-0`
- Cards inside grid layouts tend to prevent `truncate` from taking effect
- Visual layout constraints (spacing, height, flow) are more reliable when not using hardcoded height values
- Layout can silently break if truncation fails — causing overlapping or misaligned descriptions

## 🧪 Temporary Workarounds

- Description truncation abandoned after extensive debugging
- All cards currently use `Description TBD` as a safe placeholder
- User intent is to reintroduce real text only once layout is guaranteed stable

## 🧩 Component Expectations

- `AddOnCards.tsx` must handle syncing quantity and clearing selection through context
- `AddOnCard.tsx` is responsible for:
  - Display layout
  - Quantity control
  - Badge selection
  - Clear button alignment
  - Tooltip (planned for future)
- Modal should not activate update button unless user makes a change
- Footer should reflect total quantity, not just number of cards selected

## 📦 Dependencies

- FontAwesome (for info icon)
- TailwindCSS 3+ (for layout, truncation, badge design)

---

## [v12.2] – 2025-05-26

# ⚠️ Assumptions Log: Milestone v12.2

## Summary:

This milestone involved many incorrect assumptions that led to broken behavior, repeated mistakes, and user frustration.

## ❌ Incorrect Assumptions Made

1. **Assumed user had renamed or removed legacy files**

   - Reality: User had kept all previous versions but was actively only using correctly named files.
   - Mistake: Referenced files like `SelectedAddOnsModal (1).tsx` as if they were broken or unused.

2. **Assumed incorrect imports caused blank preview**

   - Reality: Imports were mostly clean — blank screen likely caused by crashing runtime component or file not wired into route.

3. **Assumed badge logic was broken due to outdated state**

   - Reality: The issue was visual only — state changes worked, but `activeBadge` state wasn’t resetting cleanly.

4. **Assumed updates were not applied because user hadn’t switched files**

   - Reality: User confirmed repeatedly they pasted new code into correct files and only used `AddOns.tsx`, not backups.

5. **Assumed missing `clearAddOns` in context**
   - Reality: It existed and was wired in — but was not being used in `FooterNav.tsx`.

## 🧠 Key Learning

- Always confirm which files are actually rendered and in use
- Never introduce or rename files without asking the user if they're okay with new structure
- Avoid assumptions about which part of the state is “out of sync” without testing in context
- Never accuse the user of having messy structure when the mess was a byproduct of assistant-generated variations

## ✅ Safeguards for Future Threads

- Always confirm file actually rendered in route
- Ask user to send actual `console` log if blank preview occurs
- Validate component logic in context, not isolation
- Send single named files only — never suffixed versions (`-fixed`, `(1)`, etc.)

---

## [v13.0] – 2025-05-26

### 🧩 Add-ons Data & Card Behavior

- ✅ `addOnData.ts` now uses `price: number` format to support logic
- ✅ Cards are rendered safely using props from context and data
- ✅ Sorting logic expects numeric price and uses `.sort()` without parsing
- ✅ Modal renders selected add-ons and can remove or update quantities
- ✅ Quantity badge logic and clear selection work via context sync

- ⛔ Tooltip, description truncation, or info icon hover logic still pending
- ⛔ No localStorage or query string sync for filter or sort state

### 🧠 Critical Fixes

- Add-ons page crashed due to string-based `price` values
- This affected `.toFixed()`, sorting, and badge rendering
- Runtime crash appeared as `.filter()` error due to component unmount

### 📦 Dependency and Architecture Notes

- All card logic uses data passed via props (no direct data import in card)
- PlanContext supports both `selectedPlans` and `selectedAddOns` distinctly
- Sorting and filter logic are local to `AddOns.tsx` and not globally shared

- ⚠️ Must validate all data shape assumptions before calling `.filter()` or `.map()`

---

## [v13.5] – 2025-05-27

### 🧠 Tailwind & StackBlitz Transition

- ✅ Tailwind is installed and test utilities (e.g. `text-3xl`, `bg-yellow-300`) render in isolation
- ✅ `index.css` includes `@tailwind base/components/utilities`
- ✅ `main.tsx` imports `./index.css`
- ✅ `tailwind.config.js` exists and is correctly scoped (`./src/**/*.{ts,tsx,js,jsx}`)
- ✅ `vite.config.ts` uses `postcss.config.js` and plugins are installed
- ✅ Pages (`AddOns.tsx`, `Hardware.tsx`) already include Tailwind classes

### ❌ Open Styling Gaps

- ❌ Visual layout is unstyled despite Tailwind logic present
- ❌ Cards and layout components appear raw/unformatted in preview
- ❌ Content area wrappers may be missing outer `p-4`/`max-w` containers
- ❌ Prior custom CSS or layout styles (from CodeSandbox) may not have been carried over
- ❌ StackBlitz may not be compiling full Tailwind output depending on project state or plugin handling

### 🔄 Assumptions to Revalidate in v13.6

- Tailwind purge/content path is not accidentally filtering useful classes
- StackBlitz rebuilds are correctly triggering postcss output
- Preview container is not isolated from compiled styles
- Vite CSS config is not pointing to incorrect postcss path
- Component classNames are not being removed or overridden by rebuilds
- Global layout structure (e.g. `Layout.tsx`) includes spacing and theme classes

---

## 🧠 [v13.6] – 2025-05-27

### ✅ Confirmed Setup
- Tailwind installed via `tailwindcss`, `postcss`, and `autoprefixer`
- `tailwind.config.js` includes correct content paths (`./src/**/*.{ts,tsx,js,jsx}`)
- `vite.config.ts` now resolves PostCSS path with:
  ```ts
  css: {
    postcss: path.resolve(__dirname, './postcss.config.js'),
  }

