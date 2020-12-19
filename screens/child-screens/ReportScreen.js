import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
  YellowBox,
  Modal,
  ScrollView
} from 'react-native';
import {colors} from '../../constants/theme.js';
//import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableHighlight} from 'react-native-gesture-handler';
import EmailTag from '../../components/parent-components/selected_emails_tag';
import AttachmentTag from '../../components/parent-components/attachments_tag';
import BrickList from 'react-native-masonry-brick-list';
import * as ImagePicker from 'expo-image-picker';
import {
  Asset,
  Constants,
  FileSystem,
  Permissions,
  Videos,
} from 'react-native-unimodules';
//import ImagePicker from 'react-native-image-picker';
//import storage from '@react-native-firebase/storage';
import * as firebase from 'firebase';
import {useSelector} from 'react-redux';
//import firebaseConfig from '../../constants/firebase_config'

//import ImgToBase64 from 'react-native-image-base64';

//const firebaseConfig = { ... }
import _ from 'lodash';
import AnimatedLoader from 'react-native-animated-loader';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const ReportScreen = () => {
  const auth = useSelector(state => state.auth);
  const [pressedStateSecretUser, setPressedStateSecretUser] = useState(false);
  const [pressedStateForward, setPressedStateForward] = useState(true);
  //const [secretUserStyle, setSecretUserStyle]=useState(styles.configIcon)
  const [emailItem, setEmailItem] = useState({id: '', isSelected: null});
  const [fileItem, setFileItem] = useState({filename: '', type: '', uri: null});
  //const[emergencyContacts, setEmergencyContacts]=useState([{id:"medhavi.15@gmail.com", isSelected:true}, {id:"medhavi.16@gmail.com",isSelected:true}])
  const [selectedEmails, setSelectedEmails] = useState([
    {id: 'medhavi.srivastava16@gmail.com', isSelected: true},
    {id: 'imt_2018050@iiitm.ac.in', isSelected: true},
    {id: 'tomarviii88@gmail.com', isSelected: true},
    {id: 'shweta3047@gmail.com', isSelected: true},
  ]);
  const [filesSelected, addToFilesSelected] = useState([]);
  const [complaintText, setComplaintText] = useState('');
  const [isSending, setSendingState] = useState(false);
  const [teachers, setTeachers] = useState([{id:'srathore@gmail.com'},{id:'ranjan@gmail.com'}, {id:'prasad@gmail.com'}, {id:'chanak@gmail.com'}, {id:'js@gmail.com'}])

  useEffect(() => {
    console.log(auth);
  }, []);

  //Generate random string of length =7
  function makeid() {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < Math.floor(Math.random() * 5) + 3; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

 

  //Pick image from gallery
  const pickImageFromGallery = async () => {
    const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      const data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });
      //console.log(data);
      //ImgToBase64.getBase64String(data.base64, (err, base64string) => console.log("base64=="+base64string));
      if (!data.cancelled) {
        let content = data.uri.split('.');
        let newFile = {
          ...data,
          path: data.uri,
          filename: makeid() + '.' + content[content.length - 1],
        };
        //setPicture(newFile.uri);
        setFileItem(newFile);
        addToFilesSelected(files => [...files, fileItem]);
        console.log('uri=' + newFile.uri + ' ' + 'name=' + newFile.filename);
      }
    } else {
      Alert.alert('You need to give permission to work');
      navigation.navigate('Home');
    }
  };

  //Pick image from camera
  const pickImageFromCamera = async () => {
    const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      const data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      console.log(data);
      if (!data.cancelled) {
        let content = data.uri.split('.');
        let newFile = {
          ...data,
          path: data.uri,
          filename: makeid() + '.' + content[content.length - 1],
        };
        //setPicture(newFile.uri);
        setFileItem(newFile);
        addToFilesSelected(files => [...files, fileItem]);
        console.log('uri=' + newFile.uri + ' ' + 'name=' + newFile.filename);
      }
    } else {
      Alert.alert('You need to give permission to work');
      navigation.navigate('Home');
    }
  };

  //pick video file
  const pickVideoFromGallery = async () => {
    const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      const data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      console.log(data);
      if (!data.cancelled) {
        let content = data.uri.split('.');
        let newFile = {
          ...data,
          path: data.uri,
          filename: makeid() + '.' + content[content.length - 1],
        };
        //setPicture(newFile.uri);
        setFileItem(newFile);
        addToFilesSelected(files => [...files, fileItem]);
        console.log('uri=' + newFile.uri + ' ' + 'name=' + newFile.name);
      }
    } else {
      Alert.alert('You need to give permission to work');
      navigation.navigate('Home');
    }
  };

  //On Anonymous User Press Actions
  const onSecretUserPress = () => {
    setPressedStateSecretUser(!pressedStateSecretUser);
    if (!pressedStateSecretUser) {
      ToastAndroid.show(
        'Send to vounteer to hide identity',
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show(
        'Directly send complaint to the portal with your identity',
        ToastAndroid.SHORT,
      );
    }
  };

  //On Forward Icon Press Actions
  const onForwardPress = () => {
    setPressedStateForward(!pressedStateForward);
    console.log(pressedStateForward);
    if (!pressedStateSecretUser) {
      ToastAndroid.show(
        'Forward to selected emergency contacts',
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show(
        "Don't forward to selected emergency contacts",
        ToastAndroid.SHORT,
      );
    }
  };

  const uploadImage = async file => {
    const path = 'evidenvce/' + file.filename;

    return new Promise(async (res, rej) => {
      const response = await fetch(file.uri);
      const blob = await response.blob();

      if (!firebase.apps.length) {
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional

        firebase.initializeApp({
          apiKey: 'AIzaSyCtSsfVM6wTCT1qYFUn6Derr14Y4uKr9jk',
          authDomain: 'cyberbullyingreactnativecli.firebaseapp.com',
          databaseURL:
            'https://cyberbullyingreactnativecli-default-rtdb.firebaseio.com',
          projectId: 'cyberbullyingreactnativecli',
          storageBucket: 'cyberbullyingreactnativecli.appspot.com',
          messagingSenderId: '41669860478',
          appId: '1:41669860478:web:d6f94e56844940dedf0c2f',
          measurementId: 'G-X91X874BTD',
        });
      } else {
        firebase.app(); // if already initialized, use that one
      }
      let upload = firebase
        .storage()
        .ref(path)
        .put(blob);

      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {},
        err => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          file.path = url;
          console.log('download url=' + file.path);
          res(url);
        },
      );
    });
  };

  const uploadAll = () => {
    var i;
    setSendingState(true);
    for (i = 0; i < filesSelected.length; i++) {
      uploadImage(filesSelected[i]);
    }
    submitHandler();
  };

  //send complaint
  const submitHandler = async () => {
    //uploadAll()
    console.log('sending...');
    fetch('https://cyber-bullying1.herokuapp.com/api/mailing/report', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        pressedStateSecretUser,
        pressedStateForward,
        selectedEmails,
        filesSelected,
        complaintText,
        name: auth.user.name,
        email: auth.user.email,
        phone: '9102920020',
      }),
    })
      .then(res => res.json())
      .then(data => {
        setSendingState(false);
        ToastAndroid.show('Forwarded complaint', ToastAndroid.SHORT);
        console.log('sent successfully');
      })
      .catch(err => {
        setSendingState(false);
        console.log(err);
      });
  };

  //props of secret user button
  var touchPropsSecretUser = {
    activeOpacity: 1,
    style: pressedStateSecretUser
      ? styles.configIconSelected
      : styles.configIcon,
    onPress: () => {
      onSecretUserPress();
    }, // <-- "onPress" is apparently required
  };

  //props of forward button
  var touchPropsForward = {
    activeOpacity: 1,
    style: pressedStateForward ? styles.forwardActive : styles.forwardInactive,
    onPress: () => {
      onForwardPress();
    },
  };

  //render Attachment Item
  const renderView = prop => {
    return (
      <AttachmentTag itemData={prop} list={filesSelected} key={prop.filename} />
    );
  };

