import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';
import { metrics, borderWidth } from '../theme/tokens';
import { GoodsScreen } from '../../features/goods/screens/GoodsScreen';
import { RatingsScreen } from '../../features/ratings/screens/RatingsScreen';
import { SellerScreen } from '../../features/seller/screens/SellerScreen';
import type { MainTabParamList } from './types';

const Tab = createMaterialTopTabNavigator<MainTabParamList>();

export function MainTabs() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        swipeEnabled: true,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          height: metrics.tabBarHeight,
          elevation: 2,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        tabBarIndicatorStyle: { backgroundColor: theme.colors.primary, height: borderWidth.thick },
        tabBarLabelStyle: {
          ...theme.fonts.labelLarge,
          textTransform: 'none',
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarPressColor: theme.colors.surfaceVariant,
      }}
    >
      <Tab.Screen name="Goods" component={GoodsScreen} options={{ title: 'Menu' }} />
      <Tab.Screen name="Ratings" component={RatingsScreen} options={{ title: 'Reviews' }} />
      <Tab.Screen name="Seller" component={SellerScreen} options={{ title: 'Merchant' }} />
    </Tab.Navigator>
  );
}
