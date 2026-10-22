jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-safe-area-context', () => {
  const mock = require('react-native-safe-area-context/jest/mock');
  return mock.default ?? mock;
});

jest.mock('@react-native-vector-icons/material-design-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  const Icon = ({ name, color, size }) =>
    React.createElement(Text, { style: { color, fontSize: size } }, name);
  return { __esModule: true, default: Icon };
});
