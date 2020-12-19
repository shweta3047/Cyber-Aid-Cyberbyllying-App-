import React ,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,FlatList ,Image,Linking,TouchableOpacity} from 'react-native';
import { colors, fonts } from '../../constants/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import { ProgressBar, Colors } from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink'
import { ScrollView } from 'react-native-gesture-handler';

const Statistics = (props) => {
   
const ages=[
    {
        age1:"6-10",
        percent:"47.7%",
        bar:0.477
    },
    {
        age1:"11-13",
        percent:"56.4%",
        bar:0.564
    },
    {
        age1:"14-18",
        percent:"59.9%",
        bar:0.599
    },
    {
        age1:"19-older",
        percent:"54.3%",
        bar:0.543
    },
]

const online=[
    {
        type:"Offensive name-calling",
        percent:"42%",
        bar:0.42
    },
    {
        type:"Spreading of false rumors",
        percent:"32%",
        bar:0.32
    },
    {
        type:"Receiving explicit images they didn't ask for",
        percent:"25%",
        bar:0.25
    },
    {
        type:"Constant asking of irrelevant questions",
        percent:"21%",
        bar:0.21
    },
    {
        type:"Physical threats",
        percent:"16%",
        bar:0.16
    },
    {
        type:"Having explicit images of them shared without their consent",
        percent:"7%",
        bar:0.07
    },
]

const ageWiseBully=(item,index)=>{
    return (
        <View 
        style={{display:'flex',flexDirection:'row',alignItems:'center',marginVertical:5}}
        key={index}
        >
            <View style={{width:'15%',paddingLeft:5}}>
                <Text style={{color:colors.white,fontSize:12}}>
                    Ages {item.age1}</Text>
                </View>
            <View style={{width:'70%'}}>
                <ProgressBar progress={item.bar} color={colors.tertiary} style={{height:12}} />
            </View >
            <View style={{width:'15%',paddingLeft:5}}>
                <Text style={{color:colors.white2,fontSize:12}}>{item.percent}</Text>
                </View>
        </View>
    )
}


const onlineBully=(item,index)=>{
    return (
        <View 
        style={{display:'flex',flexDirection:'column',marginVertical:5}}
        key={index}
        >
            <View style={{width:'95%',paddingLeft:5,marginVertical:10,alignSelf:'center'}}>
                <Text style={{color:colors.white,fontSize:13}}>
                    {item.type}</Text>
                </View>
            <View style={{display:'flex',flexDirection:'row',width:'95%',alignSelf:'center',alignItems:'center'}}>
            <View style={{width:'80%'}}>
                <ProgressBar progress={item.bar} color={colors.tertiary} style={{height:12}} />
            </View >
            <View style={{width:'20%',paddingLeft:5}}>
                <Text style={{color:colors.white2,fontSize:13}}>{item.percent}</Text>
                </View>
            </View>
        </View>
    )
}



  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <Entypo name="bar-graph" size={38} color={colors.tertiary} />
            <Text style={styles.headerTitle}> Alarming Statistics</Text>
      </View>
      <ScrollView>
      <View>
          <View 
          style={{width:'95%',alignSelf:'center',marginVertical:15}}
          >
              <Text style={{color:colors.white,fontSize:20,lineHeight:30,fontWeight:'700'}}
              >Cyberbullying facts and statistics for 2018-2020</Text>
              <Text style={{color:colors.purple,marginVertical:10,fontSize:15}}>
                  'x'% of parents with children ages 'a-b' reported their children were bullied</Text>
          </View>
          {
              ages.map((item,index)=>{
                  return ageWiseBully(item,index)
              })
          }
         
      </View>
      <View>
          <View 
          style={{width:'95%',alignSelf:'center',marginVertical:15}}
          >
              <Text style={{color:colors.purple,marginVertical:10,fontSize:15}}>
                  'x'% of teens who say they have experienced bully online or on their cellphone</Text>
          </View>
          {
              online.map((item,index)=>{
                  return onlineBully(item,index)
              })
          }
      </View>
      </ScrollView>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.primary
  },
  header:{
      width:'100%',
      height:80,
      backgroundColor:colors.gray3,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
  },
  headerTitle:{
      color:colors.white,
      fontSize:fonts.h1.fontSize,
      fontWeight:'700'
  },
 
});


