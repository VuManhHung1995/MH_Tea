import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

export default function Pagination({ count, onChange, queryParams }) {
  const totalPage = Math.ceil(count / queryParams.pageSize);
  const handleChangePage = (event, newPage) => {
    onChange({ ...queryParams, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event) => {
    onChange({
      ...queryParams,
      page: 1,
      pageSize: parseInt(event.target.value),
    });
  };

  return (
    <TablePagination
      sx={{ display: queryParams.page > totalPage > 0 ? "none" : "block" }}
      component="div"
      count={count}
      page={queryParams.page > totalPage ? 0 : queryParams.page - 1}
      onPageChange={handleChangePage}
      rowsPerPage={queryParams.pageSize}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
