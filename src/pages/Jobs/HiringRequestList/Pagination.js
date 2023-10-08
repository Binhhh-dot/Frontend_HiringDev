import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";

const Pagination = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = currentPage; i < currentPage + 4; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <Link className="page-link" to="#" onClick={() => handlePageClick(i)}>
            {i}
          </Link>
        </li>
      );
    }

    return pageNumbers;
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg={12} className="mt-4 pt-2">
          <nav aria-label="Page navigation example">
            <div className="pagination job-pagination mb-0 justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <Link className="page-link" to="#" tabIndex="-1" onClick={handlePrevPage}>
                  <i className="mdi mdi-chevron-double-left fs-15"></i>
                </Link>
              </li>
              {renderPageNumbers()}
              <li className="page-item">
                <Link className="page-link" to="#" onClick={handleNextPage}>
                  <i className="mdi mdi-chevron-double-right fs-15"></i>
                </Link>
              </li>
            </div>
          </nav>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Pagination;
