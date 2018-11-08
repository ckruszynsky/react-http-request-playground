import React, { Component } from "react";

import "./FullPost.css";
import axios from "../../defaultAxios";
const url = "/posts";

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  componentDidUpdate() {
    const shouldFetchData =
      this.props.id &&
      (!this.state.loadedPost || this.state.loadedPost.id !== this.props.id);

    if (shouldFetchData) {
      axios
        .get(`/posts/${this.props.id}`)
        .then(r => this.setState({ loadedPost: r.data }));
    }
  }

  onDeletePostHandler = () => {
    const { loadedPost } = this.state;
    const key = loadedPost.id;
    axios.delete(`${url}/${key}`).then(r => Promise.resolve(r));
  };
  render() {
    const { loadedPost } = this.state;

    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.id && loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{loadedPost.title}</h1>
          <p>{loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.onDeletePostHandler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
