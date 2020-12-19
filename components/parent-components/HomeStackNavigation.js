import React from 'react';
import HomeScreen from '../../screens/parent-screens/HomeScreen';
import TweetScreen from './Twitter';
import NewsScreen from './News';
import ExpandNews from '../parent-components/NewsExpand';

import Statistics from './Statistics';

import {createStackNavigator} from '@react-navigation/stack';
import FetchedSMS from './FetchedSMS';

const Stack = createStackNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tweets"
        component={TweetScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewsExpand"
        component={ExpandNews}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Statistics"
        component={Statistics}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Fetched-SMS"
        component={FetchedSMS}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
