import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, space, radius, borderWidth } from '../../app/theme/tokens';

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <View style={styles.center} testID="loading-state">
      <ActivityIndicator color={colors.blue} />
      <Text style={styles.hint}>{label}</Text>
    </View>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <View style={styles.center} testID="error-state">
      <Text style={styles.message}>{message}</Text>
      {onRetry ? (
        <Pressable style={styles.retry} onPress={onRetry} accessibilityRole="button">
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.empty} testID="empty-state">
      <Text style={styles.hint}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space[24] },
  empty: { paddingVertical: space[24], alignItems: 'center' },
  hint: { marginTop: space[8], fontSize: fontSize.small, color: colors.lightGrey },
  message: {
    fontSize: fontSize.small,
    color: colors.lightGrey,
    textAlign: 'center',
    marginBottom: space[12],
  },
  retry: {
    paddingHorizontal: space[16],
    paddingVertical: space[6],
    borderRadius: radius.pill,
    borderWidth: borderWidth.thin,
    borderColor: colors.blue,
  },
  retryText: { color: colors.blue, fontSize: fontSize.small },
});
