import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { Bubble } from '../src/shared/ui/Bubble';
import { Star } from '../src/shared/ui/Star';
import { CartBar } from '../src/features/cart/components/CartBar';
import { CartControl } from '../src/features/cart/components/CartControl';
import { useCartStore } from '../src/features/cart/store/cartStore';
import { RatingFilter } from '../src/features/ratings/components/RatingFilter';
import { paperTheme } from '../src/app/theme/paperTheme';
import type { CartSummary } from '../src/domain/usecases/cartUseCases';

const summary = (overrides: Partial<CartSummary> = {}): CartSummary => ({
  entries: [],
  totalCount: 0,
  totalPrice: 0,
  payDesc: '¥20 min order',
  payEnabled: false,
  ...overrides,
});

const renderWithPaper = (ui: React.ReactElement) =>
  render(<PaperProvider theme={paperTheme}>{ui}</PaperProvider>);

describe('Star', () => {
  it('draws five icons with whole stars filled', () => {
    renderWithPaper(<Star score={3} size={24} />);
    expect(screen.getAllByTestId(/^star-glyph-/)).toHaveLength(5);
    expect(screen.getAllByTestId(/^star-glyph-\d-on$/)).toHaveLength(3);
    expect(screen.getAllByTestId(/^star-glyph-\d-off$/)).toHaveLength(2);
  });

  it('draws a half icon when the score has a half star', () => {
    renderWithPaper(<Star score={4.5} size={36} />);
    expect(screen.getAllByTestId(/^star-glyph-/)).toHaveLength(5);
    expect(screen.getAllByTestId(/^star-glyph-\d-half$/)).toHaveLength(1);
  });
});

describe('Bubble', () => {
  it('renders nothing at zero', () => {
    renderWithPaper(<Bubble count={0} testID="bubble" />);
    expect(screen.queryByTestId('bubble')).toBeNull();
  });

  it('renders the count and caps at 99+', () => {
    const { rerender } = renderWithPaper(<Bubble count={7} testID="bubble" />);
    expect(screen.getByText('7')).toBeTruthy();

    rerender(
      <PaperProvider theme={paperTheme}>
        <Bubble count={150} testID="bubble" />
      </PaperProvider>,
    );
    expect(screen.getByText('99+')).toBeTruthy();
  });
});

describe('RatingFilter', () => {
  const counts = { all: 24, positive: 20, negative: 4 };

  it('reports the selected tab', () => {
    const onChangeFilter = jest.fn();
    renderWithPaper(
      <RatingFilter
        filter="all"
        counts={counts}
        onlyContent
        onChangeFilter={onChangeFilter}
        onToggleOnlyContent={jest.fn()}
      />,
    );

    fireEvent.press(screen.getByTestId('rating-filter-negative'));
    expect(onChangeFilter).toHaveBeenCalledWith('negative');
  });

  it('toggles the "only with content" switch', () => {
    const onToggleOnlyContent = jest.fn();
    renderWithPaper(
      <RatingFilter
        filter="all"
        counts={counts}
        onlyContent={false}
        onChangeFilter={jest.fn()}
        onToggleOnlyContent={onToggleOnlyContent}
      />,
    );

    fireEvent.press(screen.getByTestId('rating-filter-only-content'));
    expect(onToggleOnlyContent).toHaveBeenCalledTimes(1);
  });
});

describe('CartControl', () => {
  beforeEach(() => {
    useCartStore.setState({ counts: {} });
  });

  it('increments and decrements through the store', () => {
    renderWithPaper(<CartControl foodId="g0-f0" />);

    expect(screen.queryByTestId('cart-count-g0-f0')).toBeNull();

    fireEvent.press(screen.getByTestId('cart-increase-g0-f0'));
    expect(useCartStore.getState().counts['g0-f0']).toBe(1);
    expect(screen.getByTestId('cart-count-g0-f0').props.children).toBe(1);

    fireEvent.press(screen.getByTestId('cart-decrease-g0-f0'));
    expect(useCartStore.getState().counts['g0-f0']).toBeUndefined();
  });
});

describe('CartBar', () => {
  beforeEach(() => {
    useCartStore.setState({ counts: {} });
  });

  it('shows the min-order hint and blocks payment when empty', () => {
    renderWithPaper(<CartBar summary={summary()} deliveryPrice={4} bottomInset={0} />);

    expect(screen.getByText('¥20 min order')).toBeTruthy();
    fireEvent.press(screen.getByTestId('cart-bar-pay'));
    expect(screen.queryByText('You need to pay ¥20')).toBeNull();
  });

  it('opens the payment dialog once the min order price is reached', () => {
    renderWithPaper(
      <CartBar
        summary={summary({
          totalCount: 2,
          totalPrice: 28,
          payDesc: 'Checkout',
          payEnabled: true,
        })}
        deliveryPrice={4}
        bottomInset={0}
      />,
    );

    expect(screen.getByText('Checkout')).toBeTruthy();
    fireEvent.press(screen.getByTestId('cart-bar-pay'));
    expect(screen.getByText('You need to pay ¥28')).toBeTruthy();
  });
});
