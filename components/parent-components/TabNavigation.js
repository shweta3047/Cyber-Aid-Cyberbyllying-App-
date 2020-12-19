import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import {colors} from '../../constants/theme';
import HomeStackNavigation from '../parent-components/HomeStackNavigation';
import ReportScreen from '../../screens/parent-screens/ReportScreen';
import ProfileScreen from '../../screens/parent-screens/ProfileScreen';
import GuidanceScreen from '../../screens/parent-screens/GuidanceScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return <AntDesign name="home" size={size} color={color} />;
          } else if (route.name === 'Report') {
            return <MaterialIcons name="report" size={size} color={color} />;
          } else if (route.name === 'Profile') {
            return <FontAwesome name="user" size={size} color={color} />;
          } else if (route.name === 'Guidance') {
            return (
              <Entypo name="text-document-inverted" size={size} color={color} />
            );
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.tertiary,
        inactiveTintColor: colors.secondary,
        tabStyle: {
          padding: 8,
        },
        style: {
          backgroundColor: colors.primary,
          marginTop: 0,
          borderTopWidth: 0,
          elevation: 10,
          height: 60,
        },
        iconStyle: {
          margin: 8,
        },
      }}>
      <Tab.Screen name="Home" component={HomeStackNavigation} />
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="Guidance" component={GuidanceScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
