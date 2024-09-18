import "./Feed.css";
import { useState, useEffect } from "react";
import ProfilePics from "../../assets/data/profilepics.json";
import {
  createPost,
  getPosts,
  likePost,
  dislikePost,
  deletePost,
} from "../../../utilities/post-api";

export default function Feed({ user, account, setAccount }) {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState(null);

  async function sendLike(postID) {
    try {
      let response = await likePost({ id: postID });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postID ? response : post))
      );
    } catch (error) {
      console.error("error like post".error);
    }
  }

  async function sendDelete(postID) {
    try {
      let response = await deletePost({ id: postID });
      if (response === true) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postID)
        );
      }
    } catch (error) {
      console.error("error delete post".error);
    }
  }

  async function sendDislike(postID) {
    try {
      let response = await dislikePost({ id: postID });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postID ? response : post))
      );
    } catch (error) {
      console.error("error dislike post".error);
    }
  }

  async function sendPost() {
    try {
      let response = await createPost({ content: content });
      if (response) {
        setPosts((prevPosts) => [response, ...prevPosts]);
      }
      setContent("");
    } catch (error) {
      console.error("error create post".error);
    }
  }

  useEffect(function () {
    async function get10() {
      try {
        const response = await getPosts();
        setPosts(response);
      } catch (error) {
        console.error("Error getting posts", error);
      }
    }
    get10();
  }, []);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div className="Feed">
      <div className="CreatePost">
        <div className="UserInfo">
          <div className="PostUser">
            {account && (
              <img className="PostPic" src={ProfilePics[account.pic].img} />
            )}
            <h5>{user.name}</h5>
          </div>
          <p>Starlight</p>
        </div>

        <textarea
          className="PostArea"
          placeholder="Tell us about the raygun"
          minLength={1}
          maxLength={200}
          onChange={handleChange}
        />
        <button className="PostBtn" onClick={sendPost}>
          Post to feed
        </button>
      </div>
      <ul className="Posts">
        {posts &&
          posts.map((post) => (
            <li key={post._id} className="Post">
              <h5>Posted by {post.user.name}</h5>
              <p>{post.content}</p>
              {post.user._id === user._id && (
                <button
                  className=" DeletePostBtn"
                  onClick={() => sendDelete(post._id)}
                >
                  delete
                </button>
              )}
              <div className="PostRating">
                <button
                  className="LikeBtn Like"
                  onClick={() => sendLike(post._id)}
                >
                  Like {post.likes.value}
                </button>
                <button
                  className="LikeBtn Cancel"
                  onClick={() => sendDislike(post._id)}
                >
                  Dislike {post.dislikes.value}
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
