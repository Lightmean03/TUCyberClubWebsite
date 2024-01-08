import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { createPost, deletePost, fetchPosts } from "../../redux/actions/postActions"; // Adjust the path accordingly

const Post = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const userLoggedIn = useSelector((state) => state?.auth?.user);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleShowPosts = () => {
    setShowPosts(!showPosts);
  };

  const handlePosts = async (e) => {
    e.preventDefault();
    try {
      dispatch(createPost(post));
      setPost({
        title: "",
        content: "",
      });
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
      const action = await dispatch(fetchPosts());
      console.log("action", action); 
      setAllPosts(action.payload?.data); 
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [currentPage, postsPerPage]);

  console.log("posts", posts);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handlePostsPerPageChange = (event) => {
    const newPostsPerPage = parseInt(event.target.value, 10);
    setPostsPerPage(newPostsPerPage);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    try {
      dispatch(deletePost(id));
      const newPosts = posts.filter((post) => post._id.toString() !== id.toString());
      setPosts(newPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
      if (error.response && error.response.status === 401) {
        setErrors("Unauthorized - Only admins can delete posts");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white p-6 rounded-md shadow-md mb-8">
          <h1 className="text-3xl font-bold mb-4">Create a Post</h1>
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
        <div className="bg-white p-6 rounded-md shadow-md">
          <button
            onClick={handleShowPosts}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            {showPosts ? "Hide Posts" : "Get Posts"}
          </button>
          {showPosts && (
  <>
    <ul className="mt-4">
      {allPosts.map((post) => (
        <li
          key={post._id} // Adjust this based on the actual key property
          className="mb-4 bg-white p-4 rounded-md shadow-md"
        >
          <div className="flex items-start">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <p className="font-bold text-black mr-2">
                  {post.username}
                </p>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                {post.title}
              </h3>
              <p className="text-gray-700">{post.content}</p>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:text-red-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                x
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
    <Stack spacing={2} mt={4}>
      <Pagination
        count={Math.ceil(allPosts.length / postsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Stack>
  </>
)}
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
      </div>
    </div>
  );
};

export default Post;
