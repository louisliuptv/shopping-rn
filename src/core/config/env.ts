import { Platform } from 'react-native';

const HOST = Platform.select({
  android: '10.0.2.2',
  default: 'localhost',
});

export const env = {
  apiBaseUrl: `http://${HOST}:8900/api`,
  requestTimeoutMs: 8000,
  useFixtureFallback: true,
} as const;
