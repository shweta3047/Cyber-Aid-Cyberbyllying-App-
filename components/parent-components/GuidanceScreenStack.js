import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import GuidanceScreen from '../../screens/parent-screens/GuidanceScreen';
import GuideContent from '../../screens/parent-screens/GuideContent';

const GuidanceScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GuidanceScreen"
        component={GuidanceScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GuideContent"
        component={GuideContent}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default GuidanceScreenStack;
