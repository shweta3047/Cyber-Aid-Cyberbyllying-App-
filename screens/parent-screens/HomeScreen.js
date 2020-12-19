import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors, fonts} from '../../constants/theme';
import headerImg from '../../assets/home.png';
import Trending from '../../components/parent-components/Trending';
import Twitter from '../../components/parent-components/Twitter';

const HomeScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerDiv}>
          <Text
            style={{
              color: colors.white,
              fontSize: fonts.h1.fontSize,
              fontWeight: '700',
            }}>
            App name
          </Text>
          <View style={styles.headerSubCaption}>
            <Text style={{color: colors.white, fontSize: fonts.body.fontSize}}>
              {' '}
              Lorem Ipsum.Lorem Ipsum.Lorem Ipsum.Lorem Ipsum.Lorem Ipsum.
            </Text>
          </View>
        </View>
        <View style={styles.headerDiv}>
          <Image source={headerImg} style={{width: 180, height: 200}} />
        </View>
      </View>
      <ScrollView>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Fetched-SMS')}>
          <Trending
            icon="message"
            title="Harmful Message Monitoring"
            body="Read any harmful messages received by your child"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Tweets')}>
          <Trending
            icon="twitter"
            title="Trending Tweets"
            body="See trending tweets about Cyber Bullying"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('News')}>
          <Trending
            icon="news"
            title="Latest News"
            body="Get updated with latest news about Cyber Bullying"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Statistics')}>
          <Trending
            icon="bar-graph"
            title="Alarming Statistics"
            body="Know statistics about Cyber Bullying in different countries around the globe"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 250,
    backgroundColor: colors.tertiary,
    // borderBottomLeftRadius:200,
    // borderTopRightRadius:90,
    // borderBottomRightRadius:380
    // borderBottomLeftRadius:40,
    // borderBottomRightRadius:40,
    color: colors.white,
  },
  headerDiv: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSubCaption: {
    width: '92%',
    marginVertical: 15,
    color: colors.white,
    alignSelf: 'center',
    textAlign: 'justify',
  },
});
