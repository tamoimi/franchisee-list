import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddModal from "../components/AddModal";
import { useQuery } from "@tanstack/react-query";

const getFranchisee = async () => {
  const result = await (
    await fetch("/api/franchisees", { method: "GET" })
  ).json();
  return result.result;
};

//react-query
const { isLoading, error, data: franchisees } = useQuery;

const FranchiseeList = () => {
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
            </TableRow>
          </TableHead>
          <TableBody>
            {franchisees?.map((franchisee) => (
              <TableRow
                key={franchisee.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {franchisee.name}
                </TableCell>
                <TableCell>{franchisee.category}</TableCell>
                <TableCell>날짜..</TableCell>
                <TableCell>{franchisee.scale}</TableCell>
                <TableCell>{franchisee.fee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <style jsx>{`
      	.MuiPaper-root {
          width: 1000px;
          height: auto;
          margin: 100px auto;
        }
        .MuiTableHead-root {
          background: #BAD7DF;
        }
        h2 {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default FranchiseeList;
