import {baseUrl} from '../utils/constants';

export const getPosts = (itemOnPage, numberOfPages) => {
  return fetch(`${baseUrl}&pagesize=${itemOnPage}&page=${numberOfPages}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      // 'Accept': '*/*',
    },
  })
    .then(res => res.json())
    .then(data => data);
};
