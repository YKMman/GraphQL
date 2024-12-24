import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import SearchInput from "./components/Form/Form";
import Pagination from "./components/Pagination/Pagination";
import RepositoriesList from "./components/List/List";

import { itemsPerPage } from "./lib/constants";

import { GET_REPOSITORIES, GetRepositoriesResponse, GetRepositoriesVariables } from './graphql/repositories'

interface ICursors {
  prev: (string | null)[],
  next: (string | null)[],
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cursors, setCursors] = useState<ICursors>({ prev: [], next: [] });
  const [page, setPage] = useState<number>(0);

  const { loading, error, data, fetchMore } = useQuery<GetRepositoriesResponse, GetRepositoriesVariables>(GET_REPOSITORIES, {
    variables: {
      query: searchTerm,
      first: itemsPerPage,
    },
    skip: !searchTerm,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (!data) return;

    setCursors(prev => ({
      prev: prev.prev.includes(data.search.pageInfo.startCursor) ? prev.prev : [...prev.prev, data.search.pageInfo.startCursor],
      next: prev.next.includes(data.search.pageInfo.endCursor) ? prev.next : [...prev.next, data.search.pageInfo.endCursor],
    }));
  }, [data, cursors]);

  const updateQuery = (
    prev: GetRepositoriesResponse,
    { fetchMoreResult }: { fetchMoreResult?: GetRepositoriesResponse }
  ) => {
    if (!fetchMoreResult) return prev;
    return {
      ...prev,
      search: fetchMoreResult.search,
    };
  }

  const handleNextPage = () => {
    if (data?.search.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          first: itemsPerPage,
          after: cursors.next[page],
        },
        updateQuery,
      });
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      fetchMore({
        variables: {
          first: itemsPerPage,
          before: cursors.prev[page - 1],
        },
        updateQuery,
      });
      setPage((prev) => prev - 1);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <SearchInput setSearchTerm={setSearchTerm} />
      {data && <RepositoriesList data={data.search.edges} />}
      {data && (
        <Pagination
          pageInfo={data.search.pageInfo}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      )}
    </div>
  );
};

export default App;