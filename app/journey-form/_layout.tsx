import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const { Screen } = Stack;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Screen name='index' />
      <Screen name='result/index' />
    </Stack>
  );
}
