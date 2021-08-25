import { StatusBar } from 'expo-status-bar';
import React from 'react';
import FlashMessage from 'react-native-flash-message';

import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar style="light-content" backgroundColor="blue" />
      <Routes />
      <FlashMessage position="center" />
    </>
  );
}
