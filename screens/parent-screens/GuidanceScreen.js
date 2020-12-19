import * as React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Platform
} from 'react-native';
import {colors, fonts} from '../../constants/theme';

const {width, height} = Dimensions.get('window');
import {getMovies} from './api';
import LinearGradient from 'react-native-linear-gradient';

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;
import {TouchableOpacity} from 'react-native-gesture-handler';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const Backdrop = ({movies, scrollX}) => {
  return (
    <View style={{height: BACKDROP_HEIGHT, width, position: 'absolute'}}>
      <FlatList
        data={movies.reverse()}
        keyExtractor={item => item.key.toString()}
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        renderItem={({item, index}) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}>
              <Image
                source={{
                  uri:
                    'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fs3-ap-northeast-1.amazonaws.com%2Fpsh-ex-ftnikkei-3937bb4%2Fimages%2F4%2F8%2F0%2F5%2F27545084-2-eng-GB%2F20200616-AI-Cyberbullying-img.png?source=nar-cms&width=1600&height=900&fit=cover&gravity=faces',
                }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
};

export default function GuidanceScreen(props) {
  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([{key: 'empty-left'}, ...movies, {key: 'empty-right'}]);
    };

    if (movies.length === 0) {
      fetchData(movies);
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  let kvArray = [
    {
      key: 1,
      value: 'What is Cyberbullying?',
      content:
        'Even though it has been around for ages, experts still haven’t completely agreed on a definition of “bullying,” much less cyberbullying, the digital version. There are elements that keep popping up in definitions, though, so that we’re pretty clear on what it is not. It’s not social drama, an argument, mean gossip, an impulsive expression of anger or a prank that’s gone wrong but wasn’t meant to. Any of these can be hurtful and sometimes they can turn into bullying, but cyberbullying is not just any form of mean behavior any more than bullying is in offline life.\n\n Most experts agree that bullying and cyberbullying are forms of serious aggression, usually targeted and repeated. With cyberbullying, the repetition can be less personal but just as hurtful when shared widely, or even virally, by anonymous posters. By most definitions, both involve a real or perceived power imbalance that’s physical, psychological and/or social. Although cyberbullying occurs in digital spaces and can be anonymous, there’s usually a connection to offline life – for kids, school life.\n\n Anonymity is more of a factor in cyberbullying than in traditional bullying. Targets may believe that more people are witness to the abuse than actually are, which can compound the pain. And since online socializing can occur 24/7, home, weekends and vacation can’t be havens from the hurt.',
    },
    {
      key: 2,
      value: 'What can I do if my Child is Being Bullied Online?',
      content:
        'Parents know their children better than anyone. It means you are best placed to indentify and deal with any cyberbullying they may encounter. \nIf your child is avoiding school, or seems upset, sad or angry when or after using their phone or PC, it may be a sign of cyberbullying.\nIf your child begins shunning the computer or becomes disinterested with technology, it could also be a sign, as is the rapid switching of screens when you enter the room. \nAs a parent, you must also confirm that you are dealing with bullying behaviour. \nAsk yourself the following four questions: \n1.Is your child specifically targeted on their own or is the behaviour targeted at a group of people?    \n2.Has this been happening over a period of time?\n  3.Is the behaviour part of a recurring pattern?   \n4.And, is the behaviour deliberately intended to harm or upset your child?\nOnce you have confirmed that bullying is taking place, you should get in touch with your child’s school or youth organisation. Internet Service Providers should also be contacted and, if the cyberbullying is very serious, or potentially criminal, you should contact your local gardai.\nEncouraging your child to talk to you about cyberbullying is key to maintaining an open and positive environment which can help you deal with the situation. Responding negatively by barring internet use or a mobile phone can cause a lot of damage and will also put you out of the loop if cyberbullying happens again.',
    },
    {
      key: 3,
      value: 'Cyberbullying: What Advice Should I Give my Child?',
      content:
        'Start by commending your child for coming to speak to you about the problem.\nThen, give them the following advice:\n1.Don’t Reply: Young people should never reply to messages that harass or annoy them. The bully wants to know they have upset their target. If they get a response it feeds into the problem and makes things worse.\n2.Keep the Messages: By keeping nasty messages your child will be able to produce a record of the bullying, the dates and the times. This will be useful for any subsequent school or garda investigation.\n2.Block the Sender: No one needs to put up with someone harassing them. Whether it’s mobile phones, social networking or chat rooms, children can block contacts through service providers.\n3.Report Problems: Ensure your child reports any instances of cyberbullying to websites or service providers. Sites like Facebook have reporting tools. By using these, your child will be passing important information to people who can help eradicate cyberbullying.\nChildren need to understand the emotional damage cyberbullying, and all other forms of bullying, can cause. All forms of bullying hurt, all cause pain and all should be stopped. By stressing this to your child – and by enforcing the importance of not standing by while someone else is being bullied – it will encourage their responsible internet use.\nThere are things you can do to tackle cyberbullying\nYou can also explain to your child the importance of not hurting someone’s feelings by email or other forms of electronic communications.\nTell them that respecting other people’s online rights is key, and to do this they should avoid insulting people on the internet as well as remain calm if insulted themselves.\nChildren also need to be thought to respect other people’s privacy online and overall they need to act responsibly when on the internet.',
    },
    {
      key: 4,
      value: 'Preventing Cyberbullying',
      content:
        'Because the issue of online bullying is constantly evolving, and also because it transcends the school environment, it is difficult to prevent and combat.\nHowever, there are some things that you can do to ensure cyberbullying is tackled head on before it happens.\nAs a parent, you can create a positive and supportive atmosphere for your child regarding bullying. Often, children are afraid to report it because they fear the bullying will escalate.\nBut by building awareness and being open with your child, they will feel empowered to talk to you about cyberbullying instead of hiding it away from you.\nYou should also get to grips with your child’s internet and phone use. Encourage your son or daughter to show you the websites they use. It will give you the knowledge to make it easier to make the right decisions as challenges arise.\nEncouraging good ‘netiquette’, an informal code of conduct for behaving online, is also a good idea. Netiquette includes using correct language online, being polite and not copying other people’s work, as well as complying with copyright laws surrounding music, video and image files.\nMobile operators provide a ‘dual access’ service, which can be a really good tool too. It allows you to access you child’s mobile phone account records like numbers called, account balances etc. Contact your mobile phone provider for more information.\nAlso, a school’s internet Acceptable Use Policy (AUP), should incorporate anti-bullying statements, which should be rigorously implemented and constantly reviewed. On top of this, schools should also have general anti-bullying policies.',
    },
    {
      key: 5,
      value: 'Social media apps monitoring Steps',
      content:
        'Instagram is a social media app used by more than one billion people around the world to share photos, videos and messages. teens use Instagram to celebrate big milestones, share everyday moments, keep in touch with friends and family, build communities of support and meet others who share their passions and interests.\nWhat to do if you’re being harassed\n 1.Block someone if necessary. If someone’s harassing you, such as repeatedly tagging you in photos you don’t like or sending you a lot of direct messages or trying to engage you in a creepy conversation, you can block them so they can’t tag you, contact you directly or mention you in comments. They also won’t be able to see your profile or search for your account. To block a user, go to his or her profile, tap the three dots at the top right, and select Block. When you block an account, that person isn’t notified and you can unblock an account at any time.\n 2.Report problematic posts. You can report other people’s inappropriate photos, videos, stories, or comments – or users who violate Instagram’s community guidelines. Just click on the three dots next to the username, then Report.\n\nTo report a photo or video:\nTap the three dots next to the photo you’d like to report and then Report.\n\nTools for helping to control how much time you or your teen spends on Instagram\nInstagram (and Facebook) have launched tools to help users better understand and manage how much time they’re spending on the services.\n1.Access these controls on Instagram by tapping Your Activity in the settings menu.\n2.At the top, you’ll see a dashboard showing your average time on that device. Tap any bar to see your total time for that day.\n3.Below the dashboard, you can set a daily reminder to give yourself an alert when you’ve reached the amount of time you want to spend on the app for that day.\n4.You can change or cancel the reminder at any time. You can also tap on Notification Settings to quickly access the new Mute Push Notifications setting. This will limit your Instagram notifications for a period of time.\nRemember that your kids can be on Instagram even if they’re not on Instagram. Sounds unlikely, but not in social media. Even if a parent bans all social media, his or her child’s photo and other information can be posted by friends via their accounts. And for teens, there’s the fear of missing out that even has its own acronym, “FOMO.” While not all teens need to or necessarily even want to use social media apps, for many it’s embedded into their social lives. Of course, parents should help their teen make good choices, but banning social media may not be the best solution.\n\nFinally, we all need balance in our lives. You and your kids need to take breaks from your devices. Use Instagram’s time management tools and, set family policies that apply to parents as well. ',
    },
  ];
  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <StatusBar hidden />

      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={kvArray}
        keyExtractor={item => item.key.toString()}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp',
          });

          return (
            <View style={{width: ITEM_SIZE}}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  transform: [{translateY}],
                  backgroundColor: colors.gray3,
                  borderRadius: 34,
                }}>
                <Image
                  source={{
                    uri:
                      'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fs3-ap-northeast-1.amazonaws.com%2Fpsh-ex-ftnikkei-3937bb4%2Fimages%2F4%2F8%2F0%2F5%2F27545084-2-eng-GB%2F20200616-AI-Cyberbullying-img.png?source=nar-cms&width=1600&height=900&fit=cover&gravity=faces',
                  }}
                  style={styles.posterImage}
                />

                <AnimatedTouchable
                  onPress={() =>
                    props.navigation.navigate('GuideContent', {item: item})
                  }>
                  <Text style={{fontSize: 20}}>{item.value}</Text>
                </AnimatedTouchable>
                {/* <MaterialCommunityIcons name="pencil-circle" size={40}   color={colors.tertiary} onPress={()=>console.log("j")}  /> */}
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
