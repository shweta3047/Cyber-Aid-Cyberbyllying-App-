import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  ScrollView,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
  Image
} from 'react-native';
import {useSelector} from 'react-redux';
import SmsAndroid from 'react-native-get-sms-android';
import * as ReadSms from 'react-native-read-sms/ReadSms';
import BackgroundService from 'react-native-background-actions';
import axios from 'axios';
import {saveBadMessage} from '../../redux/actions/message';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {colors} from '../../constants/theme';
//import { TouchableOpacity } from 'react-native-gesture-handler';
const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 1000,
  },
};

var filter = {
  box: 'inbox',
  indexFrom: 0,
  maxCount: 10,
};

const HomeScreen = ({saveBadMessage}) => {
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    console.log(auth);
  });
  const bgTask = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({
      taskDesc: 'New ExampleTask description',
    });
  };

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      setInterval(() => {
        fetchMessageList();
      }, 60000);
    });
  };
  useEffect(() => {
    askReadMessagePermission();
    bgTask();
  }, []);

  const askReadMessagePermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'Permission to access your messages',
        message:
          'Permissions are required to fetch the messgages from this devices.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  };

  const findBadWords = obj => {
    //console.log('obj', obj.body);
    var text = obj.body;

    text = text.split('.').join(' ');
    text = text.split('/').join(' ');
    text = text.split(':').join(' ');

    fetch(
      `https://us-central1-mental-health-app-6edbd.cloudfunctions.net/app/api/detect/highlight-bad-words/${text}`,
      {
        method: 'GET',
      },
    )
      .then(res => res.text())
      .then(res => {
        if (res.length > 0) {
          console.log(obj);
          //console.log('Shit happened');
          saveBadMessage({
            id: obj._id,
            address: obj.address,
            message_body: obj.body,
            child_id: auth.user._id,
            parent_id: auth.user.parent,
          });
        }
      })
      .catch(err => console.log(err));
  };

  const fetchMessageList = () => {
    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        var arr = JSON.parse(smsList);
        findBadWords(arr[0]);
      },
    );
  };
  const showToast = () => {
    ToastAndroid.show(
      'Forward to selected emergency contacts',
      ToastAndroid.SHORT,
    );
  };
  const separator={
    animation:"slideInLeft",
    iterationCount:1,
    direction:"alternate",
    duration:2500
  }
  const topic={
    animation:"slideInLeft",
    style:styles.topicCard,
    iterationCount:1,
    direction:"alternate",
    duration:2000
  }
  const ans={
    animation:"slideInRight",
    style:styles.answerCard,
    iterationCount:1,
    direction:"alternate",
    duration:1500
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:colors.tertiary, marginBottom:10}}>
      <Image
        source={require('../../assets/homescreen.png')}
        style={{height: 200, width: 250, alignSelf: 'flex-start', backgroundColor:'transparent'}}
        resizeMode="cover"
      />
      <Text style={{width:150, alignSelf:'center', color:colors.blueGrey,fontSize:20, fontWeight:'bold', marginStart:5, fontStyle:'italic' }}>
        Your goto cyberbullying guide
      </Text>
      </View>
    <ScrollView >
      <Animatable.View
       {...topic}>
        <Text style={styles.topicText}>Teasing Vs Bullying</Text>
      </Animatable.View>
      <Animatable.View
       {...ans}>
        <Text style={styles.answerText}>
          Teasing Is a Type of Communication
        </Text>
      </Animatable.View>
      <Animatable.View
        {...ans}>
        <Text style={styles.answerText}>
          Bullying Is Meant to Hurt
        </Text>
      </Animatable.View>

      <TouchableOpacity onPress={showToast} >
        <Animatable.View
          {...ans}>
          <Text style={styles.readText}>
            Read More
          </Text>
        </Animatable.View>
      </TouchableOpacity>
      <Animatable.View style={styles.separator} {...separator}></Animatable.View>
      <Animatable.View
        {...topic}>
        <Text style={styles.topicText}>What Is Cyberbullying?</Text>
      </Animatable.View>
      <Animatable.View
        {...ans}>
        <Text style={styles.answerText}>
        Cyberbullying is when the use online technology to hurt others.
        </Text>
      </Animatable.View>
      <Animatable.View
        {...ans}>
        <Text style={styles.answerText}>
        In other words, the Internet is used to harass and embarrass people. It’s done on purpose and is usually ongoing.
        </Text>
      </Animatable.View>

      <TouchableOpacity onPress={showToast} >
        <Animatable.View
         {...ans}>
          <Text style={styles.readText}>
            Read More to look at some most common examples
          </Text>
        </Animatable.View>
      </TouchableOpacity>
      <Animatable.View style={styles.separator} {...separator}></Animatable.View>
      <Animatable.View
        {...topic}>
        <Text style={styles.topicText}>Are you a victim of Cyberbullying?</Text>
      </Animatable.View>
      <Animatable.View
        {...ans}>
        <Text style={styles.answerText}>
          1. Know that it’s not your fault.
        </Text>
      </Animatable.View>
      <Animatable.View
        {...ans}>
        <Text style={styles.answerText}>
          2. Don’t respond or retaliate.
        </Text>
      </Animatable.View>
      <Animatable.View
        {...ans}>
        <Text style={styles.answerText}>
          3. Save the evidence
        </Text>
      </Animatable.View>
      <Animatable.View
        {...ans}>
        <Text style={styles.answerText}>
          4. Use available tech tools.
        </Text>
      </Animatable.View>
      <Animatable.View
        {...ans}>
        <Text style={styles.answerText}>
          5. Protect your account.
        </Text>
      </Animatable.View>
      

      <TouchableOpacity onPress={showToast} >
        <Animatable.View
          {...ans}>
          <Text style={styles.readText}>
            Read More
          </Text>
        </Animatable.View>
      </TouchableOpacity>
      <Animatable.View style={styles.separator} {...separator}></Animatable.View>
      <Animatable.View
        {...topic}>
        <Text style={styles.topicText}>If someone you know is being bullied...</Text>
      </Animatable.View>
      <Animatable.View
        {...ans}>
        <Text style={styles.answerText}>
         Take action
        </Text>
      </Animatable.View>
      <Animatable.View
        {...ans}>
        <Text style={styles.answerText}>
        At the very least, help by not passing along a mean message and not giving positive attention to the person doing the bullying.
        </Text>
      </Animatable.View>

      <TouchableOpacity onPress={showToast} >
        <Animatable.View
          {...ans}>
          <Text style={styles.readText}>
            Read More
          </Text>
        </Animatable.View>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

export default connect(null, {saveBadMessage})(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: colors.primary,
  },
  topicCard: {
    //width:Dimensions.get('window').width-10,
    borderBottomEndRadius: 10,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    alignSelf: 'flex-start',
    backgroundColor: colors.lightLilac,
    padding: 5,
    marginStart: 10,
    marginTop: 5,
    marginEnd: 5,
    elevation: 20,
    borderWidth: 2,
    borderColor: colors.secondary,
    marginBottom:5
  },
  answerCard: {
    //width:Dimensions.get('window').width-10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    padding: 5,
    marginStart: 10,
    marginTop: 5,
    marginEnd: 5,
    elevation: 20,
    borderWidth: 2,
    borderColor: colors.pastelPink,
  },
  separator:{
    height:2,
    backgroundColor:colors.tertiary,
    width:Dimensions.get('window').width, 
    marginVertical: 15
  },
  readText:{
    textAlign: 'right', 
    fontSize: 15, 
    color: colors.white, 
    textDecorationLine:'underline'
  },
  topicText:{
    fontSize: 20
  },
  answerText:{
    textAlign: 'right', 
    fontSize: 15, 
    color: colors.white
  }
  
});
