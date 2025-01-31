import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["species"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      console.log({ lastPage });
      return lastPage.next; // || undefined;
    },
  });

  if (isError) {
    return <div>Error: {error.toString()}</div>;
  }
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      {isFetching && <div className="loading">Loading...</div>}

      <InfiniteScroll
        initialLoad={false}
        loadMore={() => {
          if (!isFetching) {
            fetchNextPage();
          }
        }}
        hasMore={hasNextPage}
      >
        {data.pages.map((pageData) =>
          pageData.results.map((s) => (
            <Species
              averageLifespan={s.average_lifespan}
              language={s.language}
              name={s.name}
              key={s.name}
            />
          ))
        )}
      </InfiniteScroll>
    </div>
  );
}
