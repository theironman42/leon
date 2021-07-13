import axios from "axios";

export function getData(url, callback) {
    axios
      .get(url)
      .then(res => callback(res.data))
      .catch(err => console.error(err));
}

export function postData(url, data, callback) {
    axios
      .post(url, data)
      .then(res => {if(callback) callback(res.data)})
      .catch(err => console.error(err));
}