import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

instance.defaults.headers.common["AUTH"] = "AUTH TOKEN FROM INSTANCE";

instance.interceptors.request.use(
  request => {
    //always return request else you'll be blocking the request
    console.log("REQUEST:", request);
    return request;
  },
  error => {
    //allows to globally catch and log the error
    console.log("REQUEST ERROR:", error);
    //returns the error to the component
    //where request originated from
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    //always return request else you'll be blocking the request
    console.log("RESPONSE:", response);
    return response;
  },
  error => {
    //allows to globally catch and log the error
    console.log("RESPONSE ERROR:", error);
    //returns the error to the component
    //where request originated from
    return Promise.reject(error);
  }
);

export default instance;
