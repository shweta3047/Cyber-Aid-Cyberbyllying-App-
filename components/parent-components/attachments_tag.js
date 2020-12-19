import React, { useState } from 'react'
import { StyleSheet, Image, Text, TouchableOpacity, Dimensions, Modal} from 'react-native'
import { colors } from '../../constants/theme.js';
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { set, atan } from 'react-native-reanimated';
import { Video } from 'expo-av';
import { FileSystem} from 'react-native-unimodules';
//import RNTextDetector from "react-native-text-detector";
import RNMlKit from 'react-native-firebase-mlkit';
import TesseractOcr, {LANG_ENGLISH,useEventListener} from 'react-native-tesseract-ocr';
import axios from 'axios';
import LottieLoader from 'react-native-lottie-loader';
import BrickList from 'react-native-masonry-brick-list';
//import * as firebase from 'firebase';

var getTypeIcon=(type)=>{
if(type=='image')
{
    return 'image'
}
else if(type=='video')
{
    return 'video'
}
else 
{
    return 'microphone-alt'
}
}
var textsFiltered={}
const AttachmentTag = ({list,itemData}) => {
    const[imgModalVisible, setImgModalVisisbility]=useState(false)
    const[videoModalVisible, setVideoModalVisisbility]=useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imgSrc, setImgSrc] = useState(null);
    const [text, setText] = useState('');
    //const [isLoading, setIsLoading] = useState(false);
    const [attachmentText, setAttachmentText] = useState()
    //const [badWords, setBadWords] = useState([]);
    const [results, setResult] = useState();
    const url='https://us-central1-mental-health-app-6edbd.cloudfunctions.net/app/api/detect/highlight-bad-words/'
    const [isError, setIsError] = useState(false);
    useEventListener('onProgressChange', (p) => {
        setProgress(p.percent / 100);
    });
     const recognizeTextFromImage = async () => {
         //tesseract ocr
        // setIsLoading(true);
        // console.log('path'+"=="+itemData.uri)
        // //const base64String = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
        // console.log('base64=='+itemData.base64.substring(0,10))
        // try {
        //   const tesseractOptions = {};
        //   const recognizedText = await TesseractOcr.recognize(
        //     'data:image/jpeg;base64,'+itemData.base64,
        //     LANG_ENGLISH,                                                                                               
        //     tesseractOptions,
        //   );
        //   setText(recognizedText);
        //   console.log(text)
        // } catch (err) {
        //   console.error(err);
        //   setText('');
        // }
        
    
        // setIsLoading(false);
        // setProgress(0);

        //using RNMLKit
        // const firebaseConfig = {
        //     apiKey: "AIzaSyCtSsfVM6wTCT1qYFUn6Derr14Y4uKr9jk",
        //     authDomain: "cyberbullyingreactnativecli.firebaseapp.com",
        //     projectId: "cyberbullyingreactnativecli",
        //     storageBucket: "cyberbullyingreactnativecli.appspot.com",
        //     messagingSenderId: "41669860478",
        //     appId: "1:41669860478:web:d6f94e56844940dedf0c2f",
        //     measurementId: "G-X91X874BTD"
        //   };
        //   // Initialize Firebase
        //   firebase.initializeApp(firebaseConfig);
        //   //firebase.analytics();
        // const deviceTextRecognition = await RNMlKit.deviceTextRecognition(itemData.uri);
        // console.log('text==='+deviceTextRecognition) 
   
    };
       
    //   const recognizeFromPicker = async (options = defaultPickerOptions) => {
    //     try {
    //       const image = await ImagePicker.openPicker(options);
    //       setImgSrc({uri: image.path});
    //       await recognizeTextFromImage(image.path);
    //     } catch (err) {
    //       if (err.message !== 'User cancelled image selection') {
    //         console.error(err);
    //       }
    //     }
    //   };
    
    const filterText = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
          const result = await axios(url+attachmentText);
          textsFiltered[text]=result.data
          console.log(textsFiltered[text])
          //console.log(categoryData[0])
          setResult(result.data)
          console.log(results)
        } catch (error) {
          setIsError(true);
        }
  
        setIsLoading(false);
      };
    const removeItem=()=>{
        var index=list.indexOf(itemData.name)
        console.log(itemData.name+" "+index)
        list.splice(index,1)
      }
      const showCorrectModal=()=>{
          if(itemData.type=='image')
          {
              setImgModalVisisbility(true)
              //detectText()
              //recognizeTextFromImage();
              setAttachmentText("shit bitch Hello")
            //   if (!textsFiltered.hasOwnProperty(attachmentText))
            //   {
                 
            //   }
              filterText()
              
              
              
          }
          if(itemData.type=='video')
          {
              setVideoModalVisisbility(true)
          }
      }

    //   const detectText = async () => {
    //     try {
    //       const options = {
    //         quality: 0.8,
    //         base64: true,
    //         skipProcessing: true,
    //       };
         
    //       const visionResp = await RNTextDetector.detectFromUri(itemData.uri); 
    //       console.log('visionResp'+" "+visionResp);
    //     } catch (e) {
    //       console.warn(e);
    //     }
    //   };
    const renderView=(prop)=>{
        return(
            <View style={styles.badWordTag}>
                <Text style={{textAlign:'center', color:colors.red}}>{prop}</Text>
            </View>
             )
      };

    return (
        <View>
        <Modal animationType='slide' transparent={true} visible={imgModalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        
                        <Image
                            source={{ uri: itemData.uri}}
                            style={{ width: 200, height:200, borderRadius: 10 }}/>

                        {isLoading ? 
                       <LottieLoader visible={true} source={require('../../constants/searchloader.json')} animationStyle={styles.lottie}
                       speed={2}/>:
                       <View style={styles.modalView2}><BrickList
                        data={results}
                        renderItem={(prop)=>renderView(prop)}
                        columns={3}
                        rowHeight={45}/>
                        </View>}
                       
                        <TouchableOpacity onPress={() => setImgModalVisisbility(false)} style={{marginTop:10,borderColor:colors.tertiary,borderRadius:5,width:100, borderWidth:1,padding:5}}>
                           <Text style={{color:colors.tertiary, textAlign:'center', fontWeight:'bold'}}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal animationType='slide' transparent={true} visible={videoModalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        
                        <Video
                            source={{ uri: itemData.uri}}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay
                            isLooping
                            style={{ width: 300, height: 300, borderRadius:10 }}/>
                       
                       <TouchableOpacity onPress={() => setVideoModalVisisbility(false)} style={{marginTop:10,borderColor:colors.tertiary,borderRadius:5,width:100, borderWidth:1,padding:5}}>
                           <Text style={{color:colors.tertiary, textAlign:'center', fontWeight:'bold'}}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        <TouchableOpacity style={styles.container} onPress={() => showCorrectModal()}>
            
            <Icon
            
            name={getTypeIcon(itemData.type)}
            size={20}
            color={colors.gray}
            style={{alignSelf:'center', marginEnd:3}}
            />
            <Text style={{textAlign:"center", alignSelf:'center', justifyContent:'center'}}>
                {itemData.filename}
            </Text>
            <TouchableOpacity style={{ elevation:1,
                marginStart:2, alignSelf:'center', 
                width:25, 
                height:25,
                borderRadius: 12, 
                backgroundColor:colors.white, 
                borderColor:colors.gray3, 
                borderWidth:1.5,
                
                justifyContent:'center'}}
                onPress={removeItem}
                >
            <Icon
            name='trash'
            size={15}
            color={colors.gray}
            style={{alignSelf:'center'}}
            />
            </TouchableOpacity>
        </TouchableOpacity>
        </View>
    )
}


export default AttachmentTag

const styles = StyleSheet.create({
    container: {

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
    
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22
          },
          modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            flexDirection: 'column',
            width: Dimensions.get('window').width - 20
          },
          lottie: {
            width: 200,
            height: 200
          },
          modalView2: {
            marginTop: 10,
            
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
            
            width: Dimensions.get('window').width-20,
            paddingTop:5
          },
          badWordTag: {

            flexDirection:'row',
            elevation:2, 
            alignSelf:'center', 
            paddingHorizontal:7,
            height: 30, 
            borderRadius: 35, 
            backgroundColor:colors.white, 
            borderColor:colors.red, 
            borderWidth:1,  
            justifyContent:'center',
            marginStart:5
       
           },
 
})
