import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddModal from "../components/AddModal";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TableFooter, TablePagination } from "@mui/material";

const FranchiseeList = () => {
  // pagination
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pageChangeHandler = (event, pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  };
  const rowsPerPageChangeHandler = (v) => {
    setRowsPerPage(v);
  };
  const getFranchisee = async () => {
    const result = await (
      await fetch(
        `/api/franchisees?currentPage=${currentPage}&rowsPerPage=${rowsPerPage}`,
        { method: "GET" }
      )
    ).json();
    setTotalCount(result.totalCount);
    return result.result;
  };

  //react-query
  const {
    isLoading,
    error,
    data: franchisees,
  } = useQuery(["franchisees", currentPage], getFranchisee);

  if (error) return "에러 발생" + error.message;

  // delete
  const delFranchisee = async (franchiseeId) => {
    const response = await (
      await fetch(`/api/franchisees`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: franchiseeId,
        }),
      })
    ).json();
    console.log(response);
    window.location.reload();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <h2>등록 가맹점 리스트</h2>
        <AddModal />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>가맹점ID</TableCell>
              <TableCell>가맹점명</TableCell>
              <TableCell>업종</TableCell>
              <TableCell>등록일자</TableCell>
              <TableCell>사업규모</TableCell>
              <TableCell>수수료율</TableCell>
              <TableCell>수정하기</TableCell>
              <TableCell>삭제하기</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {franchisees?.map((franchisee) => (
              <TableRow
                key={franchisee.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {franchisee.id}
                </TableCell>
                <TableCell>{franchisee.name}</TableCell>
                <TableCell>{franchisee.category}</TableCell>
                <TableCell>{franchisee.registDate}</TableCell>
                <TableCell>{franchisee.scale}</TableCell>
                <TableCell>{franchisee.fee}%</TableCell>
                <TableCell>수정</TableCell>
                <TableCell>
                  <button
                    className="delete"
                    onClick={() => {
                      delFranchisee(franchisee.id);
                    }}
                    style={{ width: 35, margin: 15 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onPageChange={pageChangeHandler}
                onRowsPerPageChange={rowsPerPageChangeHandler}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <style>{`
      	.MuiPaper-root {
          width: 1000px;
          height: auto;
          margin: 100px auto;
          position: relative;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          font-family: "Pretendard-Regular";
        }
        .MuiTableHead-root {
          background: #EEF2E6;
        }
        h2 {
          text-align: center;
        }
        button {
          border: none;
          background: transparent;
          cursor: pointer;
        }
        .delete:hover {
          color: tomato;
        }
        .css-sghohy-MuiButtonBase-root-MuiButton-root {
          position: absolute;
          top: 17px;
          right: 17px;
          background: #3D8361;
          margin: 0 0 20px 0;
          font-family: "Pretendard-Regular";
        }
        .css-sghohy-MuiButtonBase-root-MuiButton-root:hover {
          background: #3D8361;
          opacity: 0.9;
        }
        .css-1ygcj2i-MuiTableCell-root {
          font-size: 15px;
          font-weight: bold;
        }
        .MuiTableCell-root {
          font-family: "Pretendard-Regular";
        }
        `}</style>
    </>
  );
};

export default FranchiseeList;
