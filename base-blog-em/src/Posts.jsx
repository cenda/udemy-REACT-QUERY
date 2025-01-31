import { useEffect, useState } from "react";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// use this as the limiter of maximum data to be fetched
const maxPostPage = 3;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    // mutationFn: (postId) => deletePost(postId),
    mutationFn: deletePost,
  });

  const updateMutation = useMutation({
    // mutationFn: (postId) => updatePost(postId),
    mutationFn: updatePost,
  });

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1; //Math.min(maxPostPage, currentPage + 1);

      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: () => fetchPosts(nextPage),
      });
    }
  }, [currentPage, queryClient]);

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
            onClick={() => {
              deleteMutation.reset();
              updateMutation.reset();
              setSelectedPost(post);
            }}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages flex justify-between">
        <button
          disabled={isLoading || currentPage <= 1}
          onClick={() => {
            setCurrentPage((prevValue) => Math.max(1, prevValue - 1));
          }}
          className="button"
        >
          Previous page
        </button>

        <span>Page {currentPage}</span>

        <button
          disabled={isLoading || currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prevValue) => Math.min(maxPostPage, prevValue + 1));
          }}
          className="button"
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          deleteMutation={deleteMutation}
          updateMutation={updateMutation}
        />
      )}
    </>
  );
}
