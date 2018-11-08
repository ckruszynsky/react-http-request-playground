import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from "../../defaultAxios";

const url = "/posts";
const ERROR_MESSASGE = (
  <h1 style={{ textAlign: "center", fontWeight: "bold", color: "red" }}>
    ERROR OCCURRED: FETCHING DATA
  </h1>
);

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    hasError: false
  };

  //place ajax requests
  componentDidMount() {
    axios
      .get(url)
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        this.setState({ hasError: true });
      });
  }

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = this.state.hasError
      ? ERROR_MESSASGE
      : this.state.posts.map((post, index) => {
          return (
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              onClick={() => this.postSelectedHandler(post.id)}
            />
          );
        });

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
