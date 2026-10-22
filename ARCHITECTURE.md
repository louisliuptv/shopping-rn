# Architecture

> Port of `../shopping-vue.js` (Vue 2 + cube-ui + stylus) to React Native.
> The reference architecture table for this exercise was:

| Concern | Reference option | **Chosen here** | Why |
|---|---|---|---|
| Structure | Feature-based Clean Architecture + MVVM-like | **Feature-first + layered (`domain` / `data` / `features`)** | 4 features, each owning its screens/components/hooks/store; shared layers only for what is genuinely cross-cutting |
| Components | RN components | **Function components + `Pressable`/`SectionList`/`Modal`** | No navigation-by-string, no cube-ui equivalents needed |
| State | Hooks + Zustand or Redux Toolkit | **Zustand 5** | 2 small stores (cart, favorites); RTK's slices/thunks/boilerplate buy nothing at this size. Zustand also gives per-selector subscriptions, which matters for a 100-row menu |
| Actions | Callbacks, actions, custom hooks | **Store actions + custom hooks (`useCartSummary`, `useRatingFilter`)** | Components stay declarative; no prop-drilled `onAdd` chains |
| Async | `useEffect`, async actions, TanStack Query | **TanStack Query 5 for all server state** | Replaces the Vue `fetched` flags, dedupes requests, handles retries/staleness/caching |
| Use cases | Use cases / services (optional) | **Pure functions in `domain/usecases`** | Cart math, star rounding, rating filtering, money/date formatting — 100 % unit tested, zero React imports |
| Repository | Repository / API service | **`ShopRepository` interface + `HttpShopRepository` + `FixtureShopRepository` + `FallbackShopRepository` decorator** | The UI depends on the interface only; swapping the transport never touches a screen |
| Transport | Axios / Fetch | **axios** | Interceptor maps every failure into one `AppError` (network / http / business / parse) |
| Types | TypeScript modules / explicit injection | **TS strict + DTO→domain mappers + `RepositoryProvider` context injection** | No `any` crossing a layer boundary, no service-locator singletons (tests inject fakes) |
| Persistence | SQLite-based solutions | **AsyncStorage via Zustand `persist`** | The only durable data is `foodId -> count` and one favorite flag; a KV store is the right tool. SQLite would be justified for order history/offline catalogue — see "When to add SQLite" |
| Navigation | React Navigation / Expo Router | **React Navigation 7 (native stack + material top tabs)** | Bare RN project (no Expo runtime); top tabs give the swipeable panes and indicator that `cube-slide` provided |
| Testing | Jest, RNTL, Detox | **Jest + RNTL (31 tests)** | Use cases, repositories, components, one screen-level integration test. Detox is the next step, not the first |

## Layering

```
 UI (features/*/screens, components)
   │  hooks (useGoods, useSeller, useCartSummary, useRatingFilter)
   ▼
 domain/usecases  ── pure functions, no React, no IO
   │
   ▼
 data/repositories (ShopRepository)  ── interface the UI knows
   ├── HttpShopRepository  → data/api/shopApi → core/network/httpClient (axios)
   ├── FixtureShopRepository → bundled JSON
   └── FallbackShopRepository (decorator: http first, fixture on failure)
   │
   ▼
 data/mappers  DTO → domain entity
```

Dependency rule: `features` → `domain`, `features` → `data` (through the injected
interface), `data` → `domain`. `domain` imports nothing from React, axios or RN.

### Why mappers instead of using the API shape directly

The Vue app mutated API objects (`this.$set(food, 'count', 1)`) and read numbers that
arrive as strings (`oldPrice`). Entities here are normalized: `oldPrice` stays a string
because it is a display-only strikethrough, every numeric field is coerced once in
`shopMappers.ts`, and every `Food` gets a synthetic stable `id` (`g{groupIndex}-f{foodIndex}`)
because `data.json` has no ids and React needs stable keys.

## State split

| kind of state | owner | example |
|---|---|---|
| server state | TanStack Query (`app/query/queryClient.ts`) | seller, goods, ratings |
| client/UI state | Zustand (`features/cart/store`, `features/seller/store`) | cart counts, favorite flag |
| ephemeral UI state | `useState` in the screen | active category, rating filter, panel/dialog visibility |

The cart is *not* stored on food objects (as in Vue) — it is a `foodId -> count` map.
Consequence: the same dish is rendered in the menu, the food sheet, and the cart panel,
and all three stay in sync automatically, with no event bus.

## Navigation

```
NavigationContainer
└── RootStack (native stack, headers hidden)
    ├── Main ──► SafeArea header (SellerHeader) + MainTabs
    │            MainTabs = material top tabs: Menu | Reviews | Merchant (swipeable, lazy)
    └── FoodDetail  (slide_from_right)
```

Mapping from the web app:

- `cube-slide` panes → material top tabs (`react-native-pager-view` underneath) —
  keeps horizontal swipe and the animated indicator.
- `food.vue` was a `position: fixed` panel inside the goods tab → now a **pushed screen**.
  Same slide-in-from-the-right feel, plus the platform back gesture/button for free.
- `v-header` tap used to open a `header-detail` overlay → now navigates to the existing
  Merchant tab (`navigation.navigate('Main', { screen: 'Seller' })`); no duplicated screen.
- Seller id came from the URL (`?id=1`) → `app/config/appConfig.ts` (deep-linkable later).

