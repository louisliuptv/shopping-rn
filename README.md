# shopping-rn

A React Native port of the Vue 2 food-delivery demo in `../shopping-vue.js`
(menu browsing, shopping cart, reviews, merchant page).

Same screens, same data, same visual language — rebuilt with a modern RN stack and
a feature-based clean architecture. See [ARCHITECTURE.md](./ARCHITECTURE.md) for the
"why" behind every choice.

| | |
|---|---|
| RN | 0.81.6 (new architecture) |
| Language | TypeScript (strict) |
| Navigation | React Navigation 7 — native stack + material top tabs |
| Server state | TanStack Query 5 |
| Client state | Zustand 5 (+ AsyncStorage persistence) |
| Transport | axios + repository pattern |
| Tests | Jest + React Native Testing Library |

## Quick start

```bash
# 1. dependencies
npm install

# 2. local mock API (separate terminal)
npm run mock          # http://localhost:8900/api/{seller,goods,ratings}

# 3. iOS pods (first run / after native dep changes)
npm run pods

# 4. run it
npm run ios           # or: npm run android
```

The app runs **without** the mock server too: `FallbackShopRepository` falls back to a
bundled copy of the same JSON when the request fails, so a fresh clone always renders.

### Android build environment (this machine)

The Gradle build needs **JDK 17** and **node/npx on `PATH`** — the RN Gradle plugin shells
out to `npx` while evaluating `android/settings.gradle`, and the default `java` here is 26.

```bash
export JAVA_HOME=~/Library/Java/JavaVirtualMachines/ms-17.0.18/Contents/Home
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$HOME/.nvm/versions/node/v24.14.1/bin:$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH

npm run android        # build + install + launch (Metro must be running)
# or just the APK:
cd android && ./gradlew assembleDebug
# -> android/app/build/outputs/apk/debug/app-debug.apk
```

`adb reverse tcp:8081 tcp:8081` keeps the debug build talking to Metro over USB/emulator.
Verified on `Pixel_3_XL_API_30` (API 30, arm64) — see Troubleshooting.

UI and sample data are in English. The original Chinese payload is kept as
`mock-server/data.zh.json` if you want to switch back or add a locale.

## Scripts

| script | what it does |
|---|---|
| `npm run mock` | starts the local mock API on port 8900 |
| `npm start` | Metro bundler |
| `npm run ios` / `npm run android` | build + launch on simulator/emulator |
| `npm run pods` | `pod install` for the iOS project (or `cd ios && bundle exec pod install` if you manage gems with bundler) |
| `npm test` | Jest suite (31 tests) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run test:coverage` | coverage report |

## Talking to the API

`src/core/config/env.ts` holds the only host configuration:

```ts
const HOST = Platform.select({ android: '10.0.2.2', default: 'localhost' });
export const env = {
  apiBaseUrl: `http://${HOST}:8900/api`,
  useFixtureFallback: true,   // set false to surface network errors
};
```

- iOS simulator → `localhost` reaches the host machine.
- Android emulator → `10.0.2.2` is the host loopback alias.
- Physical device → replace `HOST` with your machine's LAN IP.

## Project layout

```
src/
├── app/            # shell: providers, navigation, theme tokens, query client
├── core/           # cross-cutting: config, http, storage, DI, errors
├── domain/         # entities + pure use-cases (no React, no axios)
├── data/           # DTOs, mappers, api services, repositories, fixtures
├── features/       # goods | ratings | seller | cart (screens, components, hooks, store)
└── shared/         # reusable UI primitives + async states
mock-server/        # throwaway express mock API (same payload as the Vue app)
__tests__/          # use-case, repository, component and screen tests
```

## Ported screens

| Vue | RN |
|---|---|
| `App.vue` + `v-header` | `app/navigation/MainScreen.tsx` + `features/seller/.../SellerHeader.tsx` |
| `tab.vue` (cube-slide) | `app/navigation/MainTabs.tsx` (material top tabs, swipeable) |
| `goods.vue` (cube-scroll-nav) | `features/goods/screens/GoodsScreen.tsx` (SectionList + synced rail) |
| `food.vue` (fixed panel) | `features/goods/screens/FoodDetailScreen.tsx` (pushed stack screen) |
| `shop-cart*.vue` | `features/cart/components/{CartBar,CartPanel,CartControl}.tsx` |
| `ratings.vue` / `rating-select.vue` | `features/ratings/*` |
| `seller.vue` | `features/seller/screens/SellerScreen.tsx` |
| `good-storage` | `core/storage/kvStorage.ts` + Zustand persist |

## Troubleshooting

- **Blank list / "Network request failed"** — the mock server is not running and you disabled
  `useFixtureFallback`; run `npm run mock` or set it back to `true`.
- **No images** — the fixture points at third-party CDNs (`fuss10.elemecdn.com`).
  Placeholders keep the layout intact when they cannot be reached.
- **Metro cache weirdness** — `npm start -- --reset-cache`.
- **Android: `A problem occurred starting process 'command 'npx''`** — Gradle cannot see
  `node`/`npx`; export the nvm bin dir on `PATH` (see *Android build environment*).
- **Android: `Could not create parent directory for lock file .../.gradle-wrapper`** — the
  shell sandbox cannot write `~/.gradle`; run the build outside the sandbox.
- **iOS build after adding a native dep** — re-run `npm run pods`.
- **`run-ios` fails with `SimError code=405 / Unable to lookup in current state: Shutdown`**
  — several simulators share a name (`iPhone 16` exists for iOS 18.0 and 18.2). Boot the
  one you mean and pass its UDID explicitly:
  `xcrun simctl boot "iPhone 16"` then
  `npx react-native run-ios --udid $(xcrun simctl list devices booted | grep -m1 "iPhone 16" | grep -o "[0-9A-F-]\{36\}")`
  The Xcode build itself is unaffected — this is only the launch step.
