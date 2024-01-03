const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export type PostDataType = {
  title: string;
  body: string;
};

export const getPosts = async () => {
  try {
    return await fetch(`${API_BASE_URL}/posts?_limit=10`);
  } catch (error) {
    throw error;
  }
};

export const getPost = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const makePost = async (postData: PostDataType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      body: JSON.stringify(postData),
    });
    return response;
  } catch (error) {
    throw error;
  }
};
