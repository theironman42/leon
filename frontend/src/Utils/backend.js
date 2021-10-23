import axios from "axios";

const config = token => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
})

export function getData(url, token) {

  return axios.get(url, token && config(token))

}

export function postData(url, data, token) {
  return axios.post(url, data, token && config(token))
}

export function putData(url, data, token) {
  return axios.put(url, data, token && config(token))

}

export function deleteData(url, token) {
  return axios.delete(url, token && config(token))
}