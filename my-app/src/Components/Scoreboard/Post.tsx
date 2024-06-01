import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createScoreboard } from "../../utils/scoreBoardApi";
import { useAuth } from "../../utils/authContext";

interface Post {
  content: string;
  score: string;
  ranking: string;
  teamname: string;
  user: number;
}

const PostComponent = ({onClose}) => {
  const { user } = useAuth();
  const [post, setPost] = useState<Post>({
    content: "",
    score: "",
    ranking: "",
    teamname: "",
    user: user.user_id,
  });
  const navigate = useNavigate();
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createScoreboard(post);
      navigate("/posts");
    } catch (error) {
      console.error("Post error:", error);
    }
  };



  return (
    <div className="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white shadow-md rounded-lg p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl text-black font-bold mb-4">Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ranking" className="text-black">Ranking</label>
            <input
              type="text"
              id="ranking"
              name="ranking"
              value={post.ranking}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 mt-2 text-black"
            />
          </div>

          <div>
            <label htmlFor="teamname" className="text-black">Team Name</label>
            <input
              type="text"
              id="teamname"
              name="teamname"
              value={post.teamname}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 mt-2 text-black"
            />
          </div>

          <div>
            <label htmlFor="score" className="text-black">Score</label>
            <input
              type="text"
              id="score"
              name="score"
              value={post.score}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 mt-2 text-black"
            />
          </div>

          
          
          <div>
            <label htmlFor="content" className="text-black">Content</label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 text-black"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default PostComponent;
