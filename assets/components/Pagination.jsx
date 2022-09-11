import React from "react";

const Pagination = ({ currentPage, itemsPerPage, length, onPageChanged }) => {
  // Calcul de la pagination
  const pagesCount = Math.ceil(length / itemsPerPage);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <nav className="mypagination" aria-label="Pagination">
        <button onClick={() => onPageChanged(currentPage - 1)} className={ (currentPage === 1) ? 'btn-prev active': 'btn-prev' } >
            <span className="sr-only">Previous Page</span>
            <svg className="block w-4 h-4 fill-current" viewBox="0 0 256 512" aria-hidden="true" role="presentation">
                <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
            </svg>
        </button>
        {pages.map(page => (
            <button key={page} onClick={() => onPageChanged(page)} className={ (currentPage === page) ? 'page active' : 'page'}>
                {page}
            </button>
        ))}
        <button onClick={() => onPageChanged(currentPage + 1)} className={ (currentPage === pagesCount) ? 'btn-next active': 'btn-next' } >
            <span className="sr-only">Next Page</span>
            <svg className="block w-4 h-4 fill-current" viewBox="0 0 256 512" aria-hidden="true" role="presentation">
                <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
            </svg>
        </button>
    </nav>
  );
};

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
};

export default Pagination;