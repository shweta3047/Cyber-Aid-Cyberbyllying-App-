import React,{useState} from 'react';

import { View, Text, StyleSheet ,Image,ScrollView,Dimensions, FlatList} from 'react-native';
import {colors,fonts} from '../../constants/theme';
//import { AntDesign,MaterialIcons,Feather,FontAwesome5,MaterialCommunityIcons,Ionicons} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons' 
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
//import { FlatList } from 'react-native-gesture-handler';
import emergencycontacts from '../../constants/emergencycontacts.js'
import { FAB } from 'react-native-paper';
import { Button} from 'react-native-paper';



const Profile = (props) => {
    const {width,height} = Dimensions.get('window')
    
    const [fullname,setFullname]=useState('Mary Smith')
    const [email,setEmail]=useState('marysmith@gmail.com')
    const [phone,setPhone]=useState('+189279919999')
    const [age,setAge]=useState('36')

    return (
        <View style={{flex:1,backgroundColor:colors.primary,display:'flex',width:width}}>
            <ScrollView>
                    <View style={styles.container} >
                        <View style={{marginTop:-70,marginLeft:15}}>
                           <Text style={styles.profileText}>My Profile</Text>
                        </View>
                        
                            <View style={styles.container2} >
                                <Icon name="pencil-alt" size={40}   color={colors.tertiary} onPress={()=>props.navigation.navigate('EditProfile')}  style={{marginRight:-100}}/>
                            </View>
                            
                    </View>
                    <View style={{backgroundColor:colors.blueGrey,width:width-30,height:height-430,display:'flex',justifyContent:'center',top:-60,marginLeft:15,borderTopLeftRadius:20,borderTopRightRadius:20}}>
              <View style={{alignSelf:'center'}}>
                <Image source={require('../../assets/profilepic.png')} style={{width:90,height:90}}></Image>
              </View>
          
          <View style={{ position:'relative',display:'flex',alignItems:'center'}}>
              <Text style={styles.name}>{fullname} </Text>
              <View style={styles.infoBox}>
              <Icon name="user-circle" size={20} color={colors.tertiary}  />
                    <Text style={styles.otherInfo}>female</Text>
              </View>
              <View style={styles.infoBox}>
                    <Icon name="hourglass" size={20} color={colors.tertiary} />
                    <Text style={styles.otherInfo}>{age} yrs. old</Text>
              </View>
              <View style={styles.infoBox}>
                    <Icon name="phone" size={20} color={colors.tertiary}  />
                  
                    <Text style={styles.otherInfo}>{phone}</Text>
              </View>
              <View style={styles.infoBox}>
                  
                    <Icon name='map-pin' size={20} color={colors.tertiary} />
                    <Text style={styles.otherInfo}>California, USA</Text>
              </View>
              <View style={styles.infoBox}>
                    <Icon name="envelope" size={20} color={colors.tertiary} />
                    <Text style={styles.otherInfo}>{email}</Text>
              </View>
          </View>
          
          
          
          </View> 

            
            <View>
        <View style={{top:-40,marginLeft:10,display:'flex',flexDirection:'row'}}>
          <Icon name="address-book" color={colors.tertiary} size={30}/>
          
          <Text style={{color:colors.white,top:0,fontSize:fonts.h3.fontSize,fontWeight:'700'}}>Emergency Contacts</Text>
          <FAB small icon="plus" 
        style={styles.fab} 
        onPress={() => props.navigation.navigate("AddEmergencyContact")} 
        color={colors.white} backgroundColor={colors.secondary} />
        </View>
        <View>
          {
            emergencycontacts.map( (data)=>{
                return(
                  <View key={data.id} style={{flex:1,width: width-20,height: 100, marginLeft:10,marginTop:20,top:-30,borderRadius: 10,backgroundColor:colors.blueGrey}}>
                      <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                        <View style={styles.imgContainer}>

                      <Image source={{uri:data.img}} style={{width:50,height:50,borderRadius:30,margin:2}} />
                      </View >
                      <View style={{flex:1,display:'flex',flexDirection:'column'}}>
                        <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                      <Text style={{color:'white',marginLeft:10,marginTop:10}}>{data.name}</Text>
                      <Icon name="pencil-alt"  size={20} color={colors.tertiary} style={{left:150}} onPress={()=>props.navigation.navigate('EditEmergencyContact',{data:data})} />
                      </View>
                      <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                      <Icon name="phone" size={20} color={colors.tertiary} style={{top:10}}  />
                      <Text style={{color:'white',marginLeft:5,marginTop:10}}>{data.contact_no}</Text>
                    
                        </View>
                        <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                        <Icon name="envelope" size={20} color={colors.tertiary} />
                        <Text style={styles.otherInfo}>{data.email}</Text>
                        </View>
                      </View>
                      </View>
                    
                  </View>
                )
            }

            )

          }

          <View>
          <View style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    <Button mode="contained" color={colors.tertiary} style={{width:'100%',borderRadius:20,marginTop:20,marginLeft:0}} 
                    //   onPress={}
                    >
                      <Text style={{color:colors.white,fontSize:fonts.body.fontSize}}>Fetch Teachers From Google Classroom</Text>
                    </Button>
                    
                      
                    </View>
                    <View  style={{flex:1,width: width-20,height: 80, marginLeft:10,marginTop:50,top:-30,borderRadius: 10,backgroundColor:colors.blueGrey}}>
                      <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                        <View style={styles.imgContainer}>

                      <Image source={{uri:"https://bsmedia.business-standard.com/_media/bs/img/article/2017-09/27/full/1506528237-5647.jpg"}} style={{width:50,height:50,borderRadius:30,margin:2}} />
                      </View >
                      <View style={{flex:1,display:'flex',flexDirection:'column'}}>
                        <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                      <Text style={{color:'white',marginLeft:10,marginTop:10}}>Harper Jackson</Text>
                      </View>
                      <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                      
                    
                        </View>
                        <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                        <Icon name="envelope" size={20} color={colors.tertiary} />
                        <Text style={styles.otherInfo}>harper@gmail.com</Text>
                        </View>
                      </View>
                      </View>
                    
                  </View>
                  <View  style={{flex:1,width: width-20,height: 80, marginLeft:10,marginTop:50,top:-30,borderRadius: 10,backgroundColor:colors.blueGrey}}>
                      <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                        <View style={styles.imgContainer}>

                      <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcC-fIfwHWjNJ8muM1jlrR4hlNA-ClRiGhOQ&usqp=CAU"}} style={{width:50,height:50,borderRadius:30,margin:2}} />
                      </View >
                      <View style={{flex:1,display:'flex',flexDirection:'column'}}>
                        <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                      <Text style={{color:'white',marginLeft:10,marginTop:10}}>Avery Green</Text>
                      </View>
                      <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                      
                    
                        </View>
                        <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                        <Icon name="envelope" size={20} color={colors.tertiary} />
                        <Text style={styles.otherInfo}>avery@gmail.com</Text>
                        </View>
                      </View>
                      </View>
                    
                  </View>
                  <View  style={{flex:1,width: width-20,height: 80, marginLeft:10,marginTop:50,top:-30,borderRadius: 10,backgroundColor:colors.blueGrey}}>
                      <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                        <View style={styles.imgContainer}>

                      <Image source={{uri:"data:image/jpeg;base64,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"}} style={{width:50,height:50,borderRadius:30,margin:2}} />
                      </View >
                      <View style={{flex:1,display:'flex',flexDirection:'column'}}>
                        <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                      <Text style={{color:'white',marginLeft:10,marginTop:10}}>Evelyn Jackson</Text>
                      </View>
                      <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                      
                    
                        </View>
                        <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                        <Icon name="envelope" size={20} color={colors.tertiary} />
                        <Text style={styles.otherInfo}>evelyn123@gmail.com</Text>
                        </View>
                      </View>
                      </View>
                    
                  </View>
                    
          </View>

          
        </View>
        
        
       </View>
       
      </ScrollView>   
     
        </View>
    )

}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex:1,
    display:'flex',
    flexDirection:'row',
    marginTop:100
  }  ,
  container2:{
    margin:60,
    marginLeft:180,
    marginTop:-60
  },
  infoBox:{
      display:'flex',
      flexDirection:'row'
  },otherInfo:{
    paddingBottom:5,
    paddingLeft:5,
    color:colors.white
    // fontStyle:'italic'
  },
  name:{
    paddingBottom:5,
    fontSize:fonts.title.fontSize,
    fontWeight:'bold',
    color:colors.white
  },
  profileText: {
    color:"white",
    fontWeight:'bold',
    fontSize:fonts.h1.fontSize
  },
  infoContainer:{
   paddingVertical:10,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  imgContainer:{
    width:55,
    height:55,
    borderRadius:30,
    backgroundColor:colors.tertiary,
    margin:10,
    marginLeft:15
  },
  name:{
    fontSize:fonts.header.fontSize,
    fontWeight:'700',
    color:colors.secondary,
    paddingVertical:3
  },fab: {
    position: 'absolute',
    marginLeft:-10,
    marginTop:35,
    right: 0,
    bottom: 0,
    backgroundColor:colors.tertiary
  }
  });