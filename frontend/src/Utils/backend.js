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