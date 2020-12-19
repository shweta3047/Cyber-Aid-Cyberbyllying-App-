import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {colors, fonts} from '../../constants/theme';
//import { AntDesign,MaterialIcons,Feather,FontAwesome5,MaterialCommunityIcons,Ionicons} from 'react-native-vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const GuideContent = props => {
  const data = props.route.params.item;
  const {width, height} = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          size={34}
          color={colors.tertiary}
          onPress={() => props.navigation.navigate('GuidanceScreen')}
        />
        <Text
          style={{
            color: colors.black,
            marginRight: 20,
            alignSelf: 'center',
            fontWeight: '700',
            fontSize: fonts.h2.fontSize,
          }}>
          {data.value}
        </Text>
      </View>
      <ScrollView>
        {/* <View style={{height:height-600,width:width,backgroundColor:colors.blueGrey,top:-80}}>
        <Text size={40} style={{color:colors.black,padding:40,marginLeft:40}}>{data.value}</Text>
      </View> */}

        <View
          style={{
            width: width - 20,
            borderWidth: 3,
            borderRadius: 10,
            borderColor: colors.tertiary,
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginTop: 20,
          }}>
          <View
            style={{
              width: width - 30,
              backgroundColor: 'transparent',
              alignSelf: 'center',
              padding: 6,
            }}>
            <Text style={styles.descriptionText}>{data.content}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GuideContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  header: {
    height: 70,
    width: '100%',
    backgroundColor: colors.gray3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  descriptionText: {
    color: colors.white,
    paddingVertical: 15,
    lineHeight: 20,
  },
});
