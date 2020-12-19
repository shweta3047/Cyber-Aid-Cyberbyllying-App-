import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Modal,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {login, loginAsParent} from '../../redux/actions/auth';
import {colors} from '../../constants/theme';
import {Button} from 'react-native-paper';
import AnimatedLoader from 'react-native-animated-loader';

const Login = ({login, loginAsParent, navigation}) => {
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(authData.email)) {
      return ToastAndroid.show('Email invalid', ToastAndroid.SHORT);
    }

    if (authData.password.length < 6) {
      return ToastAndroid.show(
        'Password must contain atleast 6 chars',
        ToastAndroid.SHORT,
      );
    }
    setLoading(true);
    loginAsParent(authData);
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewLoader}>
            <AnimatedLoader
              visible={loading}
              overlayColor="rgba(255,255,255,0.75)"
              source={require('../../assets/loader.json')}
              animationStyle={styles.lottie}
              speed={1}
            />
          </View>
        </View>
      </Modal>
      <Text style={styles.hello}>Hello,</Text>
      <View>
        <Text style={styles.hello2}>Welcome Back to </Text>
        <Text style={styles.header}>Cyber-Aid</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextInput
          placeholder="email"
          value={authData.email}
          onChangeText={text => {
            setAuthData({
              ...authData,
              email: text,
            });
          }}
          style={styles.textInput}
        />
        <TextInput
          placeholder="password"
          value={authData.password}
          onChangeText={text => {
            setAuthData({
              ...authData,
              password: text,
            });
          }}
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={styles.switchText}>Do not have an account?</Text>
        </TouchableOpacity>
        <Button
          onPress={handleSubmit}
          style={styles.button}
          color={colors.primary}>
          Login
        </Button>
      </View>
    </ScrollView>
  );
};

export default connect(null, {login, loginAsParent})(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
    backgroundColor: colors.primary,
    position: 'relative',
    padding: 20,
  },
  header: {
    color: colors.tertiary,
    fontSize: 33,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  hello: {
    color: colors.white,
    fontSize: 40,
    marginTop: 10,
  },
  hello2: {
    color: colors.white,
    fontSize: 30,
  },
  textInput: {
    backgroundColor: colors.gray3,
    marginTop: 20,
    borderRadius: 7,
    padding: 10,
    color: colors.white,
  },
  switchText: {
    alignSelf: 'flex-end',
    margin: 10,
    color: colors.lightGrey,
  },
  button: {
    backgroundColor: colors.tertiary,
    color: colors.primary,
  },
  modalView: {
    marginTop: 10,
    backgroundColor: '#dce7f3',
    borderRadius: 20,
    alignItems: 'center',
    width: Dimensions.get('window').width - 20,
    paddingTop: 5,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});
