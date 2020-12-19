import axios from 'axios';
import {api_route} from '../api-route/api-route';

export const saveBadMessage = ({
  id,
  address,
  message_body,
  child_id,
  parent_id,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    id,
    address,
    body: message_body,
    child_id,
    parent_id,
  });
  console.log('body', body);
  try {
    const res = await axios.post(`${api_route}/api/badmessage/`, body, config);
    console.log(res.data);
  } catch (err) {
    console.log('Error while saving the bad message');
  }
};