## Design tokens

`src/app/theme/tokens.ts` is the single source of visual truth. Components import
token scales instead of writing px literals, so the port stays consistent and a
theme change is a one-file change.

Why a hand-rolled token layer instead of a styling library:

- **No runtime.** Plain exported objects — no provider, no context re-renders, no
  extra dependency, and plain Jest snapshots.
- **Pixel-faithful port.** The Vue app hardcoded px in every component. The `space`
  scale is keyed by pixel value on a 2px rhythm (`space[18]`), so the RN layout
  matches the original exactly instead of being rounded onto a 4/8pt grid.
- **Semantic separation.** `metrics` names structural sizes (cart bar, food thumb,
  category rail, seller header), `icons` and `starGlyphs` keep illustration
  geometry out of layout code, and `motion` holds the drop-ball timing.
- **One axis to change.** Typography (`fontSize`, `lineHeight`, `fontWeight`),
  spacing, radii, borders, z-index and palette are independent scales; adding
  dark mode later means swapping the token object, not editing 28 files.

## Deliberate deviations from the Vue UI

| Vue | RN | Reason |
|---|---|---|
| sprite PNGs for support badges (`support-ico`) | short text tags (off / % / new / inv / safe) | 20 assets (5 icons × 4 sizes) for decorative 12–16pt glyphs; text scales to any density for free |
| star sprite PNGs | clipped `★` text glyph | same visual result, no raster assets, exact half-star support |
| `linear-gradient` bubble | flat red pill | a 16pt pill does not justify a gradient dependency |
| `icon-shopping_cart` font glyph | `CartIcon` drawn with 3 `View`s | avoids an icon font for a single glyph |
| drop-ball animation (`transition` + `getBoundingClientRect`) | ported with the built-in `Animated` API: `CartBallProvider` overlay + `measureInWindow`, same dual easing (X linear, Y `cubic-bezier(0.49, -0.29, 0.75, 0.41)`, 400ms) | no dependency needed — RN's native driver animates transforms; measuring both endpoints reproduces the fixed-position ball |
| blurred header background (`filter: blur`) | `ImageBackground blurRadius={10}` + scrim | native blur without `expo-blur` |
| cart lost on refresh | cart persisted (AsyncStorage) | strictly better UX, and now testable |

## When to add SQLite

Not now. The persisted payload is a handful of integers. Add `react-native-nitro-sqlite`
(or `expo-sqlite`) when you introduce any of:

- order history / receipts that need querying and paging,
- an offline catalogue larger than the JS heap wants to hold,
- analytics events with retention.

The seam is ready: a `SqliteCartRepository`/`SqliteOrderRepository` implements the same
interface and is wired in `core/di/createShopRepository.ts` only.

## Testing

```
npm test              # 31 tests
npm run test:coverage
```

| layer | file | what is covered |
|---|---|---|
| use-cases | `__tests__/cartUseCases.test.ts` | totals, min-order copy, grouping, money rounding |
| use-cases | `__tests__/starUseCases.test.ts` | half-star rounding, defensive input |
| use-cases | `__tests__/ratingUseCases.test.ts` | tab + "only with content" combination |
| data | `__tests__/repositories.test.ts` | DTO mapping, fallback decorator, error propagation |
| UI | `__tests__/components.test.tsx` | Star/Bubble/RatingFilter/CartControl/CartBar (incl. payment dialog) |
| integration | `__tests__/goodsScreen.test.tsx` | menu renders from an injected fake repo; `+` updates the store and the row |
| app smoke | `__tests__/app.test.tsx` | real providers + navigator: header, goods tab, tab switch, push food detail, add to cart |

Not covered yet: Detox E2E (device-level), snapshot tests (deliberately avoided — they
break on every style tweak), and the native build itself.

## Adding a feature (the intended workflow)

1. Add/extend the entity in `src/domain/entities/shop.ts`.
2. Add a pure use-case in `src/domain/usecases/` + a test.
3. Extend the repository interface, the HTTP implementation, and the DTO mapper.
4. Add a hook in `src/features/<feature>/hooks/` (TanStack Query) or a Zustand store
   for client state.
5. Build the screen in `src/features/<feature>/screens/`, register it if it needs a route.
6. Report errors through `<ErrorState/>` and loading through `<LoadingState/>`.

## Language / localization

The whole app is **English**: UI chrome (labels, buttons, empty/loading/error states,
accessibility labels) *and* the sample dataset.

The dataset was translated field-by-field (dish names, descriptions, review text, seller
copy) with every id, price, image URL, timestamp and record count preserved:

- `mock-server/data.json` and `src/data/fixtures/shop-data.json` — English (in use)
- `mock-server/data.zh.json` — the original Chinese payload, kept for reference

To ship another language, replace those two files with a translated payload of the same
shape, or point `env.apiBaseUrl` at a localized API. A runtime i18n layer (`i18next` +
`react-native-localize`) is only worth its weight once two languages ship at the same
time; today the strings sit inline next to the component that renders them.

## Known limitations

- Images come from a third-party CDN; the placeholder path is used when they fail.
- The mock server is read-only (three GET endpoints, same as the Vue app) — there is no
  real backend, payment or auth.
- `react-native-screens` is pinned to `4.16.0`: 4.30 ships codegen that RN 0.81's
  TypeScript parser rejects (`React.ElementRef<>` in `SearchBarNativeComponent`).
