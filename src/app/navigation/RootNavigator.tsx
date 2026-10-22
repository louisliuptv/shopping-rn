import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FoodDetailScreen } from '../../features/goods/screens/FoodDetailScreen';
import { MainScreen } from './MainScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen
        name="FoodDetail"
        component={FoodDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
