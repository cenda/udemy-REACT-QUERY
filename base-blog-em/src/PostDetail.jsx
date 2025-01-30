import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation, updateMutation }) {
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

  // console.log(updateMutation.isSuccess, updateMutation?.data);

  return (
    <div className="space-y-3">
      <h3 className="title text-blue-600 font-bold text-xl">
        {updateMutation?.isSuccess
          ? `UPDATED: ${updateMutation.data.title}`
          : post.title}
      </h3>
      <div>
        <button
          onClick={() => deleteMutation.mutate(post.id)}
          className="button"
        >
          Delete
        </button>
        {deleteMutation.isPending && (
          <p className="loading">Deleting the post</p>
        )}
        {deleteMutation.isError && (
          <p className="error">
            Error deleting the post: {deleteMutation.error.toString()}
          </p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">Post (not) deleted</p>
        )}
      </div>{" "}
      <div>
        <button
          className="button"
          onClick={() => {
            updateMutation.mutate(post.id);
          }}
        >
          Update title
        </button>

        {updateMutation.isPending && (
          <p className="loading">Updating the post title</p>
        )}
        {updateMutation.isError && (
          <p className="error">
            Error updating the post title: {updateMutation.error.toString()}
          </p>
        )}
        {updateMutation.isSuccess && (
          <p className="success">Post title (not) updated</p>
        )}
      </div>
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
