import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getScoreBoard, deleteScoreboardEntry } from "../../utils/scoreBoardApi";
import PostComponent from "./Post";
import { useAuth } from "../../utils/authContext";
import { Table, Header, HeaderRow, HeaderCell, Body, Row, Cell } from "@table-library/react-table-library/table";

type PostType = {
  id: number;
  username: string;
  score: number;
  ranking: number;
  teamname: string;
};

type PageInfoType = {
  count: number;
  next: string | null;
  previous: string | null;
};

type DataType = {
  nodes: PostType[];
  pageInfo: PageInfoType | null;
};

const PostList: React.FC = () => {
  const [data, setData] = useState<DataType>({ nodes: [], pageInfo: null });
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { user, isAuthenticated } = useAuth();
  const Admin = user?.role === "admin";
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const result = await getScoreBoard(page, pageSize);
      setData({
        nodes: result.results,
        pageInfo: {
          count: result.count,
          next: result.next,
          previous: result.previous,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setData({ nodes: [], pageInfo: null });
    }
  }, [page, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setSelectedPost(null);
      setShowModal(true);
    }
  };

  const handleUpdatePost = (post: PostType) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleDeletePost = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await deleteScoreboardEntry(id);
        fetchData();
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    fetchData();
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col min-w-min">
      <h1 className="text-3xl font-bold mb-6 text-black">Scoreboard</h1>
      <div className="flex-grow bg-white rounded-lg shadow-md overflow-hidden">
        <Table data={{ nodes: data.nodes }} className="overflow-x-auto">
          {(tableList: PostType[]) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell className="py-3 px-4 bg-gray-100 font-semibold text-left text-black w-1/6">Ranking</HeaderCell>
                  <HeaderCell className="py-3 px-4 bg-gray-100 font-semibold text-left text-black w-1/4">Team Name</HeaderCell>
                  <HeaderCell className="py-3 px-4 bg-gray-100 font-semibold text-left text-black w-1/4">Username</HeaderCell>
                  <HeaderCell className="py-3 px-4 bg-gray-100 font-semibold text-left text-black w-1/6">Score</HeaderCell>
                  <HeaderCell className="py-3 px-4 bg-gray-100 font-semibold text-left text-black w-1/6">Actions</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {tableList.length > 0 ? (
                  tableList.map((item) => (
                    <Row key={item.id} item={item}>
                      <Cell className="py-2 px-4 border-b text-black">{item.ranking}</Cell>
                      <Cell className="py-2 px-4 border-b text-black">{item.teamname}</Cell>
                      <Cell className="py-2 px-4 border-b text-black">{item.username}</Cell>
                      <Cell className="py-2 px-4 border-b text-black">{item.score}</Cell>
                      {Admin && (
                      <Cell className="py-2 px-4 border-b text-black">
                        <button
                          onClick={() => handleUpdatePost(item)}
                          className="mr-2 text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePost(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </Cell>
                      )}
                    </Row>
                  ))
                ) : (
                  <Row item={null}>
                    <Cell colSpan={5} className="py-4 text-center text-gray-500">No data available</Cell>
                  </Row>
                )}
              </Body>
            </>
          )}
        </Table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
        >
          Create Post
        </button>
        {data.pageInfo && (
          <div className="flex items-center space-x-2">
            <span className="text-black">
              Page {page} of {Math.ceil(data.pageInfo.count / pageSize)}
            </span>
            <button
              type="button"
              disabled={!data.pageInfo.previous}
              onClick={() => setPage(page - 1)}
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-1 px-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={!data.pageInfo.next}
              onClick={() => setPage(page + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-1 px-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {showModal && <PostComponent onClose={handleCloseModal} initialData={selectedPost} />}
    </div>
  );
};

export default PostList;