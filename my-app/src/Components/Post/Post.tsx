import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { HeroWrapper } from "../ui/hero";

const Post = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const [showPosts, setShowPosts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleShowPosts = () => {
    setShowPosts(!showPosts);
  };

  const handlePosts = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/post", post);
      fetchPost();
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.response && error.response.status === 401) {
        setErrors("Error creating posts");
      }
    }
  };

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/post/posts");
      setAllPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [currentPage, postsPerPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handlePostsPerPageChange = (event) => {
    const newPostsPerPage = parseInt(event.target.value, 10);
    setPostsPerPage(newPostsPerPage);
    setCurrentPage(1);
    fetchPost();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/post/${id}`);
      fetchPost();
    } catch (error) {
      console.error("Error deleting post:", error);
      if (error.response && error.response.status === 401) {
        setErrors("Unauthorized - Only admins can delete posts");
      }
    }
  };

  const handlePostClick = (postId) => {
    console.log(`Clicked on post with ID: ${postId}`);
    navigate(`/posts/${postId}`)
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto p-6">
        <div className=" p-6 rounded-md shadow-md mb-8">
          <h1 className="text-3xl font-black mb-4">Create a Post</h1>
          <form onSubmit={handlePosts}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Content:
              </label>
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
        <div className="p-6 rounded-md shadow-md">
  <button
    onClick={handleShowPosts}
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
  >
    {showPosts ? "Hide Posts" : "Get Posts"}
  </button>
  {showPosts && (
    <>
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Username</th>
            <th className="border border-gray-400 p-2">Title</th>
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allPosts.map((post: any) => (
            <tr key={post._id} className="hover:bg-gray-100">
              <td className="border border-gray-400 p-2">{post.username || "No Username"}</td>
              <td className="border border-gray-400 p-2">{post.title || "No Title"}</td>
              <td className="border border-gray-400 p-2">
                <button
                  onClick={() => handlePostClick(post._id)}
                  className="text-blue-500 hover:text-blue-600 focus:outline-none focus:ring focus:border-blue-300 mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-500 hover:text-red-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Stack spacing={2} mt={4}>
        <Pagination
          count={Math.ceil(allPosts.length / postsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
      <div className="flex justify-center mt-4">
          <label className="text-gray-700 text-sm font-bold mr-2">
            Posts per page:
          </label>
          <select
            value={postsPerPage}
            onChange={handlePostsPerPageChange}
            className="border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
    </>
  )}
    </div>
          {errors && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {errors}</span>
            </div>
          )}
        </div>
        
      </div>
   
  );
};

export default Post;