const renderTeachers = prop =>{
  return(
<TouchableOpacity style={styles.teacherContainer}>
            <Text style={{textAlign:"center", alignSelf:'center', justifyContent:'center'}}>
                {prop.id}
            </Text>   
        </TouchableOpacity>
  );
}
  //main render
  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={isSending}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewLoader}>
            <AnimatedLoader
              visible={isSending}
              overlayColor="rgba(255,255,255,0.75)"
              source={require('../../assets/sendmailloader.json')}
              animationStyle={styles.lottie}
              speed={1}
            />
          </View>
        </View>
      </Modal>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* top row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 40,
            width: Dimensions.get('window').width - 10,
            height: 50,
          }}>
          <TouchableOpacity {...touchPropsSecretUser}>
            <Icon name="user-secret" size={25} color={colors.white} />
          </TouchableOpacity>
          <Text style={{fontWeight: '700', color: colors.white, fontSize: 30}}>
            File a report
          </Text>
          <TouchableOpacity
            style={{
              elevation: 10,
              marginStart: 10,
              alignSelf: 'flex-end',
              width: 50,
              height: 50,
              borderRadius: 30,
              backgroundColor: colors.primary,
              borderColor: colors.lightBlueGrey,
              borderWidth: 1.5,
              paddingHorizontal: 10,
              paddingVertical: 8,
              justifyContent: 'center',
            }}>
            <Icon name="phone" size={25} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Write complaint text input */}
        <TextInput
          placeholder="Type here...."
          style={styles.textInput}
          multiline={true}
          numberOfLines={12}
          underlineColorAndroid="transparent"
          onChangeText={text => {
            setComplaintText(text);
          }}
        />

        {/* Attachments icons area */}
        <View
          style={{
            flexDirection: 'row',
            elevation: 10,
            alignSelf: 'center',
            width: Dimensions.get('window').width - 40,
            height: 60,
            borderRadius: 35,
            backgroundColor: colors.blueGrey,
            borderColor: colors.blueGrey,
            borderWidth: 1,
            justifyContent: 'center',
          }}>
          {/* Attachment symbol icon */}
          <Icon
            name="paperclip"
            size={25}
            color={colors.secondary}
            style={{alignSelf: 'center', color: colors.primary}}
          />

          {/* Insert Image from gallery Icon */}
          <TouchableOpacity
            onPress={pickImageFromGallery}
            style={styles.attachmentIcon}>
            <Icon
              name="images"
              size={25}
              color={colors.secondary}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>

          {/* Insert Image from camera icon */}
          <TouchableOpacity
            onPress={pickImageFromCamera}
            style={styles.attachmentIcon}>
            <Icon
              name="camera-retro"
              size={25}
              color={colors.secondary}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>

          {/* Insert Audio Icon */}
          <TouchableOpacity style={styles.attachmentIcon}>
            <Icon
              name="file-audio"
              size={25}
              color={colors.secondary}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>

          {/* Insert Video Icon */}
          <TouchableOpacity
            onPress={pickVideoFromGallery}
            style={styles.attachmentIcon}>
            <Icon
              name="file-video"
              size={25}
              color={colors.secondary}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>

        {/* Display Attachments */}
        {/* Make this area visible only if there are items attached*/}
        {filesSelected.length > 0 ? (
          <View style={styles.modalView}>
            <BrickList
              data={filesSelected}
              extraData={filesSelected}
              renderItem={prop => renderView(prop)}
              columns={3}
              rowHeight={45}
            />
          </View>
        ) : null}

        {/*Forward Area*/}
        <View
          style={{
            flexDirection: 'row',
            elevation: 10,
            marginTop: 20,
            alignSelf: 'center',
            width: Dimensions.get('window').width - 40,
            height: 60,
            borderRadius: 35,
            backgroundColor: colors.blueGrey,
            borderColor: colors.gray2,
            paddingEnd: 10,
            borderWidth: 1,
            justifyContent: 'center',
          }}>
          {/*Forward option configuration*/}
          <TouchableOpacity {...touchPropsForward}>
            <Icon name="share" size={23} color={colors.white} />
          </TouchableOpacity>

          {/*Display emergency contacts*/}
          {/*Toggle selection state on press*/}
          <FlatList
            contentContainerStyle={{justifyContent: 'center'}}
            extraData={selectedEmails}
            style={styles.selectedEmailList}
            horizontal={true}
            data={selectedEmails}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item: rowData, index}) => {
              return (
                <EmailTag
                  email_id={rowData.id}
                  list={selectedEmails}
                  index={index}
                />
              );
            }}
          />
        </View>
        <Text style={{marginTop:8, marginBottom:4,marginStart:5, color:colors.white}}>Yours teachers on Google Classroom</Text>
        <BrickList
              data={teachers}
              extraData={teachers}
              renderItem={prop => renderTeachers(prop)}
              columns={3}
              rowHeight={45}
            />

        {/*Submit Report*/}
        <TouchableOpacity style={styles.submit} onPress={uploadAll}>
          <Text
            style={{
              color: colors.black,
              paddingHorizontal: 17,
              fontWeight: '700',
              fontSize: 15,
              textAlign: 'center',
            }}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ReportScreen;

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },

  textInput: {
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderColor: '#E8E8E8',
    borderRadius: 50,
    borderTopLeftRadius: 0,
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    marginBottom: 7,
    marginTop: 30,
    textAlignVertical: 'top',
    //backgroundColor: '#4e5169',
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    color: colors.primary,
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  submit: {
    marginBottom: 10,
    marginTop: 20,
    backgroundColor: colors.tertiary,
    borderRadius: 30,
    elevation: 20,
    borderColor: '#E8E8E8',
    height: 50,
    justifyContent: 'center',
    width: 150,
  },
  talkBubble: {
    backgroundColor: 'transparent',
    marginStart: 15,
    elevation: 20,
  },
  talkBubbleSquare: {
    width: 120,
    height: 80,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  talkBubbleTriangle: {
    position: 'absolute',
    left: -25,
    top: 33,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 15,
    borderRightWidth: 35,
    borderRightColor: '#ffffff',
    borderBottomWidth: 13,
    borderBottomColor: 'transparent',
    borderTopRightRadius: 20,
    borderBottomEndRadius: 20,
  },
  attachments: {
    flexWrap: 'wrap',
    borderWidth: 0.5,
    borderColor: colors.tertiary,
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: colors.lightBlueGrey,
  },
  configIcon: {
    elevation: 10,
    marginStart: 5,
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.primary,
    borderColor: colors.lightBlueGrey,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  configIconSelected: {
    elevation: 10,
    marginStart: 5,
    alignSelf: 'flex-start',
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.primary,
    borderColor: colors.tertiary,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  forwardInactive: {
    elevation: 10,
    marginStart: 5,
    alignSelf: 'flex-start',
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.primary,
    borderColor: colors.lightBlueGrey,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginTop: 3.5,
    marginEnd: 5,
  },
  forwardActive: {
    elevation: 10,
    marginStart: 5,
    alignSelf: 'flex-start',
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.primary,
    borderColor: colors.tertiary,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginTop: 3.5,
    marginEnd: 5,
  },
  centeredView: {},
  modalView: {
    marginTop: 10,
    backgroundColor: '#dce7f3',
    borderRadius: 20,
    alignItems: 'center',
    //shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    //elevation: 5,

    width: Dimensions.get('window').width - 20,
    paddingTop: 5,
  },
  attachmentIcon: {
    elevation: 10,
    marginStart: 15,
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.primary,
    borderColor: colors.blueGrey,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 3,
  },
  centeredViewLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalViewLoader: {
    margin: 20,
    backgroundColor: '#00000000',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  lottie: {
    width: 200,
    height: 200,
  },
  teacherContainer: {

    flexDirection:'row',
    elevation:2, 
    alignSelf:'center', 
    paddingHorizontal:5,
    height: 30, 
    borderRadius: 35, 
    backgroundColor:colors.white, 
    borderColor:colors.blueGrey, 
    borderWidth:1,  
    justifyContent:'center',
    marginStart:5

   },
});
