import React, { useState } from 'react'
import { StyleSheet, Image, Text, TouchableOpacity, Dimensions} from 'react-native'
import { colors } from '../../constants/theme.js';
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

const EmailTag = ({email_id, list, index}) => {
    const [isSelected,toggleSelectedState]=useState(list[index].isSelected)
    //console.log(index+""+list[index].isSelected+" "+isSelected)
    
    // const removeItem=()=>{
    //     console.log(index)
    //   list.splice(index,1)
    // }
    const changeState=()=>{
        
        toggleSelectedState(!isSelected)
        //console.log(index+" "+isSelected)
        list[index].isSelected=isSelected
        console.log(index+" "+list[index].isSelected+" "+isSelected)

    }
    return (
        <TouchableOpacity style={isSelected ? styles.selectedContainer : styles.container} onPress={changeState}>
            <Text>
                {email_id}
            </Text>
        </TouchableOpacity>
    )
}


export default EmailTag

const styles = StyleSheet.create({
    container: {

         flexDirection:'row',
         elevation:1, 
         alignSelf:'center', 
         paddingHorizontal:5,
         height: 30, borderRadius: 35, 
         backgroundColor:colors.white, 
         borderColor:colors.blueGrey, 
         borderWidth:1,  
         justifyContent:'center',
         marginStart:3,
         opacity:0.5
    
        },
        selectedContainer:{
           
                flexDirection:'row',
                elevation:1, 
                alignSelf:'center', 
                paddingHorizontal:5,
                height: 30, borderRadius: 35, 
                backgroundColor:colors.white, 
                borderColor:colors.blueGrey, 
                borderWidth:1,  
                justifyContent:'center',
                marginStart:3
           
               
        },
    
    email_id: {
        color: colors.black,
        fontSize: 14,
        backgroundColor:colors.white
       

    },
 
})
