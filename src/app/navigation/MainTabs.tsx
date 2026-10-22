import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors, fontSize } from '../theme/tokens';
import { GoodsScreen } from '../../features/goods/screens/GoodsScreen';
import { RatingsScreen } from '../../features/ratings/screens/RatingsScreen';
import { SellerScreen } from '../../features/seller/screens/SellerScreen';
import type { MainTabParamList } from './types';

const Tab = createMaterialTopTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        swipeEnabled: true,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 44,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.rowLine,
        },
        tabBarIndicatorStyle: { backgroundColor: colors.blue, height: 2 },
        tabBarLabelStyle: {
          fontSize: fontSize.medium,
          fontWeight: '400',
          textTransform: 'none',
        },
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.darkGrey,
        tabBarPressColor: 'transparent',
      }}
    >
      <Tab.Screen name="Goods" component={GoodsScreen} options={{ title: 'Menu' }} />
      <Tab.Screen name="Ratings" component={RatingsScreen} options={{ title: 'Reviews' }} />
      <Tab.Screen name="Seller" component={SellerScreen} options={{ title: 'Merchant' }} />
    </Tab.Navigator>
  );
}
