# Architecture

Feature-first React Native app with a layered core and a Material Design 3 UI.

## Layers

```
features/   screens, components, hooks, stores   (goods, cart, ratings, seller)
    │
    ▼
domain/     entities + pure use-cases            (no React, no IO)
    ▲
    │
data/       DTOs, mappers, API, repositories     (ShopRepository)
    │
    ▼
core/       config, http (axios), storage, DI, errors
shared/     reusable UI primitives
app/        providers, navigation, Paper theme, query client
```

Dependency rule: `features` → `domain`, `features` → `data` through the injected
repository interface, `data` → `domain`. `domain` never imports React, axios or RN, so
use-cases stay trivially testable.

## State

| state | owner | examples |
|---|---|---|
| server | TanStack Query | seller, goods, ratings |
| client | Zustand (+ AsyncStorage persist) | cart counts, favorite flag |
| ephemeral | `useState` | active category, filters, panel visibility |

The cart is a `foodId -> count` map, not a field on food objects — the menu, food
detail and cart panel share one source of truth.

## Navigation

Native stack with a header-less root:

```
RootStack
├── Main      SellerHeader + material top tabs (Menu | Reviews | Merchant)
└── FoodDetail (pushed, slide-from-right)
```

## Design system

React Native Paper 5 with a customized MD3 theme (`src/app/theme/paperTheme.ts`).
Screens use Paper primitives (`Surface`, `List`, `Button`, `Dialog`, `Modal`, `Badge`,
`SegmentedButtons`, …); `src/app/theme/tokens.ts` holds only what MD3 does not model:
spacing rhythm, structural sizes, radii and motion.

## Testing

Jest + React Native Testing Library, 31 tests: pure use-cases, repositories
(mapping/fallback), components, one screen integration test and an app smoke test.

See [README.md](./README.md) for stack and run instructions.
