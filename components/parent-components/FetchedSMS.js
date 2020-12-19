import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {colors, fonts} from '../../constants/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import {api_route} from '../../redux/api-route/api-route';
import {useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const FetchedSMS = () => {
  const auth = useSelector(state => state.auth);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMessages = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      id: auth.user._id,
    });
    console.log(body);
    try {
      const res = await axios.get(
        `${api_route}/api/badmessage/${auth.user._id}`,
      );
      console.log(res.data);
      setMessages(res.data);
      setLoading(false);
    } catch (err) {
      console.log('Error while saving the bad message');
      setMessages([{body: 'Nothing found'}]);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.messageBox}>
        <Text style={styles.meesageText}>{item.message}</Text>
        <Text style={styles.receipentText}>Sent By: {item.recipient}</Text>
      </View>
    );
  };
  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Entypo name="message" size={38} color={colors.tertiary} />
        <Text style={styles.headerTitle}> Bad Messages</Text>
      </View>
      {loading ? (
        <ActivityIndicator color={colors.tertiary} size="large" />
      ) : messages.length > 0 ? (
        <View style={styles.messageContainer}>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </View>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.noMessage}>No messages found yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.primary,
    flex: 1,
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
  messageBox: {
    margin: 10,
    width: Dimensions.get('screen').width - 30,
    padding: 15,
    backgroundColor: colors.gray3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lightPink,
  },
  messageContainer: {
    alignItems: 'center',
    flex: 1,
  },
  meesageText: {
    color: colors.white,
    fontSize: 15,
  },
  receipentText: {
    alignSelf: 'flex-end',
    fontStyle: 'normal',
    marginTop: 5,
    fontSize: 12,
    color: colors.tertiary,
  },
  noMessage: {
    color: colors.tertiary,
    fontSize: 18,
    margin: 20,
  },
});

export default FetchedSMS;
