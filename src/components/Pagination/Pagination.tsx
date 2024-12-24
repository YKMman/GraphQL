import { PageInfo } from "../../graphql/repositories";


interface PaginationProps {
  pageInfo: PageInfo;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageInfo, handlePrevPage, handleNextPage }) => {
  const { hasNextPage, hasPreviousPage } = pageInfo;

  return (
    <div>
      {hasPreviousPage && <button onClick={handlePrevPage}>Предыдущая</button>}
      {hasNextPage && <button onClick={handleNextPage}>Следующая</button>}
    </div>
  );
}

export default Pagination;