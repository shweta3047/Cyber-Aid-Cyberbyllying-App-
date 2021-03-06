import React,{useState} from 'react'
import { StyleSheet, Text, View  ,Image,KeyboardAvoidingView,ScrollView} from 'react-native';
import { TextInput,RadioButton ,HelperText,Checkbox,Button} from 'react-native-paper';
import {colors,fonts} from '../../constants/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from 'react-native/Libraries/NewAppScreen';



const EditProfileScreen = (props) => {

  const [checked, setChecked] = useState(false);
  const [fullname,setFullname]=useState('Mary Smith')
  const [email,setEmail]=useState('marysmith@gmail.com')
  const [phone,setPhone]=useState('+189279919999')
  const [age,setAge]=useState('36')

  const hasErrors = () => {
    return !email.includes('@');
  };

  const Gender=(props)=>{
    return (
      <RadioButton
      value={props} color={colors.tertiary} 
      status={ checked === props ? 'checked' : 'unchecked' }
      onPress={() => setChecked(props)}
    />
    )
  }
  


    return (
        <ScrollView style={{backgroundColor:colors.primary,width:'100%'}}>
            <View style={styles.background} >
           <AntDesign name="arrowleft" size={32} color="white" style={{position:"absolute",top:25,left:20}} 
             onPress={()=>props.navigation.navigate('Profile')} />
            <Text style={styles.profileText}>Edit Profile</Text>
                <View style={styles.dpCover} >
                    <Image style={{width:90,height:90}} source={require('../../assets/profilepic.png')} />
                </View>
                <Entypo name="camera" size={24} color={colors.black} style={styles.camera} />
            </View>
            <KeyboardAvoidingView>
              <View style={styles.inputBox}>
              <AntDesign name="user" size={24} color={colors.tertiary} 
                  style={{position:'relative',left:20}} />
                <TextInput style={styles.input}  theme={{colors: {placeholder: 'white', text: 'white', primary: colors.primary,underlineColor: 'transparent'}}}
                 
                  label="Fullname" value={fullname} 
                  onChangeText={text => setFullname(text)} 
                />
              </View>

              <View style={styles.inputBox}>
                 <MaterialCommunityIcons name="email-outline" size={24}  color={colors.tertiary} 
                    style={{position:'relative',left:20}} />
                    <TextInput style={styles.input}  theme={{colors: {placeholder: 'white', text: 'white', primary: colors.primary,underlineColor: 'transparent'}}}
                  underlineColor={colors.primary}  
                  label="Email" value={email} 
                  onChangeText={text => setEmail(text)} 
                />
                  
                </View>
                <View style={styles.inputBox}>
                  <Feather name="phone" size={24} color={colors.tertiary}
                      style={{position:'relative',left:20}} />
                      <TextInput style={styles.input}  theme={{colors: {placeholder: 'white', text: 'white', primary: colors.primary,underlineColor: 'transparent'}}}
                  underlineColor={colors.primary}  
                  label="Phone no." value={phone} 
                  onChangeText={text => setPhone(text)} keyboardType='numeric'
                />
                </View>
                 
                  <View style={styles.inputBox}>
                  
                    <MaterialCommunityIcons name="timer-sand-empty" size={24} color={colors.tertiary}
                    style={{position:'relative',left:20}} />
                   
                    <TextInput style={styles.input}  theme={{colors: {placeholder: 'white', text: 'white', primary: colors.primary,underlineColor: 'transparent'}}}
                      underlineColor={colors.primary} 
                      label="Age" value={age} 
                      onChangeText={text => setAge(text)} keyboardType='numeric'
                    />
                    
                    
                  </View>
                  <View style={{display:'flex', flexDirection:'row',alignItems:'center',padding:20,paddingTop:20,paddingBottom:5}}>
                  <Text style={{color:colors.gray}}>Male: </Text>
                    {Gender('male')}
                    <Text style={{color:colors.gray}}>Female: </Text>
                    {Gender('female')}
                    <Text style={{color:colors.gray}}>Other: </Text>
                    {Gender('other')}
                  </View>
                  <View style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    <Button mode="contained" color={colors.tertiary} style={{width:'40%',borderRadius:20,marginTop:20,marginLeft:100}} 
                    //   onPress={}
                    >
                      <Text style={{color:colors.white}}>Save Changes</Text>
                    </Button>
                    
                      
                    </View>
               </KeyboardAvoidingView>
              
        </ScrollView>
    )
}


export default EditProfileScreen;



const styles = StyleSheet.create({
  background :{
    backgroundColor:colors.primary,
    borderBottomEndRadius:180,
    // borderBottomStartRadius:300, 
    width:'100%',
    height:150,
    marginBottom:30,
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'center'
  },
  profileText: {
    position:'relative',
    top:10,
    color:colors.white,
    fontSize:24,
    fontWeight:'700'
  },
    dpCover:{
        width:100,
        height:100,
        position:'relative',
        // left:'35%',
        top:'20%',
         borderRadius:62,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.blueGrey
    },
    camera:{
      position:'absolute',
      top:'105%'
    },
    inputBox:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:colors.blueGrey,
      borderRadius:30,
     marginLeft:20,
     marginRight:20,
     marginTop:10,
     height:40
    },
    inputBox2:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-start',
      backgroundColor:colors.blueGrey,
      width:100,
      borderRadius:30,
     marginLeft:20,
     marginRight:20,
     marginTop:10,
     height:40
    },
    input: {
      marginRight:15,
      width: "90%",
      paddingLeft:22,
      backgroundColor:'transparent',
      
    },
    problemText:{
      paddingTop:20,
      paddingLeft:15,
      paddingBottom:8,
      fontSize:fonts.title.fontSize,
      fontWeight:'600',
      color:colors.secondary,
      display:'flex',
      textAlign:'left'

    },
    problemsBox:{
      display:'flex',
      marginLeft:20,
      marginRight:15,
      flexDirection:'row',
      flexWrap:'wrap'
    },
    problemsPart:{
      width:'50%'
    },
    checkbox: {
      width:'100%',
      // paddingLeft:15,
      paddingVertical:3,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-start'
    }
  });
