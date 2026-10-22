import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize } from '../../app/theme/tokens';

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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  empty: { paddingVertical: 24, alignItems: 'center' },
  hint: { marginTop: 8, fontSize: fontSize.small, color: colors.lightGrey },
  message: {
    fontSize: fontSize.small,
    color: colors.lightGrey,
    textAlign: 'center',
    marginBottom: 12,
  },
  retry: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.blue,
  },
  retryText: { color: colors.blue, fontSize: fontSize.small },
});
