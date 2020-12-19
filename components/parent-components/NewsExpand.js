import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import {colors, fonts} from '../../constants/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Hyperlink from 'react-native-hyperlink';

const NewsExpand = props => {
  const item = props.route.params.news;
  // console.log(news)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={34} color={colors.tertiary} />
        <View style={styles.headerRight}>
          <FontAwesome
            name="star-o"
            size={28}
            color={colors.tertiary}
            style={{marginHorizontal: 15}}
          />
          <AntDesign name="sharealt" size={28} color={colors.tertiary} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.urlToImage
                ? item.urlToImage
                : 'https://www.arvaantechnolab.com/assets/images/no-image-available.png',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.info}>
          <View style={styles.timestamp}>
            <Text style={styles.timestampText}>{item.publishedAt}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
          <View style={styles.author}>
            {item.author ? (
              <Text style={styles.authorText}>{item.author}</Text>
            ) : null}
            <Text style={styles.sourceText}>{item.source.name}</Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
          <Hyperlink
            onPress={(url, text) => Linking.openURL(url)}
            linkStyle={{color: '#2980b9', fontSize: fonts.body.fontSize}}>
            <View style={styles.url}>
              <Text style={styles.urlText}>{item.url}</Text>
            </View>
          </Hyperlink>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewsExpand;

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
    paddingHorizontal: 20,
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  imageContainer: {
    width: '95%',
    marginVertical: 15,
    alignSelf: 'center',
  },
  info: {
    width: '95%',
    alignSelf: 'center',
  },
  timestamp: {
    alignSelf: 'flex-end',
  },
  title: {
    paddingVertical: 3,
  },
  timestampText: {
    color: colors.white2,
    fontSize: 13,
  },
  titleText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  authorText: {
    color: colors.white2,
    fontStyle: 'italic',
  },
  sourceText: {
    color: colors.white2,
  },
  descriptionText: {
    color: colors.white,
    paddingVertical: 15,
    lineHeight: 20,
  },
});
