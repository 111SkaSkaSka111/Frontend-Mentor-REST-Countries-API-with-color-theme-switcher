import React from "react";

const Pagination = ({ page, setPage, totalPage }) => {
    return (
        <div className="pagination-item">
            <div className="pagination">
                {page !== 1 ? <button onClick={() => setPage(1)}>First</button> : <button disabled>First</button>}
                {page > 1 ? (
                    <button
                        onClick={() => {
                            setPage(page - 1);
                        }}
                    >
                        Previous
                    </button>
                ) : (
                    <button disabled>Previous</button>
                )}
                <span>
                    {page} of {totalPage}
                </span>
                {page < totalPage ? (
                    <button
                        onClick={() => {
                            setPage(page + 1);
                        }}
                    >
                        Next
                    </button>
                ) : (
                    <button disabled>Next</button>
                )}

                {page !== totalPage ? <button onClick={() => setPage(totalPage)}>Last</button> : <button disabled>Last</button>}
            </div>
        </div>
    );
};

export default Pagination;
