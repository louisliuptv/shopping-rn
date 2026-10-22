export const colors = {
  background: 'rgba(7, 17, 27, 1)',
  backgroundS: 'rgba(7, 17, 27, 0.8)',
  backgroundSS: 'rgba(7, 17, 27, 0.5)',
  backgroundSSS: 'rgba(7, 17, 27, 0.2)',
  backgroundSSSS: '#f3f5f7',

  white: '#ffffff',

  darkGrey: 'rgb(7, 17, 27)',
  grey: 'rgb(77, 85, 93)',
  lightGrey: 'rgb(147, 153, 159)',
  lightGreyS: '#93999f',
  lightGreySS: '#a7aaad',
  lightGreySSS: '#d9dde1',

  colLine: '#d9dde1',
  rowLine: 'rgba(7, 17, 27, 0.1)',

  red: 'rgb(240, 20, 20)',
  blue: 'rgb(0, 160, 220)',
  lightBlue: 'rgba(0, 160, 220, 0.2)',
  green: '#00b43c',
  orange: 'rgb(247, 143, 52)',
  gold: 'rgb(255, 166, 24)',

  supportOff: '#f07373',
  supportDiscount: '#fbbd41',
  supportNew: '#4ea7e8',
  supportInvoice: '#61c47a',
  supportSafe: '#9b8ade',
} as const;

export const fontSize = {
  tiny: 8,
  micro: 9,
  smallS: 10,
  label: 11,
  small: 12,
  medium: 14,
  large: 16,
  largeX: 18,
  largeXX: 20,
  title: 22,
  largeXXX: 24,
  display: 30,
  displayLarge: 34,
} as const;

export const lineHeight = {
  tight: 14,
  compact: 16,
  body: 18,
  relaxed: 24,
  icon: 34,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const space = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  22: 22,
  24: 24,
  26: 26,
  28: 28,
  32: 32,
} as const;

export const radius = {
  none: 0,
  xs: 1,
  s: 2,
  m: 4,
  l: 8,
  xl: 12,
  pill: 999,
} as const;

export const borderWidth = {
  thin: 1,
  medium: 1.5,
  thick: 2,
} as const;

export const zIndex = {
  raised: 10,
  sticky: 50,
  overlay: 100,
} as const;

export const metrics = {
  cartBarHeight: 48,
  cartPayWidth: 105,
  cartLogoSize: 44,
  cartLogoHitArea: 56,
  cartLogoOverhang: 10,
  cartControlSize: 22,
  cartControlMinWidth: 26,
  foodThumbSize: 57,
  foodRowMinHeight: 57,
  categoryRailWidth: 80,
  categoryItemMinHeight: 56,
  sectionHeaderHeight: 26,
  sellerHeaderHeight: 136,
  sellerAvatarSize: 64,
  sellerPhotoWidth: 120,
  sellerPhotoHeight: 90,
  sellerFavoriteWidth: 50,
  sellerFavoriteInset: 11,
  ratingSummaryWidth: 137,
  ratingAvatarSize: 28,
  ratingAvatarSmallSize: 12,
  ratingStarSize: 24,
  sellerStarSize: 36,
  bubbleMinWidth: 16,
  bubbleHeight: 16,
  splitHeight: 16,
  supportTagMinWidth: 12,
  tabBarHeight: 44,
} as const;

export const icons = {
  cart: {
    size: 20,
    basketTop: 6,
    basketLeft: 2,
    basketWidth: 15,
    basketHeight: 9,
    handleTop: 3,
    handleWidth: 5,
    handleHeight: 2,
    wheelSize: 3,
    wheelBottom: 1,
    wheelLeft: 4,
    wheelRight: 13,
  },
} as const;

export const starGlyphs = {
  24: { px: 10, gap: space[3] },
  36: { px: 15, gap: space[6] },
  48: { px: 20, gap: space[22] },
} as const;

export const supportTagSizes = {
  1: { height: space[12], font: fontSize.tiny },
  2: { height: space[16], font: fontSize.micro },
  3: { height: space[12], font: fontSize.tiny },
  4: { height: space[16], font: fontSize.micro },
} as const;

export const motion = {
  ball: { size: 16, duration: 400, ease: [0.49, -0.29, 0.75, 0.41] },
} as const;
