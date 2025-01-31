import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["people"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    initialPageParam: "https://swapi.dev/api/people/?page=3",
    getNextPageParam: (lastPage, allPages) => {
      console.log({ lastPage, allPages });
      return lastPage.next || undefined;
    },
    getPreviousPageParam: (firstPage) => firstPage.previous,
  });

  if (isLoading) {
    return <div className="loading">loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <div>
      {isFetching && <div className="loading">loading...</div>}
      <button disabled={!hasPreviousPage} onClick={fetchPreviousPage}>
        prev
      </button>
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        next
      </button>
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={() => {
          if (!isFetching) {
            fetchNextPage();
          }
        }}
        initialLoad={false}
        // endMessage={
        //   <p style={{ textAlign: "center" }}>
        //     <b>Yay! You have seen it all</b>
        //   </p>
        // }
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {data.pages.map((pageData) => {
          return pageData.results.map((p) => (
            <Person
              key={p.name}
              name={p.name}
              hairColor={p.hair_color}
              eyeColor={p.eye_color}
            />
          ));
        })}
      </InfiniteScroll>
    </div>
  );
}
