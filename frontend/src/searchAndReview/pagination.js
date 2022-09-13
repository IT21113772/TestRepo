import React from "react";

import Pagination from '@mui/material/Pagination';

export default function PaginationControlled() {
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
    return (
      <div>
        <Pagination count={10} page={page} onChange={handleChange} />
      </div>
    );
  }