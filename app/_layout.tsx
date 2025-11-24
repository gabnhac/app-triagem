import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import theme from '../theme';

import { Icon } from '@/components/Icon';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet, View } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const { Screen } = Drawer;

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer
          screenOptions={{
            drawerStyle: drawerStyle.wrapper,
            drawerItemStyle: drawerStyle.drawerItem,
            drawerActiveBackgroundColor: theme.colors.blueDefault,
            drawerLabelStyle: drawerStyle.drawerLabel,
            drawerIcon: ({ focused }) => focused ? <Icon
              iconLib='Entypo'
              iconName='chevron-right'
              size={20}
              color='#FFF'
            /> : <View style={{ width: 20, height: 20 }} />
          }}>
          <Screen name="index" options={{
            drawerLabel: "Apresentação",
            headerTitle: "Apresentação",
            headerStyle: {
              backgroundColor: theme.colors.blueDefault,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10
            },
            headerTintColor: theme.colors.white
          }} />
          <Screen name="journey-form" options={{
            drawerLabel: "Calcule possíveis riscos",
            headerTitle: "Formulário de riscos",
            headerStyle: {
              backgroundColor: theme.colors.blueDefault,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10
            },
            headerTintColor: theme.colors.white
          }} />
        </Drawer>
        <StatusBar style="auto" />
      </ThemeProvider>
      <Toast position='bottom' />
    </>

  );
}

const drawerStyle = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.blueDefault
  },
  drawerItem: {
    borderRadius: 0,
  },
  drawerLabel: {
    color: 'white',
  }
})
