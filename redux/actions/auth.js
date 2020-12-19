import {
  SET_LOGIN_TRUE,
  SET_LOGN_TRUE_PARENT,
  REGISTER_SUCCESS_PARENT,
  LOGIN_SUCCESS_PARENT,
  REGISTER_SUCCESS_CHILD,
  LOGIN_SUCCESS_CHILD,
} from './type';
import {api_route} from '../api-route/api-route';
import {ToastAndroid} from 'react-native';
import axios from 'axios';

export const registerAsParent = ({name, email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({name, email, password});
  console.log('axios', api_route + '/api/auth/signup');
  console.log(body);

  try {
    const res = await axios.post(`${api_route}/api/auth/signup`, body, config);
    console.log(res.data);
    dispatch({type: REGISTER_SUCCESS_PARENT, payload: res.data});
  } catch (err) {
    ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
  }
};

export const loginAsParent = ({email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({email, password});
  console.log('axios', api_route + '/api/auth/login');
  console.log(body);

  try {
    const res = await axios.post(`${api_route}/api/auth/login`, body, config);
    console.log(res.data);
    dispatch({type: LOGIN_SUCCESS_PARENT, payload: res.data});
  } catch (err) {
    ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
  }
};

export const registerAsChild = ({
  name,
  email,
  password,
  parent_email,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({name, email, password, parent_email});
  console.log('axios', api_route + '/api/auth/signup');
  console.log(body);

  try {
    const res = await axios.post(`${api_route}/api/child/signup`, body, config);
    console.log(res.data);
    dispatch({type: REGISTER_SUCCESS_CHILD, payload: res.data});
  } catch (err) {
    ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
  }
};

export const loginAsChild = ({email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({email, password});
  console.log('axios', api_route + '/api/auth/login');
  console.log(body);

  try {
    const res = await axios.post(`${api_route}/api/child/login`, body, config);
    console.log(res.data);
    dispatch({type: LOGIN_SUCCESS_CHILD, payload: res.data});
  } catch (err) {
    ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
  }
};
