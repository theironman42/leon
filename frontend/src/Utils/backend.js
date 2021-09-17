import axios from "axios";
import { useSelector } from "react-redux";


export function getData(url, token) {
    return axios.get(url)
      
}

export function postData(url, data, token) {
    return axios
      .post(url, data)
}

export function putData(url, data, callback, token) {
    axios
      .put(url, data)
      .then(res => {if(callback) callback(res.data)})
      .catch(err => console.error(err));
}

export function deleteData(url, callback, token){
    axios
      .delete(url)
      .then(res => {if(callback) callback(res.data)})
      .catch(err => console.error(err));
}