import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Bubble } from '../src/shared/ui/Bubble';
import { Star } from '../src/shared/ui/Star';
import { CartBar } from '../src/features/cart/components/CartBar';
import { CartControl } from '../src/features/cart/components/CartControl';
import { useCartStore } from '../src/features/cart/store/cartStore';
import { RatingFilter } from '../src/features/ratings/components/RatingFilter';
import type { CartSummary } from '../src/domain/usecases/cartUseCases';

const summary = (overrides: Partial<CartSummary> = {}): CartSummary => ({
  entries: [],
  totalCount: 0,
  totalPrice: 0,
  payDesc: '¥20 min order',
  payEnabled: false,
  ...overrides,
});

describe('Star', () => {
  it('draws five glyphs for whole stars', () => {
    render(<Star score={3} size={24} />);
    expect(screen.getAllByText('★')).toHaveLength(8);
  });

  it('draws an extra clipped glyph for the half star', () => {
    render(<Star score={4.5} size={36} />);
    expect(screen.getAllByText('★')).toHaveLength(10);
  });
});

describe('Bubble', () => {
  it('renders nothing at zero', () => {
    render(<Bubble count={0} testID="bubble" />);
    expect(screen.queryByTestId('bubble')).toBeNull();
  });

  it('renders the count and caps at 99+', () => {
    const { rerender } = render(<Bubble count={7} testID="bubble" />);
    expect(screen.getByText('7')).toBeTruthy();

    rerender(<Bubble count={150} testID="bubble" />);
    expect(screen.getByText('99+')).toBeTruthy();
  });
});

describe('RatingFilter', () => {
  const counts = { all: 24, positive: 20, negative: 4 };

  it('reports the selected tab', () => {
    const onChangeFilter = jest.fn();
    render(
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
    render(
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
    render(<CartControl foodId="g0-f0" />);

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
    const onPay = jest.fn();
    render(<CartBar summary={summary()} deliveryPrice={4} bottomInset={0} />);

    expect(screen.getByText('¥20 min order')).toBeTruthy();
    fireEvent.press(screen.getByTestId('cart-bar-pay'));
    expect(onPay).not.toHaveBeenCalled();
    expect(screen.queryByText('You need to pay ¥20')).toBeNull();
  });

  it('opens the payment dialog once the min order price is reached', () => {
    render(
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
