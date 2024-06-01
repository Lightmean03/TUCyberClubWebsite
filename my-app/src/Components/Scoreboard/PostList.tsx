import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useNavigate } from "react-router-dom";
import { getScoreBoard } from "../../utils/scoreBoardApi";
import Post from "./Post";
import { useAuth } from "../../utils/authContext";

type PostType = {
  id: number;
  content: string;
  score: number;
  ranking: number;
  teamname: string;
  user: number;
};

type PageInfoType = {
  total: number;
  startSize: number;
  endSize: number;
  totalPages: number;
};

type DataType = {
  nodes: PostType[];
  pageInfo?: PageInfoType;
};

const LIMIT = 10; 

const PostList: React.FC = () => {
  const [data, setData] = useState<DataType>({ nodes: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string>("");
  const [createPost, setCreatePost] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchData = useCallback(async (params: { offset: number; limit: number }) => {
    try {
      setIsLoading(true);
      const response = await getScoreBoard(params);
      setData({
        nodes: response ?? [],
        pageInfo: {
          total: response.length,
          startSize: params.offset + 1,
          endSize: params.offset + response.length,
          totalPages: Math.ceil(response.length / LIMIT)
        }
      });
    } catch (error) {
      setErrors(error.toString());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData({
      offset: 0,
      limit: LIMIT,
    });
  }, [fetchData]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = data.nodes.filter((post) =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

 
  const pagination = usePagination(
    { nodes: filteredPosts },
    {
      state: { page: 0, size: LIMIT },
      onChange: (action, state) => {
        fetchData({
          offset: state.page * LIMIT,
          limit: LIMIT,
        });
      },
    },
    {
      isServer: true,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errors) {
    return <div>{errors}</div>;
  }

  return (
    <div className="p-4 min-h-[75vh]">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <div className="bg-white shadow-md rounded-lg p-4 text-black">
        <h2 className="text-xl font-bold mb-4">Scoreboard</h2>
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-2 py-1 border rounded-md"
          />
        </div>
        <div className="overflow-x-auto">
          <Table data={{ nodes: filteredPosts }} pagination={pagination}>
            {(tableList) => (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCell className="">Team Name</HeaderCell>
                    <HeaderCell className="">Score</HeaderCell>
                    <HeaderCell className="">Ranking</HeaderCell>
                    <HeaderCell className="">Content</HeaderCell>
                    <HeaderCell className="">Actions</HeaderCell>
                  </HeaderRow>
                </Header>
                <Body>
                  {tableList.map((post: PostType) => (
                    <Row key={post.id} item={post} className="border-t border-gray-300">
                      <Cell className="">{post.teamname}</Cell>
                      <Cell className="">{post.score}</Cell>
                      <Cell className="">{post.ranking}</Cell>
                      <Cell className="">{post.content}</Cell>
                      <Cell>
                        {user && (
                          <button
                            onClick={() => navigate(`/edit/${post.user}`)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
                          >
                            Edit
                          </button>
                        )}
                      </Cell>
                    </Row>
                  ))}
                </Body>
              </>
            )}
          </Table>
          {user && (
            <button
              onClick={() => setCreatePost(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 ml-2"
            >
              Create Post
            </button>
          )}
        </div>

        {data.pageInfo && (
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2">
            <span>
              Rows per page: {data.pageInfo.startSize} out of {data.pageInfo.total}
              </span>
  
              <button
                type="submit"
                disabled={pagination.state.page + 1 === data.pageInfo?.totalPages}
                onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Next Page
              </button>

              <button
                type="submit"
                disabled={pagination.state.page === 0}
                onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                Prev Page
              </button>
            
            </div>
          </div>
        )}
      </div>

      {createPost && <Post onClose={() => setCreatePost(false)} />}
    </div>
  );
};

export default PostList;
