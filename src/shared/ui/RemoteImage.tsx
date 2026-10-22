import React from 'react';
import { Image, StyleSheet, View, type ImageStyle, type StyleProp } from 'react-native';
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
  const [failed, setFailed] = React.useState(false);

  if (!uri || failed) {
    return (
      <View
        testID={testID ? `${testID}-placeholder` : undefined}
        style={[styles.placeholder, { width, height, borderRadius }, style]}
      />
    );
  }

  return (
    <Image
      testID={testID}
      source={{ uri }}
      style={[styles.image, { width, height, borderRadius }, style]}
      onError={() => setFailed(true)}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  image: { backgroundColor: colors.backgroundSSSS },
  placeholder: { backgroundColor: colors.backgroundSSSS },
});
