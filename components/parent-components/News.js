import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {colors, fonts} from '../../constants/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Hyperlink from 'react-native-hyperlink';

// a8db927ecc2e4f1a92852947c6f1a1a2
const News = props => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(
      'http://newsapi.org/v2/everything?q=cyberbullying&from=2020-12-05&sortBy=publishedAt&apiKey=a8db927ecc2e4f1a92852947c6f1a1a2',
      {
        method: 'GET',
      },
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data.data)
        setNews(data.articles);
        // console.log(news)
      });

    return () => {};
  }, []);

  const renderItem = ({item}) => {
    // console.log(item.user.profile_image_url )
    return (
      <View style={styles.newsContainer}>
        <View style={styles.left}>
          <Image
            source={{
              uri: item.urlToImage
                ? item.urlToImage
                : 'https://www.arvaantechnolab.com/assets/images/no-image-available.png',
            }}
            style={styles.profileImg}
          />
        </View>
        <View style={styles.right}>
          <View style={styles.timestamp}>
            <Text style={styles.timestampText}>{item.publishedAt}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
          <View style={styles.author}>
            <Text style={styles.authorText}>{item.source.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('NewsExpand', {news: item})
            }>
            <View style={styles.more}>
              <Text style={styles.moreText}>Read More</Text>
              <AntDesign name="rightcircle" size={20} color={colors.purple} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Entypo name="news" size={38} color={colors.tertiary} />
        <Text style={styles.headerTitle}> Latest News</Text>
      </View>
      <View style={{marginTop: 20, marginBottom: 80}}>
        <FlatList
          renderItem={renderItem}
          data={news}
          horizontal={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default News;

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
    width: 80,
    height: 80,
    //   borderRadius:20
  },
  newsContainer: {
    width: '95%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: colors.tertiary,
    borderBottomWidth: 1,
    //  backgroundColor:'rgba(55, 59, 69, 0.7)',
  },
  left: {
    width: '25%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    width: '75%',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  timestamp: {
    alignSelf: 'flex-end',
  },
  title: {
    paddingVertical: 3,
  },
  more: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestampText: {
    color: colors.white2,
    fontSize: 12,
  },
  titleText: {
    color: colors.white,
    fontSize: 15,
  },
  authorText: {
    color: colors.white2,
    fontStyle: 'italic',
  },
  moreText: {
    marginRight: 8,
    color: colors.purple,
  },
});
