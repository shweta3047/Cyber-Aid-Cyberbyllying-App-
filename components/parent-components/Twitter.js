import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Linking} from 'react-native';
import {colors, fonts} from '../../constants/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Hyperlink from 'react-native-hyperlink';

const Trending = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.twitter.com/1.1/search/tweets.json?q=cyberbullying+OR+cyberbully&result_type=popular&count=50&tweet_mode=extended&lang=en',
      {
        method: 'GET',
        headers: {
          authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAAh2JQEAAAAAxo1uHFib0MLrWSxvcZ3NB24bhrQ%3De8qctdgxoGaIBFibg8HVM2ZxlTae6QCIwjIYXyxUcOcfERiD51 `,
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data.statuses)
        setTweets(data.statuses);
        // console.log(tweets)
      });

    return () => {};
  }, []);

  const renderItem = ({item}) => {
    // console.log(item.user.profile_image_url )
    return (
      <View style={styles.tweetContainer}>
        <View style={styles.info}>
          <View style={styles.profileBox}>
            <Image
              source={{uri: item.user.profile_image_url}}
              style={styles.profileImg}
            />
          </View>
          <View style={styles.contentBox}>
            <View style={styles.top}>
              <Text style={styles.name}>{item.user.name}</Text>
              <Text style={styles.createdat}>{item.created_at}</Text>
            </View>
            <View style={styles.middle}>
              <Hyperlink
                onPress={(url, text) => Linking.openURL(url)}
                linkStyle={{color: '#2980b9', fontSize: fonts.body.fontSize}}>
                <Text style={styles.body}>{item.full_text}</Text>
              </Hyperlink>
            </View>
            <View style={styles.options}>
              <Entypo
                name="share"
                size={24}
                color={colors.gray3}
                style={{marginRight: 10}}
              />
              <Entypo
                name="star"
                size={24}
                color={colors.gray3}
                style={{marginRight: 10}}
              />
              <MaterialIcons
                name="loop"
                size={24}
                color={colors.gray3}
                style={{marginRight: 5}}
              />
              <Text style={styles.retweetcount}>{item.retweet_count}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Entypo name="twitter" size={38} color={colors.tertiary} />
        <Text style={styles.headerTitle}> Trending Tweets</Text>
      </View>
      <View style={{marginTop: 20, marginBottom: 80}}>
        <FlatList
          renderItem={renderItem}
          data={tweets}
          horizontal={false}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    width: '100%',
    height: 80,
    backgroundColor: colors.gray3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: fonts.h1.fontSize,
    fontWeight: '700',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tweetContainer: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'rgba(55, 59, 69, 0.7)',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: colors.tertiary,
    borderBottomWidth: 1,
  },
  profileBox: {
    width: '15%',
    padding: 5,
    paddingVertical: 10,
  },
  contentBox: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    display: 'flex',
    flexDirection: 'column',
    width: '85%',
  },
  top: {
    display: 'flex',
    flexDirection: 'column',
  },
  middle: {
    paddingVertical: 7,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  createdat: {
    color: colors.gray3,
    fontSize: 12,
    marginVertical: 3,
  },
  body: {
    color: colors.white,
  },
  retweetcount: {
    color: colors.gray3,
    fontSize: 16,
  },
});
