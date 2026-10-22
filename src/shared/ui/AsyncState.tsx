import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { space } from '../../app/theme/tokens';

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  const theme = useTheme();
  return (
    <View style={styles.center} testID="loading-state">
      <ActivityIndicator animating color={theme.colors.primary} />
      <Text variant="bodyMedium" style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
        {label}
      </Text>
    </View>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  const theme = useTheme();
  return (
    <View style={styles.center} testID="error-state">
      <Text variant="bodyMedium" style={[styles.message, { color: theme.colors.onSurfaceVariant }]}>
        {message}
      </Text>
      {onRetry ? (
        <Button mode="outlined" icon="refresh" onPress={onRetry}>
          Retry
        </Button>
      ) : null}
    </View>
  );
}

export function EmptyState({ message }: { message: string }) {
  const theme = useTheme();
  return (
    <View style={styles.empty} testID="empty-state">
      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space[24] },
  empty: { paddingVertical: space[24], alignItems: 'center' },
  hint: { marginTop: space[12] },
  message: { textAlign: 'center', marginBottom: space[12] },
});
