import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient } from '@tanstack/react-query';
import { AppProviders } from '../src/app/providers/AppProviders';
import { RootNavigator } from '../src/app/navigation/RootNavigator';
import { useCartStore } from '../src/features/cart/store/cartStore';
import { FixtureShopRepository } from '../src/testing';

const renderApp = () =>
  render(
    <AppProviders
      repository={new FixtureShopRepository()}
      queryClient={
        new QueryClient({
          defaultOptions: { queries: { gcTime: Infinity, retry: false } },
        })
      }
    >
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppProviders>,
  );

describe('App', () => {
  beforeEach(() => {
    useCartStore.setState({ counts: {} });
  });

  it('renders the header and the goods tab on launch', async () => {
    renderApp();

    await waitFor(() => expect(screen.getByTestId('seller-header')).toBeTruthy());
    expect(await screen.findByTestId('goods-screen')).toBeTruthy();
    expect(await screen.findByTestId('food-row-g0-f0')).toBeTruthy();
  });

  it('navigates to the reviews tab', async () => {
    renderApp();

    await screen.findByTestId('goods-screen');
    fireEvent.press(screen.getAllByText('Reviews')[0]);

    expect(await screen.findByTestId('ratings-screen')).toBeTruthy();
  });

  it('opens a food detail screen and adds the dish to the cart', async () => {
    renderApp();

    await screen.findByTestId('food-row-g0-f0');
    fireEvent.press(screen.getByTestId('food-row-g0-f0'));

    expect(await screen.findByTestId('food-detail-screen')).toBeTruthy();
    fireEvent.press(screen.getByTestId('food-detail-buy'));

    await waitFor(() => {
      expect(useCartStore.getState().counts['g0-f0']).toBe(1);
    });
  });
});
