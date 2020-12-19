import {
  REGISTER_SUCCESS_PARENT,
  LOGIN_SUCCESS_PARENT,
  REGISTER_SUCCESS_CHILD,
  LOGIN_SUCCESS_CHILD,
} from '../actions/type';

const initialState = {
  isLogin: false,
  user: null,
  profile: null,
  parent: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS_PARENT:
      console.log('register as parent', action.payload);
      return {
        ...state,
        isLogin: true,
        parent: true,
        user: action.payload.user,
      };
    case LOGIN_SUCCESS_PARENT:
      console.log('login success', action.payload);
      return {
        ...state,
        isLogin: true,
        parent: true,
        user: action.payload,
      };
    case REGISTER_SUCCESS_CHILD:
      return {
        ...state,
        parent: false,
        isLogin: true,
        user: action.payload.child,
        parent_data: action.payload.payload,
      };
    case LOGIN_SUCCESS_CHILD:
      return {
        ...state,
        parent: false,
        isLogin: true,
        user: action.payload.child,
        parent_data: action.payload.parent,
      };
    default:
      return state;
  }
}
