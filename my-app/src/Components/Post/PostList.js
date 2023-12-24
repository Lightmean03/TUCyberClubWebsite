// PostList.js
import React from "react";
import axios from "axios";

const PostList = ({ posts }) => {
    if(!posts.length) {
        return (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Posts</h2>
              <p>No posts found</p>
            </div>
          );    
    };
   
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4 bg-white p-4 rounded-md shadow-md">
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <p className="font-bold text-black mr-2">{post.username}</p>
                </div>
                {/* Post content */}
                <h3 className="text-xl font-bold text-black mb-2">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
