import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';


import { Icon } from '@/components/Icon';
import theme from '@/theme';
import { StyleSheet, View } from 'react-native';

export default function RootLayout() {

  const { Screen } = Drawer;

  return (
    <>
      <Drawer
        screenOptions={{
          drawerStyle: drawerStyle.wrapper,
          drawerItemStyle: drawerStyle.drawerItem,
          drawerActiveBackgroundColor: theme.colors.blueDefault,
          drawerLabelStyle: drawerStyle.drawerLabel,
          headerTitleStyle: { fontSize: 18 },
          drawerIcon: ({ focused }) => focused ? <Icon
            iconLib='Entypo'
            iconName='chevron-right'
            size={20}
            color='#FFF'
          /> : <View style={{ width: 20, height: 20 }} />
        }}>
        <Screen name="form" options={{
          drawerLabel: "Formulário de riscos",
          headerTitle: "Formulário de riscos",
          headerStyle: {
            backgroundColor: theme.colors.blueDefault,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          },
          headerTintColor: theme.colors.white
        }} />
        <Screen name="legends" options={{
          drawerLabel: "Legendas de riscos",
          headerTitle: "Apresentação",
          headerStyle: {
            backgroundColor: theme.colors.blueDefault,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          },
          headerTintColor: theme.colors.white
        }} />

      </Drawer>
      <StatusBar style="light" />
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
