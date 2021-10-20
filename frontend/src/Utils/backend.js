import axios from "axios";


export function getData(url, token) {

  const config = token && {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  return axios.get(url, config)

}

export function postData(url, data, token) {
  return axios
    .post(url, data)
}

export function putData(url, data, callback, token) {
  axios
    .put(url, data)
    .then(res => { if (callback) callback(res.data) })
    .catch(err => console.error(err));
}

export function deleteData(url, callback, token) {
  axios
    .delete(url)
    .then(res => { if (callback) callback(res.data) })
    .catch(err => console.error(err));
}