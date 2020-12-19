import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {login, loginAsParent, registerAsChild} from '../../redux/actions/auth';
import {colors} from '../../constants/theme';

const Signup = ({login, registerAsChild, navigation}) => {
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    parent_email: '',
  });

  const handleSubmit = () => {
    if (authData.name === '') {
      return ToastAndroid.show('Name invalid', ToastAndroid.SHORT);
    }

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

    if (authData.password !== authData.confirm_password) {
      return ToastAndroid.show('Password do not match', ToastAndroid.SHORT);
    }

    registerAsChild(authData);
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.hello}>Hello,</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.hello2}>Welcome to </Text>
        <Text style={styles.header}>Cyber-Aid</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextInput
          placeholder="Full Name"
          value={authData.name}
          onChangeText={text => {
            setAuthData({
              ...authData,
              name: text,
            });
          }}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Email"
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
          placeholder="Parent Email"
          value={authData.parent_email}
          onChangeText={text => {
            setAuthData({
              ...authData,
              parent_email: text,
            });
          }}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          value={authData.password}
          onChangeText={text => {
            setAuthData({
              ...authData,
              password: text,
            });
          }}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Confirm Password"
          value={authData.confirm_password}
          onChangeText={text => {
            setAuthData({
              ...authData,
              confirm_password: text,
            });
          }}
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login-Child');
          }}>
          <Text style={styles.switchText}>Already have an account?</Text>
        </TouchableOpacity>
        <Button
          title="Signup"
          onPress={handleSubmit}
          style={styles.button}
          color={colors.primary}>
          Signup
        </Button>
      </View>
    </ScrollView>
  );
};

export default connect(null, {login, registerAsChild})(Signup);

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
