import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../Signin/UserContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Cookies from "js-cookie";

const Post = () => {
  const { setUserLoggedInState } = useUser();
  const [post, setPost] = useState({
    title: "",
    content: "",
    user: "",
  });
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10); // Adjust as needed
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleShowPosts = () => {
    setShowPosts(!showPosts);
  };

  console.log("Posts:", posts);
  const fetchPosts = async () => {
    const token = Cookies.get("token");
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:9000/post/posts", {
        params: {
          page: currentPage,
          limit: postsPerPage,
        },
      });
      const data = response.data;  
      const postsWithUsername = data.map(async (post) => {
        const usernameResponse = await axios.get(`http://localhost:9000/auth/username`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const username = usernameResponse.data.message;
        
        return {
          ...post,
          username,
        };
      });
  
      // Wait for all username fetches to complete
      const postsWithUsernameData = await Promise.all(postsWithUsername);
  
      setAllPosts(postsWithUsernameData); 
      setPosts(
        postsWithUsernameData.slice(
          (currentPage - 1) * postsPerPage,
          currentPage * postsPerPage,
        ),
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    fetchPosts();
  };

  const handlePostsPerPageChange = (event) => {
    const newPostsPerPage = parseInt(event.target.value, 10);
    setPostsPerPage(newPostsPerPage);
    setCurrentPage(1);
    fetchPosts();
  };

  const handlePosts = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    axios.post(
        "http://localhost:9000/post/post",
        post,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setPosts([...posts, response.data]);
        setPost({ title: "", content: "", user: setUserLoggedInState.username });
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };
  

  const handleDelete = (id) => {
    console.log(
      "post._id:",
      posts.map((post) => post._id),
    );
    console.log("id:", id);
    const token = Cookies.get("token");
    try {
      axios
        .delete(`http://localhost:9000/post/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setUserLoggedInState(response.data);

          // Assuming _id is an ObjectId, convert both to strings for comparison
          const newPosts = posts.filter(
            (post) => post._id.toString() !== id.toString(),
          );
          setPosts(newPosts);
        });
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
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="mb-4 bg-white p-4 rounded-md shadow-md"
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <p className="font-bold text-black mr-2">
                            {post.user}
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
