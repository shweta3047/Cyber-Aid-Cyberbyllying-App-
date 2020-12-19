import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/parent-screens/Login';
import SignupScreen from '../../screens/parent-screens/Signup';
import LoginScreenChild from '../../screens/child-screens/Login';
import SignupScreenChild from '../../screens/child-screens/Signup';
import UserTypeSelectionScreen from './UserTypeSelectionScreen';
const Stack = createStackNavigator();

const LoginStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={UserTypeSelectionScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Login-Child" component={LoginScreenChild} />
      <Stack.Screen name="Signup-Child" component={SignupScreenChild} />
    </Stack.Navigator>
  );
};

export default LoginStackNavigation;
