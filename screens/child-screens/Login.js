import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {login, loginAsParent, loginAsChild} from '../../redux/actions/auth';
import {colors} from '../../constants/theme';
import {Button} from 'react-native-paper';

const Login = ({login, loginAsParent, navigation, loginAsChild}) => {
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });

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

    loginAsChild(authData);
  };

  return (
    <ScrollView style={styles.container}>
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
        <TextInput secureTextEntry="true"
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
            navigation.navigate('Signup-Child');
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

export default connect(null, {login, loginAsParent, loginAsChild})(Login);

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
});
