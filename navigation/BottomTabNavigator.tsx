import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native'
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabScreens/TabOneScreen';
import TabTwoScreen from '../screens/TabScreens/TabTwoScreen';
import TabThreeScreen from '../screens/TabScreens/TabThreeScreen'
import NotificationScreen from '../screens/Notification';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, AuthParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import createMenu from '../screens/CreateMenu';
import MenuView from '../screens/ShopMenuView/index';
import OrderView from '../screens/OrderView/index'
import Profile from '../screens/Profile/index'
import ViewShop from '../screens/ViewShop';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const setUserType = AsyncStorage.getItem('userToken')


  return (
    <BottomTab.Navigator initialRouteName="TabOne" tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
          title: 'Home',
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-notifications" color={color} />,
          title: 'Notification',
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-person" color={color} />,
          title: 'Profile',
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerTitle: 'Notification', headerTitleContainerStyle: { alignItems: 'center' } }}
      />
      <TabOneStack.Screen
        name="Order"
        component={OrderView}
        options={({ route }) => ({ headerTitle: route.params.title })}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: 'Home', headerTitleContainerStyle: { alignItems: 'center' } }}
      />
      <TabTwoStack.Screen
        name="Foods"
        component={ViewShop}
        options={({ route }) => ({ headerTitle: route.params.name })}
      />
      <TabTwoStack.Screen name="CreateMenu" component={createMenu} options={{ headerTitle: 'Make a Menu' }} />
      <TabTwoStack.Screen
        name="MenuView"
        component={MenuView}
        options={({ route }) => ({ headerTitle: route.params.title })}
      />
      {/* <TabTwoStack.Screen name="AddProducts" component={AddProducts} options={{ headerTitle: 'Add Products' }} /> */}
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerTitle: 'Profile', headerTitleContainerStyle: { alignItems: 'center' } }}
      />
      {/* <TabTwoStack.Screen name="AddProducts" component={AddProducts} options={{ headerTitle: 'Add Products' }} /> */}
    </TabThreeStack.Navigator>
  );
}

