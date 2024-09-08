import sendRequest from "./send-request";
const BASE_URL = "http://localhost:4741/posts";

//Get first 10 posts
export async function getPosts() {
  return sendRequest(`${BASE_URL}/get10`);
}

//Add post
export async function createPost(content) {
  try {
    return await sendRequest(`${BASE_URL}/createpost`, "POST", content);
  } catch (error) {
    console.error("Error creating post", error);
  }
}
