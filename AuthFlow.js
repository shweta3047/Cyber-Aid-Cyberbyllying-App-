import React, {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigationChild from './components/child-components/TabNavigation';
import TabNavigationParent from './components/parent-components/TabNavigation';
import LoginStackNavigation from './components/parent-components/LoginStackNavigation';
import { NeuView } from 'react-native-neu-element';
import {View, Image, Dimensions} from 'react-native';
//import { color } from 'react-native-reanimated';
import { colors } from './constants/theme';

const AuthFlow = () => {
  const auth = useSelector(state => state.auth);
  const[splashScreenVisibilty, setSplashScreenVisibilty]=useState(true)
  useEffect(() => {
    console.log(auth);
  });
  useEffect(()=>{
    setTimeout(function(){  
      hideSplashScreen();  
    }, 5000);  
  })
  const hideSplashScreen=()=>{
    setSplashScreenVisibilty(false)

  }
  return (
    splashScreenVisibilty ?(
      <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, backgroundColor:colors.tertiary, justifyContent:'center', flex:1}}>
            
      
    
    <Image source={require('./assets/splash-transparent.png')} style={{height:500, width:500, alignSelf:'center'}} resizeMode='cover'/>
 

 
  </View>
    ):(
    <NavigationContainer>
      {!auth.isLogin ? (
        <LoginStackNavigation />
      ) : auth.parent ? (
        <TabNavigationParent />
      ) : (
        <TabNavigationChild />
      )}
    </NavigationContainer>
  ));
};

export default AuthFlow;
