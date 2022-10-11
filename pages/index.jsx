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
import { TableFooter, TablePagination, TableSortLabel } from "@mui/material";
import styles from "../styles/index.module.css";
import EditModal from "../components/EditModal";

const FranchiseeList = () => {
  // pagination
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pageChangeHandler = (event, pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  };
  // 화면에 보여주려는 데이터의 갯수 (10, 25, 50 ,100)
  const rowsPerPageChangeHandler = (e) => {
    setRowsPerPage(e.target.value);
  };
  const getFranchisee = async () => {
    const result = await (
      await fetch(
        `/api/franchisees?currentPage=${currentPage}&rowsPerPage=${rowsPerPage}`,
        { method: "GET" }
      )
    ).json();
    setTotalCount(result.totalCount);
    console.log("result.result", result.result);
    return result.result;
  };

  //react-query
  const {
    isLoading,
    error,
    data: franchisees,
  } = useQuery(["franchisees", currentPage, rowsPerPage], getFranchisee);

  // edit modal open
  const [selectedData, setSelectedData] = useState({
    isModalOpen: false,
    selectedFranchisee: {},
  });

  const closeModal = () => {
    setSelectedData({
      isModalOpen: false,
      selectedFranchisee: {},
    });
  };

  // update
  const updateModalOpen = (franchisee) => {
    setSelectedData(() => {
      return {
        isModalOpen: true,
        selectedFranchisee: franchisee,
      };
    });
  };

  // delete
  const delFranchisee = async (franchiseeId) => {
    const response = await (
      await fetch(`/api/franchisees`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJpZHgiOjEsImF1dGhvcml0eSI6IkFETUlOIiwiaXNVc2UiOnRydWUsImV4cCI6MTY2NTUzNDQyNiwiaWF0IjoxNjY1NDQ4MDI2fQ.BJcyUSPIvABhPQTWoPzoHXBtuyoGzdpwjtAhikgsJcE",
        },
        body: JSON.stringify({
          id: franchiseeId,
        }),
      })
    ).json();
    console.log(response);
    window.location.reload();
  };

  // list-sorting
  // 어떤 컬럼을 기준으로 정렬? 오름차순/내림차순?
  const [orderState, setOrderState] = useState({
    sortBy: "id", //어떤값을 기준으로
    sortOrder: "asc", //어떤 방향으로(오름,내림)
  });

  // obj -> obj["abc"]
  const compareFunction = (a, b, sortBy, sortOrder) => {
    if (a[sortBy] < b[sortBy]) {
      return sortOrder === "asc" ? -1 : 1;
    } else if (a[sortBy] > b[sortBy]) {
      return sortOrder === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  };

  const requestSort = (sortByProp) => {
    console.log("sortByProp", sortByProp);
    const { sortBy: oldSortBy, sortOrder: oldSortOrder } = orderState;

    let newSortOrder = oldSortOrder;
    let newSortBy = oldSortBy;

    //props로 전달된 정렬기준이 state에 저장된 정렬기준과 같은지에 따라 분기한다
    if (sortByProp === oldSortBy) {
      //같다면 정렬순서만 변경
      newSortOrder = oldSortOrder === "asc" ? "desc" : "asc";
    } else {
      //다르면 새 정렬기준을 state에 저장하고, 정렬순서는 asc로 설정한다.
      newSortBy = sortByProp;
      newSortOrder = "asc";
    }
    // [1, 3, 2, 4, 5, 6] => 3, 1 2 4 5 6 /
    franchisees.sort((a, b) => compareFunction(a, b, newSortBy, newSortOrder));

    setOrderState({
      sortBy: newSortBy,
      sortOrder: newSortOrder,
    });
  };

  if (error) return "에러 발생" + error.message;

  return (
    <>
      <TableContainer component={Paper} className={styles.container}>
        <h2 className={styles.h2}>등록 가맹점 리스트</h2>
        <AddModal />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderState.sortBy === "id"}
                  direction={orderState.sortOrder}
                  onClick={() => requestSort("id")}
                >
                  가맹점ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderState.sortBy === "name"}
                  direction={orderState.sortOrder}
                  onClick={() => requestSort("name")}
                >
                  가맹점명
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderState.sortBy === "category"}
                  direction={orderState.sortOrder}
                  onClick={() => requestSort("category")}
                >
                  업종
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderState.sortBy === "registDate"}
                  direction={orderState.sortOrder}
                  onClick={() => requestSort("registDate")}
                >
                  등록일자
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderState.sortBy === "scale"}
                  direction={orderState.sortOrder}
                  onClick={() => requestSort("scale")}
                >
                  사업규모
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderState.sortBy === "fee"}
                  direction={orderState.sortOrder}
                  onClick={() => requestSort("fee")}
                >
                  수수료율
                </TableSortLabel>
              </TableCell>
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
                <TableCell>{franchisee.registDate.split("T")[0]}</TableCell>
                <TableCell>{franchisee.scale}</TableCell>
                <TableCell>{franchisee.fee}%</TableCell>
                {/* 수정하기 모달창 팝업 */}
                <TableCell>
                  <button
                    className={styles.edit}
                    onClick={() => updateModalOpen(franchisee)}
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className={styles.delete}
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
                count={totalCount} //totalCount : 데이터의 갯수
                rowsPerPage={rowsPerPage} // rowsPerPage: 한 페이지의 데이터 갯수 
                page={currentPage} // currentPage: 현재페이지
                onPageChange={pageChangeHandler}
                onRowsPerPageChange={rowsPerPageChangeHandler}
              />
            </TableRow>
          </TableFooter>
        </Table>
        <EditModal selectedData={selectedData} closeModalFn={closeModal} />
      </TableContainer>
    </>
  );
};

export default FranchiseeList;
