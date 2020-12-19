import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Profile from '../../screens/child-screens/ProfileScreen'
import EditProfileScreen from '../../screens/child-screens/EditProfileScreen'
import EditEmergencyContact from '../../screens/child-screens/EditEmergencyContact'
import AddEmergencyContact from '../../screens/child-screens/AddEmergencyContact'



const ProfileStackNavigator = () => {
    return (
      <Stack.Navigator initialRouteName='Profile'>
       
        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='EditProfile'
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='EditEmergencyContact'
          component={EditEmergencyContact}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name='AddEmergencyContact'
          component={AddEmergencyContact}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    );
  };
  
  export default ProfileStackNavigator
  