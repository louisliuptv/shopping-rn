import React from 'react';
import { Image, StyleSheet, View, type ImageStyle, type StyleProp } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';
import { colors } from '../../app/theme/tokens';

interface RemoteImageProps {
  uri?: string;
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ImageStyle>;
  testID?: string;
}

export function RemoteImage({
  uri,
  width = '100%',
  height,
  borderRadius,
  style,
  testID,
}: RemoteImageProps) {
  const theme = useTheme();
  const [failed, setFailed] = React.useState(false);
  const placeholder = { backgroundColor: theme.colors.surfaceVariant };

  if (!uri || failed) {
    return (
      <View
        testID={testID ? `${testID}-placeholder` : undefined}
        style={[styles.placeholder, placeholder, { width, height, borderRadius }, style]}
      >
        <Icon source="image-off-outline" size={20} color={theme.colors.onSurfaceVariant} />
      </View>
    );
  }

  return (
    <Image
      testID={testID}
      source={{ uri }}
      style={[styles.image, { width, height, borderRadius }, placeholder, style]}
      onError={() => setFailed(true)}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  image: { backgroundColor: colors.backgroundSSSS },
  placeholder: { alignItems: 'center', justifyContent: 'center' },
});
