import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './Components/SignIn';
import Order from './Components/Order';
import SignUp from './Components/SignUp';
import CreateOrder from './Components/CreateOrder';
import ConfirmOrders from './Components/ConfirmOrders';
import {Provider as PaperProvider, } from 'react-native-paper';
import Login from './Components/Login';
 


const App = () => {
  const Stack = createNativeStackNavigator();
  return (
     <PaperProvider>
    <NavigationContainer>
        <Stack.Navigator initialRouteName='SignIn'>
        <Stack.Screen name="Login" component={Login}   options={{headerShown: false,}}/>
        <Stack.Screen name="SignIn" component={SignIn}   options={{headerShown: false,}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false,}} />
        <Stack.Screen name="Order" component={Order}options={{headerShown: false,}}/>
        <Stack.Screen name="CreateOrder" component={CreateOrder} />
        <Stack.Screen name="ConfirmOrders" component={ConfirmOrders} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
