import React, { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const pages = useMemo(() => {
    const visiblePages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        visiblePages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        visiblePages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        visiblePages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return visiblePages;
  }, [totalPages, currentPage]);

  return (
    <nav>
      <ul className="pagination justify-content-end mt-3">
        <li className={`page-item ${isFirst ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => !isFirst && onPageChange(currentPage - 1)}>
            Previous
          </button>
        </li>

        {pages.map((page, idx) =>
          typeof page === "string" ? (
            <li key={idx} className="page-item disabled">
              <span className="page-link">…</span>
            </li>
          ) : (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          )
        )}

        <li className={`page-item ${isLast ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => !isLast && onPageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
