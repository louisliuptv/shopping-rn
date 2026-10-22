import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { QueryClient } from '@tanstack/react-query';
import { AppProviders } from '../src/app/providers/AppProviders';
import { GoodsScreen } from '../src/features/goods/screens/GoodsScreen';
import { useCartStore } from '../src/features/cart/store/cartStore';
import { FixtureShopRepository } from '../src/testing';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
}));

const testQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { gcTime: Infinity, retry: false } },
  });

const renderGoodsScreen = () =>
  render(
    <AppProviders
      repository={new FixtureShopRepository()}
      queryClient={testQueryClient()}
    >
      <GoodsScreen />
    </AppProviders>,
  );

describe('GoodsScreen', () => {
  beforeEach(() => {
    useCartStore.setState({ counts: {} });
  });

  it('renders the menu from the injected repository', async () => {
    renderGoodsScreen();

    expect(await screen.findByTestId('food-row-g0-f0')).toBeTruthy();
    expect(screen.getByTestId('category-0')).toBeTruthy();
    expect(screen.getByTestId('cart-bar')).toBeTruthy();
    expect(screen.getByTestId('cart-bar-pay')).toBeTruthy();
  });

  it('adds a dish to the cart from the row control', async () => {
    renderGoodsScreen();

    await screen.findByTestId('food-row-g0-f0');
    fireEvent.press(screen.getByTestId('cart-increase-g0-f0'));

    await waitFor(() => {
      expect(useCartStore.getState().counts['g0-f0']).toBe(1);
    });
    expect(screen.getByTestId('cart-count-g0-f0')).toBeTruthy();
  });
});
