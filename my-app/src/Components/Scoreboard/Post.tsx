import React, { useState } from "react";
import { createScoreboard, updateScoreboardEntry } from "../../utils/scoreBoardApi";
import { useAuth } from "../../utils/authContext";

interface Post {
  id?: number;
  score: string;
  teamname: string;
}

const PostComponent = ({ onClose, initialData = null }) => {
  const [post, setPost] = useState<Post>(initialData || {
    score: "",
    teamname: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!user) {
        throw new Error("You must be logged in to create or update a post");
      }
      if (post.id) {
        await updateScoreboardEntry(post.id, post);
      } else {
        await createScoreboard(post);
      }
      onClose();
    } catch (error) {
      console.error("Post error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-black">
          {post.id ? "Update" : "Create"} Scoreboard Entry
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="teamname" className="block text-sm font-medium text-black">
              Team Name
            </label>
            <input
              type="text"
              id="teamname"
              name="teamname"
              value={post.teamname}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="score" className="block text-sm font-medium text-black">
              Score
            </label>
            <input
              type="number"
              id="score"
              name="score"
              value={post.score}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
              {post.id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostComponent;