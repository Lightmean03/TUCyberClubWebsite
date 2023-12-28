import React from "react";

const blogTemplate = ({ posts }) => {
  return (
    <div>
      <h2>Blog</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <img src={post.image} alt={post.title} />
        </div>
      ))}
    </div>
  );
};

export default blogTemplate;