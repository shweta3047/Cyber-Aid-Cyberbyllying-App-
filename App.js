import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TabNavigator from './components/child-components/TabNavigation';
import {Provider} from 'react-redux';
import store from './redux/store';
import AuthFlow from './AuthFlow';

export default function App() {
  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <AuthFlow />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
