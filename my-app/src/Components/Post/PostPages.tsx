import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "../../redux/actions/postActions";
import { RootState } from "../../types/types";

const PostPage: React.FC = () => {
  const { postId } = useParams();
  const allPosts = useSelector((state: RootState) => state.post?.posts);
 

  if (!allPosts) {
    return <div>Loading...</div>;
  }

  // Find the post with the specified postId
  const selectedPost: any = allPosts?.find((p: any) => p._id === postId);

  return (
    <div>
      <h1>{selectedPost?.title || "No Title"}</h1>
      <h3>{selectedPost?.username || "No Username"}</h3>
      <p>{selectedPost?.content || "No Content"}</p>
    </div>
  );
};

export default PostPage;