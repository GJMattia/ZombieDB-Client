import "./Feed.css";
import { useState, useEffect } from "react";
import ProfilePics from "../../assets/data/profilepics.json";
import { createPost, getPosts } from "../../../utilities/post-api";

export default function Feed({ user, account, setAccount }) {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState(null);

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
              <h5>Posted by {post.user}</h5>
              <p>{post.content}</p>
              <div className="PostRating">
                <button>Like - {post.rating.likes}</button>
                <button>Dislike - {post.rating.dislikes}</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
