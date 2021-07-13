import axios from "axios";

export function getData(url) {
    return axios.get(url)
      
}

export function postData(url, data, callback) {
    axios
      .post(url, data)
      .then(res => {if(callback) callback(res.data)})
      .catch(err => console.error(err));
}

export function putData(url, data, callback) {
    axios
      .put(url, data)
      .then(res => {if(callback) callback(res.data)})
      .catch(err => console.error(err));
}

export function deleteData(url, callback){
    axios
      .delete(url)
      .then(res => {if(callback) callback(res.data)})
      .catch(err => console.error(err));
}