import React,{useState} from 'react';

import { View, Text, StyleSheet ,Image,ScrollView,Dimensions, FlatList} from 'react-native';
import {colors,fonts} from '../../constants/theme';
//import { AntDesign,MaterialIcons,Feather,FontAwesome5,MaterialCommunityIcons,Ionicons} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons' 
//import { FlatList } from 'react-native-gesture-handler';
import emergencycontacts from '../../constants/emergencycontacts.js'
import { FAB } from 'react-native-paper';


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

          
        </View>
        
        
       </View>
       
      </ScrollView>   
      <FAB medium icon="plus" 
        style={styles.fab} 
        onPress={() => props.navigation.navigate("AddEmergencyContact")} 
        color={colors.white} backgroundColor={colors.secondary} />
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
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:colors.tertiary
  }
  });