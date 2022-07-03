import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function CustomPagination({
  totalPages,
  onPageChange,
  currentPage,
}) {
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled>
        <PaginationLink first href="#" />
      </PaginationItem>
      <PaginationItem disabled>
        <PaginationLink href="#" previous />
      </PaginationItem>
      {[...Array(totalPages)].map((x, i) => (
        <PaginationItem active={currentPage == i ? true : false} key={i}>
          <PaginationLink onClick={(e) => onPageChange(i)}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem>
        <PaginationLink href="#" next />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" last />
      </PaginationItem>
    </Pagination>
  );
}
