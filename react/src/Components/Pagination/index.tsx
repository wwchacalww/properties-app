import { PaginationItem } from "./PaginationItem";

type PaginationProps = {
  page_start: number;
  page_end: number;
  listedItens: number;
  per_page: number;
  page: number;
  total: number;
  onChangePage: (page: number) => void;
};

const siblingsCount = 3;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination(props: PaginationProps) {
  const {
    page_start,
    page_end,
    listedItens,
    total,
    page,
    per_page = 100,
    onChangePage,
  } = props;

  const lastPage = Math.ceil(total / per_page);

  const previousPage =
    page > 1 ? generatePagesArray(page - 1 - siblingsCount, page - 1) : [];

  const nextPages =
    page < lastPage
      ? generatePagesArray(page, Math.min(page + siblingsCount, lastPage + 1))
      : [];

  return (
    <div className="w-screen flex flex-row justify-between mt-10  p-8">
      <div>
        <span>
          Página {page} de {page_end} - {listedItens} items listados de um total
          de {total}
        </span>
      </div>
      <div>
        {page > siblingsCount + 1 && (
          <>
            <PaginationItem number={1} onChangePage={onChangePage} />
            {page > Math.round(2 + siblingsCount) && (
              <span className="text-gray-400 w-8 text-center">...</span>
            )}
          </>
        )}

        {previousPage.length > 0 &&
          previousPage.map((page) => {
            return (
              <PaginationItem
                onChangePage={onChangePage}
                key={page}
                number={page}
              />
            );
          })}

        <PaginationItem onChangePage={onChangePage} number={page} isCurrent />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem
                onChangePage={onChangePage}
                key={page}
                number={page}
              />
            );
          })}

        {page + siblingsCount < lastPage && (
          <>
            {page < lastPage - siblingsCount - 1 && (
              <span className="text-gray-400 w-8 text-center">...</span>
            )}
            <PaginationItem onChangePage={onChangePage} number={lastPage} />
          </>
        )}

        {/* <a
          href="#"
          className="border w-5 h-5 py-2 px-3 mr-2 rounded bg-blue-500 hover:bg-blue-600"
        >
          1
        </a>
        <a
          href="#"
          className="border w-5 h-5 py-2 px-3 mr-2 rounded bg-blue-800 hover:bg-blue-600"
        >
          2
        </a>
        <a
          href="#"
          className="border w-5 h-5 py-2 px-3 mr-2 rounded bg-blue-800 hover:bg-blue-600"
        >
          3
        </a> */}
      </div>
    </div>
  );
}
