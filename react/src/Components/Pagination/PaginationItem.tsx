type PaginationItemProps = {
  isCurrent?: boolean;
  number: number;
  onChangePage: (page: number) => void;
};

export function PaginationItem({
  isCurrent,
  number,
  onChangePage,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button
        className="border rounded bg-blue-400 cursor-default w-8 h-8 mx-1"
        disabled
      >
        {number}
      </button>
    );
  }
  return (
    <button
      className="border rounded bg-blue-600 cursor-pointer w-8 h-8 mx-1"
      onClick={() => onChangePage(number)}
    >
      {number}
    </button>
  );
}
