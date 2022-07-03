import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import CustomTable from "../component/CustomTable";
import CustomPagination from "../component/CustomPagination";
import useAuth from "../hooks/useAuth";
import authHeader from "../services/auth-header";
const axios = require("axios").default;

const PAGE_NUMBER = 0;

const Admin = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [totalPages, setTotalPages] = useState(0);

  const [value, setValue] = useState(null);

  const auth = useAuth();

  const navigate = useNavigate();
  const onChangeValue = (val) => {
    setValue(val);
  };

  const onPageChange = (pageNo) => {
    console.log("page: ", pageNo);
    setPage(pageNo);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/employees?page=${page}`,
          { headers: auth.authHeader() },
          { signal: controller.signal }
        );

        const result = await response.data;

        if (isMounted) {
          setData(result.content);
          setTotalPages(result.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [value, page]);

  return (
    <div className="container-class">
      <CustomTable
        tableHeaders={tableHeaders}
        tableContents={data}
        onChangeValue={onChangeValue}
      />

      {totalPages > 1 && (
        <CustomPagination
          totalPages={totalPages}
          onPageChange={onPageChange}
          currentPage={page}
        />
      )}
    </div>
  );
};

export default Admin;

const tableHeaders = [
  "Employee ID",
  "First Name",
  "Last Name",
  "Email",
  "Role",
  "Status",
];
