import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
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
    <div className="space-y-3">
      <h3 className="title text-blue-600 font-bold text-xl">{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      <ul className="list-disc pl-4">
        {data.map((comment) => (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        ))}
      </ul>
    </div>
  );
}
