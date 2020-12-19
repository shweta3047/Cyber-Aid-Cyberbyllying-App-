import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {colors, fonts} from '../../constants/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Trending = props => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Entypo name={props.icon} size={38} color={colors.tertiary} />
      </View>
      <View style={styles.right}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View>
          <Text style={styles.body}>{props.body}</Text>
        </View>
      </View>
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: colors.gray3,
    width: '93%',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 15,
  },
  left: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    width: '80%',
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    paddingVertical: 5,
    color: colors.white,
    fontSize: 17,
    fontWeight: '800',
  },
  body: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.primary,
  },
});
