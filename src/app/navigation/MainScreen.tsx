import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appConfig } from '../config/appConfig';
import { colors } from '../theme/tokens';
import { useSeller } from '../../features/seller/hooks/useSeller';
import { SellerHeader } from '../../features/seller/components/SellerHeader';
import { MainTabs } from './MainTabs';
import type { RootStackParamList } from './types';

export function MainScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const sellerQuery = useSeller(appConfig.sellerId);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <SellerHeader
          seller={sellerQuery.data}
          onPress={() => navigation.navigate('Main', { screen: 'Seller' })}
        />
      </View>
      <MainTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  header: { backgroundColor: colors.background },
});
