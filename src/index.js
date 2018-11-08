import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/";
axios.defaults.baseURL = url;
axios.defaults.headers.common["X-Custom-Header"] = "My Custom Header";
axios.interceptors.request.use(
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

axios.interceptors.response.use(
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

ReactDOM.render(<App />, document.getElementById("root"));
