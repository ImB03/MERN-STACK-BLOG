import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

import "./pagination.css";
import { ACTION_PAGINATION } from "../../reducers/Slice/paginationSlice";

const Paginate = () => {
  const page = 1;
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const numberOfPages = useSelector(
    (state) => state.pagination.postsPagination.numberOfPages
  );
  const isLoading = useSelector((state) => state.pagination.isLoading);

  const handleChangePage = ({ selected }) => {
    dispatch(ACTION_PAGINATION(selected + 1));
    navigation(`/pagination`);
  };

  useEffect(() => {
    dispatch(ACTION_PAGINATION(page));
  }, []);

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      pageCount={numberOfPages}
      onPageChange={handleChangePage}
      containerClassName={"paginationBttns"}
      previousLinkClassName={"previousBttn"}
      nextLinkClassName={"nextBttn"}
      disabledClassName={isLoading ? "" : "paginationDisabled"}
      activeClassName={"paginationActive"}
    />
  );
};

export default Paginate;
