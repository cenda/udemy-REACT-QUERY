import { useState } from "react";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
import { useQuery } from "@tanstack/react-query";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => fetchPosts(currentPage),
    // retry: 2,
    // staleTime: 4000, gcTime: 1000
  });

  if (isLoading) {
    return <div className="loading-state text-[purple] italic">Loading</div>;
  }

  if (isError) {
    return (
      <div className="space-y-2 error">
        <h3 className="font-bold text-xl">Something went wrong</h3>
        {error && <p>{error.toString()}</p>}
      </div>
    );
  }

  return (
    <>
      <ul className="list-disc pl-4">
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title mt-2 cursor-pointer hover:opacity-60"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages flex justify-between">
        <button
          disabled={isLoading || currentPage < 1}
          onClick={() => {
            setCurrentPage(Math.min(1, currentPage - 1));
          }}
        >
          Previous page
        </button>

        <span>Page {currentPage + 1}</span>

        <button
          disabled={isLoading /*|| !data?.hasMore*/}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
