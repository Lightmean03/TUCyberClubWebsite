import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../Signin/UserContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Post = () => {
  const { setUserLoggedIn } = useUser('user');
  const [post, setPost] = useState({ title: "", content: "", user: setUserLoggedIn });
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10); // Adjust as needed
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:9000/post/posts?page=${currentPage}&limit=${postsPerPage}`);
      setPosts(response.data);
      if(!showPosts) {
        setShowPosts(true);
      }else{
        setShowPosts(false);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, postsPerPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handlePostsPerPageChange = (event) => {
    const newPostsPerPage = parseInt(event.target.value, 10);
    setPostsPerPage(newPostsPerPage);
    setCurrentPage(1);
    fetchPosts();
  };

  const handlePosts = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/post/post", post).then((response) => {
      console.log(response);
      setPosts([...posts, response.data]);
      setPost({ title: "", content: "", user: setUserLoggedIn });
    });
  };

  const getPosts = () => {
    fetchPosts();
  };
  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
          <form onSubmit={handlePosts}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Content:</label>
              <textarea
                name="content"
                value={post.content}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit Post
            </button>
          </form>
        </div>
        <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
          <button
            onClick={getPosts}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            {showPosts ? "Hide Posts" : "Get Posts"}
          </button>
          {showPosts && (
            <>
              <ul>
                {posts.map((post) => (
                  <li key={post.id} className="mb-4 bg-white p-4 rounded-md shadow-md">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <p className="font-bold text-black mr-2">{post.username}</p>
                        </div>
                        <h3 className="text-xl font-bold text-black mb-2">{post.title}</h3>
                        <p className="text-gray-700">{post.content}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Stack spacing={2} mt={4}>
                <Pagination
                  count={Math.ceil(posts.length / postsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Stack>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
