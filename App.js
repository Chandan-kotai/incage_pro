import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Splash from './src/screens/Splash';
import MapIncage from './src/screens/stack_nav/MapIncage';
import Scanner from './src/screens/stack_nav/Scanner';
import SignIn from './src/screens/stack_nav/SignIn';
import SplashSecond from './src/screens/SplashSecond';
import { enableLatestRenderer } from 'react-native-maps';
import ConnectToDevice from './src/screens/stack_nav/ConnectToDevice';
import DeliveryList from './src/screens/stack_nav/DeliveryList';

// map render
enableLatestRenderer();

const RootStack = createNativeStackNavigator()

const App = () => {

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName='splash'>
        <RootStack.Screen options={{ headerShown: false }} name="splash" component={Splash} />
        <RootStack.Screen options={{ headerShown: false }} name="splashsecond" component={SplashSecond} />
        <RootStack.Screen options={{ headerShown: false }} name="signin" component={SignIn} />
        <RootStack.Screen options={{ headerShown: false }} name="scanner" component={Scanner} />
        <RootStack.Screen options={{ headerShown: false }} name="deliverylist" component={DeliveryList} />
        <RootStack.Screen options={{ headerShown: false }} name="map" component={MapIncage} />
        <RootStack.Screen options={{ headerShown: false }} name="connect" component={ConnectToDevice} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
